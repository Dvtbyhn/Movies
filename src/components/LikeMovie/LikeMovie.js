import React, { useEffect } from 'react'
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';

export default function LikeMovie({ loading, favorite,deleteToFavorite,setFavorite }) {



  useEffect(() => {
      localStorage.setItem("favorite",JSON.stringify(favorite))
  },[favorite])

  useEffect(() => {
   const aa = JSON.parse(localStorage.getItem("favorite"))
  
  })
 



    return (
        <div>

<div className='row'>
    {loading ? <Loading /> :

 favorite.map((movie,i) => {
return (

<div key={i} className='col-xs-12 col-sm-12 col-md-6 col-lg-4 g-5'>
 <div  className="card" style={{
boxShadow: "5px 4px 8px gray,5px 5px 18px black ,2px 3px 4px 4px green"
 }}>

<img src={movie.imageURL} className="card-img-top" alt='' />
<div className="card-body">
<h5 className="card-title"> {movie.name}  </h5>
<p className="card-text"> {movie.overview}  </p>
<div className='d-flex justify-content-between'>
 <button disabled className="btn btn-light" >{movie.rating} </button>
 <button disabled className='btn btn-light' > {movie.kind} </button>
 <button className='btn btn-light'onClick={() => deleteToFavorite(movie.id )}  > Favorimden Çıkar</button>

 <NavLink className='btn btn-success' to={`/detail/${movie.id}`}> Detay</NavLink>
</div>
</div>
</div>
</div>
)
})

}
            </div>
        </div>
    )
}
