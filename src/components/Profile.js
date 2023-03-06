
import React, { useState } from 'react'
import { update, resetPassword, auth } from '../Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authState, login } from '../redux/auth/authSlice'
import toast from 'react-hot-toast'
import { faUserGear, faKey, faUser, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../Style/Profile.css"


export default function Profile({ loading }) {

  const dispatch = useDispatch()

  const user = useSelector(authState)

  const [displayName, setDisplayName] = useState(user.displayName || "")
  const [avatar, setAvatar] = useState(user.photoURL || "")
  const [password, setPassword] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (displayName.length > 6) {
      await update({
        displayName,
        photoURL: avatar
      })
    } else {
      toast.error("Bilgiler yetersiz")
    }

    dispatch(login({
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid
    }))
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      toast.error("Şifre çok kısa")
    }
    await resetPassword(password)

  }

  return (
    <div className='profile-container'>
      <div className='profile'>
        <i className='userGear'> <FontAwesomeIcon icon={faUserGear} /></i>
        <form onSubmit={handleSubmit}>
          <h1>Profil Güncelle</h1>
          <div className=' mt-3'>
            <i><FontAwesomeIcon icon={faUser} /> </i>
            <label>Kullanıcı Adı</label><br />
            <input type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            /><br />
          </div>
          <div className='mt-3'>
            <i><FontAwesomeIcon icon={faImage} /> </i>
            <label>Fotoğraf *(isteğe bağlı) </label><br />
            <input placeholder='Url olarak girin '
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            /><br />
          </div>
          <button type='submit' className='btn btn-success mt-2'>Güncelle</button>
        </form>
        <form onSubmit={handleResetPassword} className="mt-4">
          <h1>Şifreyi Güncelle</h1> 
          <div className='mt-4'> 
          <i><FontAwesomeIcon icon={faKey} /></i>
            <label>Sifre</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
          </div>
          <button
            disabled={!password}
            type='submit'
            className='btn btn-success mt-2'>Şifreyi Güncelle</button>
        </form>

      </div>
    </div>
  )
}
