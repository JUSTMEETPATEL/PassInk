import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()


    useEffect(() => {
        let passwords = localStorage.getItem("passwords");

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])



    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (ref.current.src.includes("Icons/hidden.svg")) {
            ref.current.src = "Icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "Icons/hidden.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
        }
        else{
            alert("Error: Password can't be saved, site,username and password should be of atleast 3 charcter!")
        }

    }

    const deletePassword = (id) => {
        let c = confirm("Are you sure, you want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }

    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

        // setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <div className="p-2 md:p-0 md:mycontainer">

                <h1 className='text-white text-4xl font-bold text-center'>
                    <span className='text-cyan-500'>&lt;</span>
                    Pass
                    <span className='text-cyan-500'>Ink/&gt;</span>
                </h1>

                <div className="text-white flex flex-col p-3 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Website URL' className='rounded-full w-full text-black border border-cyan-500 p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='username' className='rounded-full w-full text-black border border-cyan-500 p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='password' className='rounded-full w-full text-black border border-cyan-500 p-4 py-1' type="password" name='password' id='password' />
                            <span className="absolute right-[5px] top-[5px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={27} src="Icons/eye.svg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-black gap-3 flex justify-center items-center bg-cyan-400 w-fit rounded-full px-5 py-2 hover:bg-cyan-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-3xl py-4 text-white">Saved Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto text-white w-full rounded-md overflow-hidden">
                        <thead className='bg-cyan-500'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='flex items-center justify-center py-2 text-center'><a href={item.site} target='_blank'>{item.site}</a>
                                        <span className="invert size-7 cursor-pointer my-2" onClick={() => { copyText(item.site) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-2 text-center'>{item.username}
                                        <span className="invert size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "7px", "paddingLeft": "6px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-2 text-center'>{"*".repeat(item.password.length)}
                                        <span className="invert size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "7px", "paddingLeft": "6px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </span>
                                    </td>
                                    <td className='py-2 text-center'>
                                        <span className='invert cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "5px" }} >
                                            </lord-icon>
                                        </span>
                                        <span className='invert cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "5px", "paddingLeft": "5px" }} >
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    )
}

export default Manager
