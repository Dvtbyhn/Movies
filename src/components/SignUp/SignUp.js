import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import "./SignUp.css"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';



export default function SignUp() {

    const [successAlert, setSuccessAlert] = useState(false)



    return (
        <>

  <div>
  </div>

  <div className='container-sign'>
      <div className="card-sign mt-1 ">
<div className="body-sign">
    <NavLink className="navLink" to={"/"}> Giriş Sayfasına Dön </NavLink>
    <h3 >Yeni Kayıt Formu</h3>
              <Formik
initialValues={{
    fullName: "",
    password: "",
    confirmPassword: "",
    userName: "",
    email: ""
}}
validationSchema={Yup.object({
    fullName: Yup.string().required("İsim boş bırakılamaz"),
    password: Yup.string().required("Lütfen şifre oluşturun").min(5, "Şifreniz çok kısa"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Şifreler aynı olmalı"),
    userName: Yup.string().required("Kullanıcı adı oluşturun").min(7, "Kullanıcı adı çok kısa"),
    email: Yup.string().required("")


})}

onSubmit={(values, { resetForm, setSubmitting }) => {
    setSuccessAlert(<div className="alert  mt-2" role="alert">
        Kaydınız oluşmuştur. İyi günler
    </div>)
    setTimeout(() => {
        resetForm();
        setSubmitting(false)
        setSuccessAlert(false)
    }, 3000)
}} >
{({ values, errors, handleChange, touched, handleSubmit, handleReset, isSubmitting, dirty }) => (

    <form onSubmit={handleSubmit}>
        <div className="mb-3">
   <label htmlFor="exampleInput1"
       className="form-label">Ad Soyad</label>
   <input
       name='fullName'
       type="text"
       className="form-control"
       id="fullName"
       value={values.fullName}
       onChange={handleChange}
   />
   {errors.fullName && touched.fullName && (
       <div className='error-input' style={{ color: "red" }}>{errors.fullName}   </div>
   )}


        </div>

        <div className="mb-3">

   <label htmlFor="exampleInputPassword1"
       className="form-label">Şifre Oluştur</label>

   <input
       name='password'
       type="password"
       className="form-control"
       id="password"
       value={values.password}
       onChange={handleChange}
       required />
   {errors.password && touched.password && (
       <div className='error-input' style={{ color: "red" }}>{errors.password}   </div>
   )}
        </div>

        <div className="mb-3">
   <label htmlFor="exampleInputPassword2"
       className="form-label">Tekrar Şifre</label>

   <input
       name='confirmPassword'
       type="password"
       className="form-control"
       id="confirmPassword"
       value={values.confirmPassword}
       onChange={handleChange}
       required />
   {errors.confirmPassword && touched.confirmPassword && (
       <div className='error-input' style={{ color: "red" }}>{errors.confirmPassword}   </div>
   )}
        </div>

        <div className="mb-3">
   <label htmlFor="exampleInput2"
       className="form-label">Kullanıcı Adı </label>

   <input
       name='userName'
       type="text"
       className="form-control"
       id="userName"
       value={values.userName}
       onChange={handleChange}
       required />
   {errors.userName && touched.userName && (
       <div className='error-input' style={{ color: "red" }}>{errors.userName}   </div>
   )}
        </div>

        <div className="mb-3">
   <label htmlFor="exampleInput2"
       className="form-label">Email</label>

   <input
       name='email'
       type="email"
       className="form-control"
       id="email"
       value={values.email}
       onChange={handleChange}
       required />
        </div>
        <button type='submit' className='btn btn-success' disabled={!dirty || isSubmitting} >Kayıt Ol</button>
    </form>
)}
    </Formik>
    <div> {successAlert} </div>
</div>
     </div>
        </div>
        </>
    )
}
