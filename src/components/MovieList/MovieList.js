import React from 'react'
import "../Style/style.css"
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux"
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';

export default function MovieList({
    search,
    addToFavorite,
    handleCategoryChange,
    movieItem,
    categoryList,
    deleteToFavorite,
    favorite,
    selectedCategory
}) {

    const { user } = useSelector(state => state.auth)

    return (

        <>
            <div className='container'>
                <div className='row'>
                    <Filter
                        handleCategoryChange={handleCategoryChange}
                        movieItem={movieItem}
                        selectedCategory={selectedCategory}
                    />
                    {
                        categoryList
                            .filter((movie) =>
                                movie.name.toLowerCase()
                                    .indexOf(search.toLowerCase()) !== -1
                            ).sort((a, b) => {
                                return b.name < a.name ? 1 : -1
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
                                                    {user ? <span> {
                                                        favorite.map((x) => x.id).includes(movie.id) ?
                                                            <button className='btn btn-danger mt-2 mb-2'
                                                                onClick={() => deleteToFavorite(movie.id)}>Favorilerimden Çıkar</button> :
                                                            <button id='bt' className='btn text-dark mt-2 mb-2'
                                                                onClick={() => addToFavorite(movie.id)}>Favorilerime ekle</button>
                                                    }</span> : null}<br />                                              
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
