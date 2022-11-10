import React from 'react'

export default function Filter({filterCategory,movieItem,setFilm,film}) {

   
 

  return (
    <div>
       <h2 style={{color:"white"}}>Kategoriler</h2>
             {movieItem.map((kind,id) => {
                return (
                    <button style={{marginLeft:"12px"}} 
                     className='btn btn-dark mt-2' key={id} 
                    onClick={() => filterCategory(kind)}>
                       {kind}
                    </button>
                )
             })}
             <button style={{marginLeft:"12px"}} className='btn btn-dark mt-2' 
             onClick={() => { return setFilm(film)} }>Hepsi</button>
      

    </div>
  )
}
