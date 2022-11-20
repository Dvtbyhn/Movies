import React, { useEffect, useState, useMemo } from 'react'
import MovieList from './components/MovieList/MovieList'
import axios from "axios"
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Sign from './components/Sign/Sign';
import Page404 from './Page404';
import Detail from './components/Detail/Detail';
import Header from "./components/Header/Header"
import Profile from './components/Profile';
import toast, { Toaster } from 'react-hot-toast';
import LikeMovie from './components/LikeMovie/LikeMovie';
import Loading from './components/Loading';
import "./App.css"

export default function App() {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState([])
  const [selectedCategory, setSelectedCategory] = useState();
  const [comments, setComments] = useState("")
  const [movieComment, setMovieComment] = useState([])

  useEffect(() => {

    const get = JSON.parse(localStorage.getItem("favorites"))
    setFavorite(get)
    getMovies()

  }, [])


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite))
  }, [favorite])

  useEffect(() => {
    const comment = JSON.parse(localStorage.getItem("movComment"))
    setMovieComment(comment);
  }, [])


  useEffect(() => {
    localStorage.setItem("movComment", JSON.stringify(movieComment))
  }, [movieComment])


  const getMovies = () => {
    setLoading(true)
    axios.get("http://localhost:3001/movies")
      .then((response) => setMovies(response.data))
      .catch(() => { })
      .finally(() => setLoading(false))

  }

  const detailMovie = async (id) => {
    await axios.put(`http://localhost:3001/movies/${id}`)
  }

  const movieItem = ['Hepsi', ...new Set(movies.map(mov => mov.kind))]

  function getFilteredList() {
    if (selectedCategory === "Hepsi") {
      return movies
    }

    if (!selectedCategory) {
      return movies;
    }

    return movies.filter((item) => item.kind === selectedCategory)

  }


  const categoryList = useMemo(getFilteredList, [selectedCategory, movies]);

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  const searchMovie = (e) => setSearch(e.target.value)


  const addToFavorite = (id) => {
    const newFavorite = movies.find(item => item.id === id)

    if (newFavorite) {
      setFavorite([...favorite, newFavorite])
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
    <div>
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
                deleteToFavorite={deleteToFavorite}
                categoryList={categoryList}
                addToFavorite={addToFavorite}
                selectedCategory={selectedCategory}
              />} >

          </Route>

          <Route path='/profile' element={<Profile />} />

          <Route path='/sign-up' element={<Sign />} />

          <Route path='/login-up' element={<Login />} />

          <Route path='/detail/:id'
            element={
              <Detail
                comments={comments}
                setComments={setComments}
                movieComment={movieComment}
                setMovieComment={setMovieComment}
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
