import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {   useParams } from 'react-router-dom';
import Loading from '../Loading';
import "./Detail.css"
export default function Detail({loading}) {



  const [movie, setMovie] = useState({})

  const { id } = useParams()

  useEffect(() => {

  axios.get(`http://localhost:3001/movies/${id}`)
      .then(response => setMovie(response.data))
  })

  return (
    <div>
   {loading ? <Loading />
   :
      <div className='container-detail'>
          
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-3'>
            <div className="card" >
              <img src={movie.imageURL} className="card-img-top" alt={movie.name} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-6'>
            <h4> Film Adı : {movie.name} </h4>
            <p> <h4>Hakkında : </h4>{movie.overview} </p>
            <p> <h4>Tür:</h4> {movie.kind} </p>
          
          </div>

        </div>



      </div>
  }
    </div>
  )
}
