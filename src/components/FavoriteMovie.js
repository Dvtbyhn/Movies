import React from 'react'
import { NavLink } from 'react-router-dom';
import Modals from './Modal';
import "../Style/FavoriteMovie.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteToFavorite, favoriteMovies, filteredFavorites } from '../redux/movies/moviesSlice';

export default function LikeMovie() {

    const favorite = useSelector(favoriteMovies)
    const filtered = useSelector(filteredFavorites)

    const dispatch = useDispatch()

    return (
        <div>
            <div className='container' >
                <div className='row'>
                    {favorite.length > 1 ? <div className='col-12 text-end mt-3'>
                        <Modals />
                    </div> : null}
                    {
                        favorite.length < 1 ?
                            <h1 className='head'> Henüz film eklemediniz! </h1>
                            :
                            filtered.map((movie, id) => {
                                return (
                                    <>
                                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3 g-5'>
                                            <div key={id} className="card text-center">
                                                <NavLink to={`detail/${movie.id}`}>
                                                    <img src={movie.imageURL}
                                                        className="card-img-top" alt={movie.name} />
                                                </NavLink>
                                                <div className="card-body">
                                                    <h5 className="card-title">{movie.name}</h5>
                                                    <div>Puan: {movie.rating} </div>
                                                    <div>Tür: {movie.kind} </div>
                                                    <button
                                                        style={{ marginRight: "5px" }}
                                                        className='btn btn-danger'
                                                        onClick={() => dispatch(deleteToFavorite(movie.id))}>Favorimden Çıkar</button>
                                                    <NavLink className='btn btn-success'
                                                        to={`/detail/${movie.id}`}> Detay</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}
