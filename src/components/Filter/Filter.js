import React from 'react'

export default function Filter({ handleCategoryChange, movieItem }) {



  return (
    <div className='text-center'>

    <h2 style={{ color:"white" }}>Kategoriler</h2>

    <select style={{
      width:"40%",
    backgroundColor:"black",
    color:"white",
    height:"2.5rem",
    textAlign:"center"}}

      onChange={handleCategoryChange}>

        {movieItem.map((kind, id) => {
          return (
             <option value={kind}
              style={{fontSize:"20px",backgroundColor:"black",color:"white"}} 
              key={id}> {kind} </option>
          )
        })}

      </select>

    </div>
  )
}
