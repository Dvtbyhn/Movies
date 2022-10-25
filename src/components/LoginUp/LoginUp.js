import React from 'react'
import "./LoginUp.css"
import { NavLink, Link } from 'react-router-dom'





export default function LoginUp() {


    return (
        <>
<div className='container-login ' >
    <div className='card-login'>
  <img src="https://media.tenor.com/y1yvLwIhfNwAAAAC/television-galaxies.gif"
className="gif " alt="..." />
  <div className=" text-center" >
<h2 className="title ">Giriş Yap</h2>
<form>
    <div className='mt-3'>
  <label>Kullanıcı Adı</label><br />
  <input type="text" /><br />
    </div>

    <div className='mt-4'>
        <label>Şifre</label><br />
        <input type="password" /><br />
    </div>

    <NavLink to={"/app"} type='submit'
        className='btn btn-success mt-2'>Giriş Yap</NavLink>
    <p className='mt-4'>
        Eğer üye değilseniz <Link to={"signUp"}>buradan</Link> üye olabilirsiniz
    </p>
</form>
 </div>
</div>

</div>


        </>
    )
}


