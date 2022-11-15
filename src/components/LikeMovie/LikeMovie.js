import React from 'react'
import { NavLink } from 'react-router-dom';
import Modals from '../Modal/Modal';

export default function LikeMovie({
  
    favorite,
    deleteToFavorite,
    deleteAllFavorite,
    userID,

}) {

    console.log(userID)

    return (
        <div>
            <div className='container' >
                <div className='row'>

                    {favorite.length > 1 ? <div className='col-12 text-end'>

                        <Modals    deleteAllFavorite={deleteAllFavorite}/>
                    </div> : null}

                    {
                     favorite.length < 1 ? <h1  style={{color:"white",marginTop:"15rem",textAlign:"center"}}> Henüz film eklemediniz! </h1>
                     :
                
                        favorite.map((movie, i) => {

                            return (
                                <>
                                    <div key={i} className='col-xs-12 col-sm-12 col-md-6 col-lg-4 g-5'>
                                        <div className="card text-center" style={{
                                            boxShadow: "5px 4px 8px gray,5px 5px 18px black ,2px 3px 4px 4px green",
                                            backgroundColor: "black", color: "white",
                                        }}>

                                            <img src={movie.imageURL} className="card-img-top" alt='' />
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
