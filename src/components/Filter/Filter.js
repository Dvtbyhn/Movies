import React from 'react'
import "../Style/Filter.css"


export default function Filter({ handleCategoryChange, movieItem,selectedCategory }) {

  return (
    <div className=' text-center'>
      <h2 >Kategoriler</h2>
      <select 
      className='categoryFilter'
        value={selectedCategory}
        onChange={handleCategoryChange}>
        {movieItem.map((kind, id) => {
          return (
            <option className='optionCategory'  
            value={kind} 
              key={id}> {kind} </option>
          )
        })}
      </select>
    </div>
  )
}
