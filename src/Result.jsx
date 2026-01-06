import {getMovieData} from "./fetches.js"
import {useAppContext} from "./contexts/appContext.jsx"
import {useState} from "react";

export const Result = ({movie, index}) => {
  const {selectedMovie = {}, setSelectedMovie, userData, setUserMovieData} = useAppContext()
  const {id, title, rating} = movie
  const [isHovered, setIsHovered] = useState(false)

  const {id: selectedMovieId} = selectedMovie || {id: null}

  const getMovie= async (id) => {
    const movieData = await getMovieData(id)
    const userMovieData = userData.find((movie) => selectedMovieId === id) || {note: ""}
    setSelectedMovie(movieData)
    setUserMovieData(userMovieData)
  }

  const isEven = (number) => {
    return number % 2 === 0
  }

  return (
    <div
        style={{cursor: "pointer"}}
        className={`px-2 ${(isHovered || id === selectedMovieId) ? "bg-primary-subtle" : isEven(index) ? "bg-white" : "bg-light"}`}
        onClick={() => getMovie(id)} id={id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

    >
      {title} ({rating ? rating : "Unrated"})
    </div>
  )
}