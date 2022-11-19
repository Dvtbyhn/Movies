import React from 'react'
import { NavLink } from 'react-router-dom';
import Modals from '../Modal/Modal';
import "./LikeMovie.css"

export default function LikeMovie({
    favorite,
    deleteToFavorite,
    deleteAllFavorite,
    search
}) {

    return (
        <div>
            <div className='container' >
                <div className='row'>
                    {favorite.length > 1 ? <div className='col-12 text-end'>
                        <Modals deleteAllFavorite={deleteAllFavorite} />
                    </div> : null}
                    {
                        favorite.length < 1 ?
                            <h1 className='head'> Henüz film eklemediniz! </h1>
                            :
                            favorite.filter((movie) =>
                            movie.name.toLowerCase()
                                .indexOf(search.toLowerCase()) !== -1
                        ).map((movie,id) => {
                                return (
                                    <>
                                        <div key={id} className='col-xs-12 col-sm-12 col-md-6 col-lg-3 g-5'>
                                            <div  className="card text-center">
                                                <NavLink to={`/detail/${movie.id}`}>
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
                                                        onClick={() => deleteToFavorite(movie.id)}>Favorimden Çıkar</button>
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
