import { Duration } from 'luxon'

import {StarRating} from './StarRating.jsx'

export const Movie = (props) => {
  const {movie} = props
  const {
    datePublished,
    directors = [],
    duration,
    mainActors = [],
    posterUrl = '', rating, ratingValue, summary, title, writers} = movie

    const year = datePublished ? `(${new Date(datePublished).getFullYear()})` : null

    const myRatingValue = null
  return (
      <>
        <h3>{title} {year && (year)}</h3>
        <div>
          {posterUrl ?
          <img
              src={posterUrl}
              alt={title}
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
      </>
  )
}