import {useState, useEffect} from "react";
import { Duration } from 'luxon'

import {StarRating} from './StarRating.jsx'

export const Movie = (props) => {
  const [note, setNote] = useState('')
  const [posterError, setPosterError] = useState(false)
  const [userData, setUserData] = useState(() =>{
    const userDataRaw = localStorage.getItem("userData") || [];
    return JSON.parse(userDataRaw)
  })

  const {movie} = props
  const {
    id,
    datePublished,
    directors = [],
    duration,
    mainActors = [],
    posterUrl = '', rating, ratingValue, summary, title, writers} = movie

  const year = datePublished ? `(${new Date(datePublished).getFullYear()})` : null

  const myRatingValue = null

  useEffect(() => {
    console.log("userData!!!!!!!!!!!!!!!!", userData)
  },[])

  const notesHandler = (e) => {
    const noteValue = e.target.value
    setNote(noteValue)
    setLocalData({id: id, title: title, note: noteValue})
  }

  const setLocalData = (userMovieData) => {
    console.log("userMovieData", userMovieData)


    console.log("userData", userData)

    const index = userData.findIndex(i => i.id === userMovieData.id);
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
            <div style={{height: '250px', width: '387px'}}>
              Scene Missing
            </div>
          }
        </div>
        {ratingValue && <div>Audience Rating: <StarRating rating={5.5} /></div>}
        {/*{myRatingValue && <div>My Rating: {myRating}</div>}*/}
        {mainActors.length > 0 && <div>Staring: {mainActors.join(", ")}</div> }
        {directors.length > 0 && <div>Directed by {directors.join(", ")}</div>}
        {duration && <div>Runtime: {Duration.fromISO(duration).toHuman()}</div>}
        <div>
          My Notes
          <textarea
              style={{width: '100%', height: "150px"}}
              placeholder="Enter your notes on this movie here"
              value={note}
              onChange={notesHandler}
          />
        </div>
      </>
  )
}