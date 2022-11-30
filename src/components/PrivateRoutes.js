import React from 'react'
import { authState } from '../redux/auth/authSlice'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function PrivateRoutes() {
    
    const user = useSelector(authState)
    return user ? <Outlet /> : <Navigate to={"/login"} />
}
