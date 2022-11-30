import React, { useMemo } from 'react'
import "../Style/style.css"
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import Footer from './Footer';
import { addToFavorite, deleteToFavorite, favoriteMovies, moviesAll, categories } from '../redux/movies/moviesSlice';
import { authState } from '../redux/auth/authSlice';
import Category from './Category';

export default function MovieList() {
    const user = useSelector(authState)
    const favorite = useSelector(favoriteMovies)
    const movies = useSelector(moviesAll)
    const category = useSelector(categories)
    const search = useSelector(state => state.movies.search)

    const dispatch = useDispatch()

    function getFilteredList() {
        if (category === "Hepsi") {
            return movies
        }
        if (!category) {
            return movies;
        }
        return movies.filter((item) => item.kind === category)
    }

    const moviesCategory = useMemo(getFilteredList, [category, movies])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <Category />
                    {
                        moviesCategory.filter((movie) => {
                            return movie.name.toLowerCase().indexOf(search.toLowerCase() ) !== -1
                        }).map((movie, i) => {
                            return (
                                <div key={i} className='col-md-6 col-lg-3 p-3 '>
                                    <div
                                        className="card-list text-center">
                                        <NavLink
                                            to={`/detail/${movie.id}`}>
                                            <img
                                                src={movie.imageURL}
                                                className="card-img-top"
                                                alt={movie.name}
                                            />
                                        </NavLink>
                                        <div className="card-body">
                                            <h5 className="card-title"> {movie.name} </h5>
                                            <p className="card-text"></p>
                                            <div className='card-footer'>
                                                <div>PUAN: {movie.rating} </div>
                                                <div>TÜR: {movie.kind} </div>
                                                {user ? <span>{
                                                    favorite.map((x) => x.id).includes(movie.id) ?
                                                        <button className='btn btn-danger mt-2 mb-2'
                                                            onClick={() => dispatch(deleteToFavorite(movie.id))}>Favorilerimden Çıkar</button> :
                                                        <button id='bt' className='btn text-dark mt-2 mb-2'
                                                            onClick={() => dispatch(addToFavorite(movie.id))}>Favorilerime ekle</button>
                                                }
                                                </span> : null}<br />
                                                <NavLink className='btn btn-success mb-3 ' to={`/detail/${movie.id}`}> Detay</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    <Footer />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
