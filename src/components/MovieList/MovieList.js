import React from 'react'
import "./style.css"





export default function MovieList(props) {

  const truncateOverview = (string, maxLength) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)} ...`;
  }


  return (

    <>
 <div className='container mt-4'>
   <div className='row'>

{
  props.filteredMovies.map((movie, i) => {
    return (
 <div key={i} className='col-xs-12 col-sm-12 col-md-6 col-lg-4 g-5'>
   <div className="card" style={{

boxShadow: "5px 4px 8px gray,  5px 5px 18px black ,2px 3px 4px 4px green"
   }}>
<img src={movie.imageURL} className="card-img-top" alt={movie.name} />
<div className="card-body">
  <h5 className="card-title"> {movie.name} </h5>
  <p className="card-text"> {truncateOverview(movie.overview, 100)} </p>
  <div className='d-flex justify-content-between'>
    <button className="btn btn-light" disabled> {movie.rating} </button>
    <button className='btn btn-light' disabled>{movie.kind} </button>
  
  </div>
  </div>
 </div>
 </div>
    )
  })}

  </div>
  </div>
    </>
  )
}
