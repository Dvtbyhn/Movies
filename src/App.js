import React, { useEffect } from 'react'
import  { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';
import "./App.css"
import { fetchMovies } from './redux/movies/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Login from './components/Login';
import Sign from './components/Sign';
import Page404 from './Page404';
import Detail from './components/Detail';
import MovieList from './components/MovieList'
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';
import LikeMovie from './components/LikeMovie';
import PrivateRoutes from './components/PrivateRoutes';
import { authState } from './redux/auth/authSlice';

export default function App() {
  const isLoading = useSelector(state => state.movies.isLoading)
  const  dispatch = useDispatch()
  const user = useSelector(authState)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])



  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user))
},[user])
    if(isLoading) {
     return <Loading />
    }      
  return (
    <div>
      <Toaster />
       <Header />
       <Routes>
          <Route path='/' element={<MovieList/>}/>
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile />} /> 
            <Route path='/favorite' element={<LikeMovie/>} />           
          </Route>
          <Route path='/sign' element={<Sign />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detail/:id'element={<Detail/>} />  
      
          <Route path='*' element={<Page404 />} />
        </Routes>
    </div>
  )
}
