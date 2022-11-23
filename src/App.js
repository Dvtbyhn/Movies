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


export default function App() {


  const isLoading = useSelector(state => state.movies.isLoading)
  const  dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])


    if(isLoading) {
     return <Loading />
    }


  return (
    <div>
      <Toaster />
       <Header />
       <Routes>
          <Route path='/' element={<MovieList/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-up' element={<Sign />} />
          <Route path='/login-up' element={<Login />} />
          <Route path='/detail/:id'element={<Detail/>} />  
          <Route path='/favorite' element={<LikeMovie/>} />
          <Route path='*' element={<Page404 />} />
        </Routes>
    </div>
  )
}
