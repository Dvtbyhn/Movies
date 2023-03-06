import React, { useState } from 'react'
import { register } from '../Firebase'
import "../Style/Sign.css"
import { useNavigate } from 'react-router-dom'
import { faUser, faKey,faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sign() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [photoURL] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await register(email, password, photoURL)
        if (user) {
            navigate("/", {
                replace: true
            })
        }
    }
    return (
        <>
            <div className='container-sign'>
                <div className='card-sign'>
                <i className='userPlus'><FontAwesomeIcon icon={faUserPlus} /></i>
                    <div className=" text-center">
                        <h2 className="title ">Üyelik İşlemleri</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-3'>
                                <i><FontAwesomeIcon icon={faUser} /> </i>
                                <label>Kullanıcı e-mail</label><br />
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} /><br />
                            </div>

                            <div className='mt-4'>
                                <i><FontAwesomeIcon icon={faKey} /> </i>
                                <label>Şifre</label><br />
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} /><br />
                            </div>

                            <button type='submit'
                                className='btn btn-success mt-2'>Üye  Ol</button>

                        </form>
                    </div>
                </div>

            </div>


        </>
    )
}


