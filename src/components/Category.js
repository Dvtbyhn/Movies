import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../Style/Category.css"
import { categoryMovies, moviesAll, categories } from '../redux/movies/moviesSlice'


export default function Category() {

  const movies = useSelector(moviesAll)
  const category = useSelector(categories)

  const movieCategories = ['Hepsi', ...new Set(movies.map(mov => mov.kind))]
  const dispatch = useDispatch()

  return (
    <div className=' text-center'>
      <h2 className="text-light">Kategoriler</h2>
      <select className='categoryFilter'
        value={category}
        onChange={(e) => dispatch(categoryMovies(e.target.value))}
      >
        {
          movieCategories.map((kind, id) => {
            return <option key={id} value={kind} className='optionCategory'>{kind}</option>
          })
        }

      </select>
    </div>
  )
}
