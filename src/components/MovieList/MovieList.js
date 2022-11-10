import React from 'react'
import "./style.css"
import { NavLink, Outlet } from 'react-router-dom';
import Loading from '../Loading';
import { useSelector } from "react-redux"



export default function MovieList({
  filteredMovies,
  loading,
  addToFavorite,

}) {


  const { user } = useSelector(state => state.auth)

  return (

    <>  

      <div className='container'>

        <div className='row'>
  
        
          {loading ? <Loading /> :

            filteredMovies.map((movie, i) => {
              return (
                <div key={i} className='col-md-6 col-lg-3 p-3 '>
                  <div className="card text-center" style={{
                    boxShadow: "5px 4px 8px gray,5px 5px 18px black ,2px 3px 4px 4px green",
                    backgroundColor: "black", color: "white"
                  }}>

                    <img src={movie.imageURL} className="card-img-top" alt={movie.name} />
                    <div className="card-body">
                      <h5 className="card-title"> {movie.name} </h5>
                      <p className="card-text">  </p>
                      <div className='card-footer  '>
                        <div>PUAN: {movie.rating} </div>
                        <div>TÜR: {movie.kind} </div>
                        {user ? <span>
                          <button onClick={() => addToFavorite(movie.id)} className={"btn btn-warning"}>Favorilerime Ekle</button> </span> : null}
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
