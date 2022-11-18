import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import Card from 'react-bootstrap/Card';
import "./Detail.css"

export default function Detail({
  addToFavorite,
  favorite,
  deleteToFavorite,
  movieComment,
  setMovieComment,
  comments,
  setComments
}) {
  const { user } = useSelector(state => state.auth)
  const [movie, setMovie] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${id}`)
      .then(response => setMovie(response.data))
  })

  const handleChange = (e) => {
    setComments(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comments !== "") {
      newComment()
    }
    if (comments === "") {
      toast.error("Lütfen yorum giriniz")
    }
    setComments("")
  }

  const newComment = () => {
    const add = { comment: comments }
    movieComment.push(add)
    setMovieComment([...movieComment].sort((a,b) => {
      return a.first > b.first ? 1 :-1
    }))
    toast.success("Yorumunuz eklendi")
  }


  return (
    <div>
      {
        <div className='container' style={{ color: "white" }}>
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
                  <span> {
                    favorite.map((x) => x.id).includes(movie.id) ?
                      <button className='btn btn-danger mt-2 mb-2'
                        onClick={() => deleteToFavorite(movie.id)}>Favorilerimden Çıkar</button> :
                      <button className='btn btn-warning mt-2 mb-2'
                        onClick={() => addToFavorite(movie.id)}>Favorilerime ekle</button>
                  }
                  </span> : null}
              </div>
            </div>
            <div>
              <div className='col-xs-6 col-sm-6 col-md-12'>
                <h1>Yorumlar</h1>
                <h5 className='mt-4'>Yorumunu Paylaş</h5>
                <form onSubmit={handleSubmit}>
                  <textarea
                     className='texterea'
                     style={{outline:"none"}}
                    value={comments}
                    onChange={handleChange}
                    cols={60}
                    rows={3} />
                  <button
                   className='btn btn-success mb-4' 
                   style={{marginLeft:"20px"}}
                  >Gönder</button>
                </form>
                     
                <div>
                    {
                      Array.isArray(movieComment)
                        ? movieComment.map((item) => {
                          return (
                            <>                 
                              <Card className='cardComment' style={{
                                color:"black",
                                backgroundColor:"gray",
                                maxWidth:"500px",
                                marginBottom:"10px"}}>
                                <Card.Header className='d-inline-flex justify-content-between'>                            
                                  <div className='d-inline-flex justify-content-between mt-3' >
                                    <h6> Yazıldığı Tarih</h6>{" : "}
                                    <p>{(new Date().getDate())}</p>{"."}
                                     <p>{(new Date().getMonth())}</p>{"."}
                                    <p>{(new Date().getFullYear())}</p>
                                    </div>
                                 <button  className='btn btn-dark'>cevapla</button>
                                </Card.Header>
                                <Card.Body>                                
                                  <div className=''>
                                    <p>{item.comment}</p>    
                              </div>
                                </Card.Body>
                              </Card>
                            </>
                          )
                        }) : null
                    }
                  </div>
                </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}
