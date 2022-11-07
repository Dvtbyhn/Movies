
import React, { useState } from 'react'
import { update ,resetPassword,auth} from '../Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/auth'
import toast, { Toaster } from 'react-hot-toast'



export default function UpdateProfile() {

     const dispatch = useDispatch()

     const {user}= useSelector(state => state.auth)

    const [displayName, setDisplayName] = useState(user.displayName || "")
    const [avatar, setAvatar] = useState(user.photoURL || "")
    const [password, setPassword] = useState( "")



    const handleSubmit = async(e) => {
        e.preventDefault()
        if(displayName.length > 6) {
              await update({
            displayName,
            photoURL : avatar
        })
        }else{
            toast.error("Bilgiler yetersiz")
        }
      
        dispatch(login({
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
            uid:auth.currentUser.uid
        }))
    }

    const handleResetPassword = async(e) => {
        e.preventDefault() 
        
        if(password.length < 6){
          toast.error("Şifre çok kısa")
        }
        await resetPassword(password)
        
    }

    return (
        <div style={{color:"white",textAlign:"center",marginTop:"4rem"}} >
            <Toaster />
            <form onSubmit={handleSubmit}>
                <h1>Profil Güncelle</h1>
                <div className='mt-3'>
                    <label>Kullanıcı Adı</label><br />
                    <input type="text" 
                    value={displayName}
                     onChange={(e)=> setDisplayName(e.target.value)}
                    /><br />
                </div>
         
                <div className='mt-3'>
                    <label>Fotoğraf *(isteğe bağlı) </label><br />
                    <input placeholder='Url olarak girin ' 
                    type="text" 
                    value={avatar} 
                    onChange={(e)=> setAvatar(e.target.value)}
                    /><br />
                </div>

                <button
                 type='submit'
                className='btn btn-success mt-2'>Güncelle</button>

            </form>

           <form onSubmit={handleResetPassword} className="mt-4">
               <h1>Şifreyi Güncelle</h1>
                <div className='mt-4'>
                    <label>Sifre</label><br />
                    <input 
                    type="password"
                     value={password} 
                     onChange={(e)=> setPassword(e.target.value)}
                    /><br />
                </div>
                <button 
                disabled={!password}  
                type='submit'
                    className='btn btn-success mt-2'>Şifreyi Güncelle</button>
            </form>
        </div>
    )
}
