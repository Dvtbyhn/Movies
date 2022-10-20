import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import MovieList from './components/MovieList/MovieList'
import axios from "axios"
import { Routes, Route } from 'react-router-dom';
import LoginUp from './components/LoginUp/LoginUp';
import SignUp from './components/SignUp/SignUp';
import Page404 from './Page404';


export default function App() {


  const [film, setFilm] = useState([])
  const [search, setSearch] = useState("")



  useEffect(() => {
    getMovies()
  }, [])


  const getMovies = async () => {
    const getData = await axios.get("http://localhost:3001/movies")
    setFilm(getData.data)
  }


  const searchMovie = (e) => setSearch(e.target.value)


  let filteredMovies = film.filter(
    (movie) => {
      return movie.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }
  ).sort((a, b) => {
    return b.name < a.name ? 1  : -1
  });



  return (
    <div className='container'>
     
        <Header searchMovieProp={searchMovie} />
        <Routes>

          <Route path='/' element={<LoginUp />} />
          <Route index path='/signUp' element={<SignUp />} />
          <Route path='/app' element={ <MovieList  filteredMovies={filteredMovies} movies={film} /> }  />
       
          <Route path='*' element={<Page404 />} />
        </Routes>

   
    </div>
  )
}
