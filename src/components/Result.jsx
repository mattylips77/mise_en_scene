import {getMovieData} from "../utils/fetches.js"
import {useAppContext} from "../contexts/appContext.jsx"
import {useState} from "react";
import {StarRating} from "./StarRating.jsx";
import {Star} from "lucide-react";

import {isEven} from "../utils/utils.js"

export const Result = ({movie, index}) => {
  const {selectedMovie, setSelectedMovie, userData} = useAppContext()
  const {id, title, rating} = movie
  const [isHovered, setIsHovered] = useState(false)

  const {id: selectedMovieId} = selectedMovie || {id: null}

  const getMovie = async (id) => {
    const movieData = await getMovieData(id)
    setSelectedMovie(movieData)
  }

  const thisUserMovieData = userData.find((thisUserMovie) => thisUserMovie.id === movie.id) || {}
  const {my_rating} = thisUserMovieData


  return (
      <div
          style={{cursor: "pointer"}}
          className={`px-2 ${(isHovered || id === selectedMovieId) ? "bg-primary-subtle" : isEven(index) ? "bg-white" : "bg-light"}`}
          onClick={() => getMovie(id)} id={id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >

        <div className="d-flex justify-content-between gap-4 align-items-center">
          <div>{title} ({rating ? rating : "Unrated"})</div>
          {my_rating &&
              <>
                <div data-label="all_stars"
                     className={`text-nowrap d-none ${selectedMovie ? "d-xxl-block" : "d-md-block"}`} style={{width: "170px"}}
                >
                  <StarRating rating={my_rating} size="sm"/>
                </div>
                <div data-label="one_stars"
                     className={`text-nowrap d-none ${selectedMovie ? "d-xl-block d-xxl-none" : "d-sm-block" +
                         " d-md-none"} `}
                >
                  {my_rating} <Star className="text-warning" style={{width: "15px", height: "15px", fill: "#ffc107"}}/>
                </div>
              </>
          }
        </div>
      </div>
  )
}