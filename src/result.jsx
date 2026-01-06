import {getMovieData} from "./fetches.js"
import {useAppContext} from "./contexts/appContext.jsx"
import {use} from "react";

export const Result = (props) => {
  const {setSelectedMovie} = useAppContext()
  const {id, title, rating, posterUrl} = props.movie

  const getMovie= async (id) => {
    const movieData = await getMovieData(id)
    setSelectedMovie(movieData)
  }

  return (
    <div style={{cursor: "pointer"}} onClick={() => getMovie(id)} id={id}>{title} ({rating ? rating : "Unrated"})</div>
  )
}