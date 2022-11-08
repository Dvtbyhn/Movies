import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList/MovieList'
import axios from "axios"
import { Routes, Route } from 'react-router-dom';
import LoginUp from './components/LoginUp/LoginUp';
import SignUp from './components/SignUp/SignUp';
import Page404 from './Page404';
import Detail from './components/Detail/Detail';
import Header from "./components/Header/Header"
import UpdateProfile from './components/UpdateProfile';
import toast, { Toaster } from 'react-hot-toast';
import LikeMovie from './components/LikeMovie/LikeMovie';


export default function App() {


  const [film, setFilm] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState([])


  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    const get = localStorage.getItem("favorites")
    setFavorite(JSON.parse(get))
  }, [])

  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorite)))



  const getMovies = async () => {
    setLoading(true)
    const getData = await axios.get("http://localhost:3001/movies")
    setFilm(getData.data)
    setLoading(false)

  }

  const searchMovie = (e) => setSearch(e.target.value)

  let filteredMovies = film.filter(
    (movie) => {
      return movie.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }
  ).sort((a, b) => {
    return b.name < a.name ? 1 : -1
  });


  const detailMovie = async (id) => {
    await axios.put(`http://localhost:3001/movies/${id}`)
  }

    const addToFavorite = id => {

    const newFavorite = film.find(item => item.id === id)
    const hasFavorite = favorite.find(item => item.id === id) 
     if (newFavorite) {
      setFavorite([...favorite, newFavorite])
      toast.success("Favorilerim'e eklendi") 
      if (hasFavorite) {
    setFavorite([...favorite])
    toast.error("Film zaten eklendi")
    }
      
    }   
  };

  const deleteToFavorite = id => {
    const del = favorite.filter(item => item.id !== id);
    setFavorite(del);
    toast.success("Film favorilerimden çıkarıldı")
  };


  const deleteAllFavorite = () => setFavorite([])


 
  return (
    <div className='container'>
      <Header searchMovie={searchMovie} favorite={favorite} />
      <Toaster />
      <Routes>

        <Route path='/'
          element={<MovieList
            addToFavorite={addToFavorite}
            filteredMovies={filteredMovies}
            loading={loading} />} />

        <Route path='/update' element={<UpdateProfile />} />

        <Route path='/signUp' element={<SignUp />} />

        <Route path='/loginUp' element={<LoginUp />} />

        <Route path='/detail/:id'
          element={
            <Detail
            addToFavorite={  addToFavorite}
              loading={loading}
              detailMovie={(id, movie) => {
                detailMovie(id, movie)
              }} />} />

        <Route path='/favorite'
          element={<LikeMovie
            deleteAllFavorite={deleteAllFavorite}
            favorite={favorite}

            deleteToFavorite={deleteToFavorite}
            loading={loading} />} />


        <Route path='*' element={<Page404 />} />
      </Routes>


    </div>
  )
}
