import React, { useState } from 'react'
import "../Style/Login.css"
import { signIn } from '../../Firebase'
import { Toaster } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await signIn(userName, password)
        if (user) {
            navigate("/", {
                replace: true
            })
        }
    }
    return (
        <>
            <div className='container-login ' >
                <div className='card-login'>
                    <img src="https://media.tenor.com/y1yvLwIhfNwAAAAC/television-galaxies.gif"
                        className="gif " alt="..." />
                    <div className="" >
                        <h2 className="title ">Giriş Yap</h2>
                        <Toaster />
                        <form  onSubmit={handleSubmit}>
                            <div className='mt-3'>
                                <label>Kullanıcı Adı</label><br />
                                <input type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)} /><br />
                            </div>
                            <div className='mt-4'>
                                <label>Şifre</label><br />
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} /><br />
                            </div>
                            <button type='submit'
                                className='btn btn-success mt-2'>Giriş Yap</button>
                        </form>
                    </div>
                </div>
                
            </div>

        </>
    )
}


