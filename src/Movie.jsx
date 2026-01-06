import {useState, useEffect} from "react";
import {useAppContext} from "./contexts/appContext.jsx";
import { Duration } from 'luxon'

import {StarRating} from './StarRating.jsx'

export const Movie = () => {
  const {selectedMovie, userData, userMovieData, setUserMovieData} = useAppContext()
  console.log("Movie:userMovieData", userMovieData)
  const [posterError, setPosterError] = useState(false)

  useEffect(() => {
    setPosterError(false)
  }, [selectedMovie])

  const {
    id,
    datePublished,
    directors = [],
    duration,
    mainActors = [],
    posterUrl = '',
    rating,
    ratingValue,
    summary,
    title,
    writers} = selectedMovie

  const year = datePublished ? `(${new Date(datePublished).getFullYear()})` : null

  const notesHandler = (e) => {
    const noteValue = e.target.value
    setUserMovieData(prev => ({...prev, note: noteValue}))
    setLocalData({id: id, title: title, note: noteValue})
  }

  const setLocalData = (userMovieData) => {
    console.log("userMovieData", userMovieData)
    console.log("userData", userData)

    const index = userData.findIndex(i => i.id === userMovieData.id);
    console.log("index Match?", index)
    (index !== -1) ? userData[index] = { ...userData[index], ...userMovieData } : userData.push(userMovieData);

    localStorage.setItem("userData", JSON.stringify(userData))
  }

  return (
      <>
        <h3>{title} {year && (year)}</h3>
        <div>
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
            <div className="d-flex flex-column justify-content-center bg-dark" style={{width: '250px', height: '387px'}}>
              <div className="text-white w-full text-center">Poster Unavailable</div>
            </div>
          }
        </div>
        {ratingValue && <div>Audience Rating: <StarRating rating={ratingValue} /></div>}
        {/*{myRatingValue && <div>My Rating: {myRating}</div>}*/}
        {mainActors.length > 0 && <div>Staring: {mainActors.join(", ")}</div> }
        {directors.length > 0 && <div>Directed by {directors.join(", ")}</div>}
        {duration && <div>Runtime: {Duration.fromISO(duration).toHuman()}</div>}
        <div>
          My Notes
          <textarea
              style={{width: '100%', height: "150px"}}
              placeholder="Enter your notes on this movie here"
              value={userMovieData.note}
              onChange={notesHandler}
          />
        </div>
      </>
  )
}