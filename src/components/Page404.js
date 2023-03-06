import React from 'react'
import { NavLink } from 'react-router-dom'



export default function Page404() {
  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1
        style={{ marginTop: "15rem" }}>
        Oooopsss!! Sayfa Bulunamadı... </h1>
      <NavLink style={{ color: "white" }} to={"/"}>Geri Dön </NavLink>
    </div>
  )
}
