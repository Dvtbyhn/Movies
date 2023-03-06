import React, { useState } from 'react'
import "../Style/Login.css"
import { signIn } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { faUser, faKey, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <div className='container-login'>
                <div className='log'>
                    <i className='userTie'><FontAwesomeIcon icon={faUserTie} /></i>
                    <div>
                        <h2>Giriş Yap</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-3'>
                                <i><FontAwesomeIcon icon={faUser} /> </i>
                                <label>Kullanıcı Adı</label><br />
                                <input type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)} /><br />
                            </div>
                            <div className='mt-4'>
                                <i><FontAwesomeIcon icon={faKey} /> </i>
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


