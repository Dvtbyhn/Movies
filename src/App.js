import React, { useEffect, useState, useMemo } from 'react'
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
import Loading from './components/Loading';

export default function App() {


  const [film, setFilm] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState([])
  const [selectedCategory, setSelectedCategory] = useState();
  const [comments,setComments] = useState("")
  const [movieComment,setMovieComment] = useState([])


  useEffect(() => {
    const get = JSON.parse(localStorage.getItem("favorites"))
    setFavorite(get)
  }, [])

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
     localStorage.setItem("favorites", JSON.stringify(favorite))
  })

  useEffect(() => {
    const comment = JSON.parse(localStorage.getItem("movComment"))
    setMovieComment (comment );
  },[])


  useEffect(() => {
    localStorage.setItem("movComment",JSON.stringify(movieComment))
  })

  
  const getMovies = async () => {
    setLoading(true)
    const getData = await axios.get("http://localhost:3001/movies")
    setFilm(getData.data)
    setLoading(false)

  }

  const detailMovie = async (id) => {
    await axios.put(`http://localhost:3001/movies/${id}`)
  }
 
  const movieItem = ['Hepsi', ...new Set(film.map(mov =>  mov.kind))]

  function getFilteredList() {
    if (selectedCategory === "Hepsi") {
      return film
    }

    if (!selectedCategory) {
      return film;
    }

    return film.filter((item) => item.kind === selectedCategory)
    
  }


  var filteredList = useMemo(getFilteredList, [selectedCategory, film]);

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  const searchMovie = (e) => setSearch(e.target.value)


  const addToFavorite = (id) => {
    const newFavorite = film.find(item => item.id === id)
  
    if (newFavorite) {
      setFavorite([...favorite, newFavorite ])
      toast.success("Film Eklendi")
    }

  }

  const deleteToFavorite = id => {
    const del = favorite.filter(item => item.id !== id);
    setFavorite(del);
    toast.success("Film favorilerimden çıkarıldı")
  };


  const deleteAllFavorite = () => {
    setFavorite([])
  }


  return (
    <div >
      <Header
        searchMovie={searchMovie}
        favorite={favorite}
      />
      <Toaster />
      {loading ? <Loading /> :
        <Routes>
          <Route path='/'
            element={
            <MovieList
              search={search}
              movieItem={movieItem}
              handleCategoryChange={handleCategoryChange}
              favorite={favorite}
              film={film}
              deleteToFavorite={deleteToFavorite}
              setFilm={setFilm}
              filteredList={filteredList}
              addToFavorite={addToFavorite}
              selectedCategory={selectedCategory}
            />} >

          </Route>

          <Route path='/update' element={<UpdateProfile />} />

          <Route path='/signUp' element={<SignUp />} />

          <Route path='/loginUp' element={<LoginUp />} />

          <Route path='/detail/:id'
            element={
              <Detail
              comments={comments}
              setComments={setComments}
              movieComment={movieComment}
              setMovieComment={setMovieComment}
              setFilm={setFilm}
               film={film}
              favorite={favorite}
                addToFavorite={addToFavorite} 
                  deleteToFavorite={deleteToFavorite}
                detailMovie={(id, movie) => {
                  detailMovie(id, movie)
                }} />} />

          <Route path='/favorite'
            element={<LikeMovie
            search={search}
              deleteAllFavorite={deleteAllFavorite}
              favorite={favorite}
              deleteToFavorite={deleteToFavorite}
            />
            } />
          <Route path='*' element={<Page404 />} />
        </Routes>
      }
    </div>
    )
}
