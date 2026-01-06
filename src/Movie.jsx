import {useState, useEffect} from "react";
import {useAppContext} from "./contexts/appContext.jsx";

import {Duration} from 'luxon'
import {StarRating} from './StarRating.jsx'
import {X} from 'lucide-react';

import {MovieDataCarousel} from "./MovieDataCarousel.jsx";

export const Movie = () => {
  const {selectedMovie, setSelectedMovie, userData, userMovieData, setUserMovieData} = useAppContext()
  console.log("Movie:userMovieData", userMovieData)
  const [posterError, setPosterError] = useState(false)

  useEffect(() => {
    setPosterError(false)

  }, [selectedMovie])

  const {
    datePublished,
    posterUrl = '',
    rating,
    title,
  } = selectedMovie

  const year = datePublished ? `(${new Date(datePublished).getFullYear()})` : null

  return (
      <>
        <div className="d-flex justify-content-between align-items-start gap-4">
          <div className="fs-4 lh-1">{title}</div>
          <X
              onClick={() => setSelectedMovie(null)}
              style={{cursor: "pointer", display: "block"}}
              size={24}
          />
        </div>
        <div className="fs-5 mb-4">{year} {rating ? `Rated: ${rating}` : "(Unrated)"}</div>
        <div className="d-flex w-100 justify-content-center">
          {posterUrl && !posterError ?
              <img
                  src={posterUrl}
                  alt={title}
                  onError={() => setPosterError(true)}
                  style={{
                    width: '250px',
                    height: '387px'
                  }}
              />
              :
              <div className="d-flex flex-column justify-content-center bg-dark"
                   style={{width: '250px', height: '387px'}}>
                <div className="text-white w-full text-center">Poster Unavailable</div>
              </div>
          }
        </div>
        <MovieDataCarousel />
      </>
  )
}