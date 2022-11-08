import React from 'react'
import "./style.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { NavLink, Outlet } from 'react-router-dom';
import Loading from '../Loading';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux"

library.add(faHeart);

export default function MovieList({
  filteredMovies,
  loading,
  addToFavorite,
  heart

}) 
{


  const {user} = useSelector(state => state.auth)

  return (

    <>
 <div>
        
<div className='row'>
{loading ? <Loading /> : 
 
filteredMovies.map((movie, i) => {
return (
<div key={i} className='col-md-6 col-lg-4 g-5'>
<div className="card text-center" style={{
boxShadow: "5px 4px 8px gray,5px 5px 18px black ,2px 3px 4px 4px green",
backgroundColor:"black",color:"white"
}}>
    
 <img src={movie.imageURL} className="card-img-top" alt={movie.name}  />
 <div className="card-body">
<h5 className="card-title"> {movie.name} </h5>
<p className="card-text">  </p>
<div className='card-footer  '>
<div>PUAN: {movie.rating} </div>
<div>TÜR: {movie.kind} </div>
{user ? <span>
<FontAwesomeIcon onClick={() =>addToFavorite(movie.id)} className={!heart ? "heart" : "heart-red"} size='xl' icon="heart"/> </span> : null}
<NavLink className='btn btn-success' to={`/detail/${movie.id}`}> Detay</NavLink>
</div>
</div>
</div>
</div>
 )
})}
<Outlet />
</div>
</div>
</>
  )
}
