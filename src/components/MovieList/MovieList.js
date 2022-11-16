import React from 'react'
import "./style.css"
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux"
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';


export default function MovieList({
    search,
    addToFavorite,
    setFilm,
    film,
    handleCategoryChange,
    movieItem,
    filteredList,
    favorite,
    deleteToFavorite,
    getFavorite
}) {

    const { user } = useSelector(state => state.auth)
    return (

        <>
 <div className='container'>
       <div className='row'>
  <Filter
      handleCategoryChange={handleCategoryChange}
      movieItem={movieItem}
      film={film}
      setFilm={setFilm}
  />
  { 
      filteredList.filter((movie) =>
 movie.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ).sort((a, b) => {
 return b.name < a.name ? 1 : -1
      }).map((movie, i) => {
 return (
     <div key={i} className='col-md-6 col-lg-3 p-3 '>

<div className="card text-center" style={{
    boxShadow: "5px 4px 8px gray,5px 5px 18px black ,2px 3px 4px 4px green",
    backgroundColor: "black", color: "white"
}}>

    <NavLink to={`/detail/${movie.id}`}>
        <img src={movie.imageURL}
   className="card-img-top" alt={movie.name} />
    </NavLink>

    <div className="card-body">
        <h5 className="card-title"> {movie.name} </h5>
        <p className="card-text"></p>
        <div className='card-footer'>
   <div>PUAN: {movie.rating} </div>
   <div>TÜR: {movie.kind} </div>

   {user ?  <span> { favorite.includes(movie) ? 
       <button onClick={() => deleteToFavorite(movie.id)} 
  className="btn btn-danger mt-2 mb-2">Favorilerimden Çıkar</button>
  :<button className='btn btn-warning mt-2 mb-2' 
  onClick={() => addToFavorite(movie.id)}>Favorilerime ekle</button>
       }
        </span> : null}<br/>
   <NavLink className='btn btn-success ' to={`/detail/${movie.id}`}> Detay</NavLink>
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
