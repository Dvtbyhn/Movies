import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import moviesSlice from "./movies/moviesSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        movies: moviesSlice,

    }
}
)

export default store
