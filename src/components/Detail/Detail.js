import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import "./Detail.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


library.add(faHeart);

export default function Detail({ loading, addToFavorite, }) {

  const { user } = useSelector(state => state.auth)

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
              <div className="card"   >
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

              <div style={{margin:"30px"}}>
                {user ? <span onClick={() => addToFavorite(movie.id)} className='heart-red'>
                  <FontAwesomeIcon icon="heart" /> </span> : null}
              </div>


            </div>

          </div>



        </div>
      }
    </div>
  )
}
