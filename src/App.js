import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';
import "./Style/App.css"
import { fetchMovies } from './redux/movies/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from './redux/auth/authSlice';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Sign from './components/Sign';
import Page404 from './components/Page404';
import Detail from './components/Detail';
import MovieList from './components/MovieList'
import Profile from './components/Profile';
import FavoriteMovie from './components/FavoriteMovie';
import PrivateRoutes from './components/PrivateRoutes';


export default function App() {

  const isLoading = useSelector(state => state.movies.isLoading)

  const dispatch = useDispatch()
  const user = useSelector(authState)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<MovieList />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/favorite' element={<FavoriteMovie />} />
        </Route>
        <Route path='/sign' element={<Sign />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  )
}
