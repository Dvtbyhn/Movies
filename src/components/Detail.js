
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import "../Style/Detail.css"
import { deleteToFavorite, addToFavorite, favoriteMovies } from '../redux/movies/moviesSlice';
import { authState } from '../redux/auth/authSlice';

export default function Detail() {


  const user = useSelector(authState)
  const favorite = useSelector(favoriteMovies)

  const dispatch = useDispatch()

  const [movie, setMovie] = useState({})

  const { id } = useParams()

  useEffect(() => {
       fetch(`http://localhost:3001/movies/${id}`)
      .then(response => response.json())
      .then(data => setMovie(data))
  })

  return (
    <div>
      {
        <div className='container' style={{ color: "white" }} >
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-3'>
              <div className="card mt-5" >
                <img src={movie.imageURL} className="card-img-top" alt={movie.name} />
              </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6' style={{ padding: "40px" }} >
              <div className='padd' style={{ margin: "30px" }}>
                <h3>Filmin Adı</h3>
                <h4> {movie.name} </h4>
              </div>
              <div style={{ margin: "30px" }}>
                <h3>Hakkında</h3>
                <p>{movie.overview} </p>
              </div>
              <div style={{ margin: "30px" }}>
                <h3>Tür</h3>
                <p>{movie.kind} </p>
              </div>
              <div style={{ margin: "30px" }}>
                {user ?
                  <span>
                    {
                      favorite.map((x) => x.id).includes(movie.id) ?
                        <button className='btn btn-danger mt-2 mb-2'
                          onClick={() => dispatch(deleteToFavorite(movie.id))}>Favorilerimden Çıkar</button> :
                        <button className='btn btn-warning mt-2 mb-2'
                          onClick={() => dispatch(addToFavorite(movie.id))}>Favorilerime ekle</button>
                    }
                  </span> : null}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
