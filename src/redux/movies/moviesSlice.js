import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const fetchMovies = createAsyncThunk('movies/getMovies', async () => {
    const res = await fetch("http://localhost:3001/movies")
    return await res.json()
})


const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        moviesAll: [],
        isLoading: false,
        favorite: [],
        search: "",

    },
    reducers: {
        addToFavorite: (state, action) => {
            const id = action.payload
            const newFavorite = state.moviesAll.find(item => item.id === id)
            if (newFavorite) {
                state.favorite.push(newFavorite)
                toast.success("Film eklendi..")
            }
        },
        deleteToFavorite: (state, action) => {
            const id = action.payload
            const del = state.favorite.filter(item => item.id !== id);
            state.favorite = del
            toast.success("Film favorilerimden çıkarıldı")
        },
        deleteAllFavorite: (state) => {
            const delAll = []
            state.favorite = delAll
        },
        searchMovie: (state, action) => {
            state.search = action.payload
        },
        categoryMovies: (state, action) => {
            state.category = action.payload
        },
    },
    extraReducers: {
        [fetchMovies.pending]: (state) => {
            state.isLoading = true
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.moviesAll = action.payload
            state.isLoading = false;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export const favoriteMovies = state => state.movies.favorite
export const categories = state => state.movies.category
export const moviesAll = state => state.movies.moviesAll


export const filteredFavorites = (state) => {
    return state.movies.favorite.filter((movie) => {
        return movie.name.toLowerCase().indexOf(state.movies.search.toLowerCase()) !== -1
    })
}

export const {
    addToFavorite, deleteToFavorite,
    deleteAllFavorite, searchMovie,
    categoryMovies } = moviesSlice.actions
export default moviesSlice.reducer
