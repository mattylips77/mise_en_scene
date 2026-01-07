import {useEffect} from "react";
import {StarRating} from "./StarRating.jsx";
import {Duration} from "luxon";
import {useAppContext} from "../contexts/useAppContext.jsx";

import {setLocalData} from "../utils/utils.js";

export const MovieDataCarousel = () => {
  const carouselWidth = 250
  const {selectedMovie, userData, userMovieData = {}, setUserMovieData} = useAppContext()

  const {
    id,
    directors = [],
    duration,
    mainActors = [],
    ratingValue,
    summary,
    title,
    writers = [],
  } = selectedMovie

  const {note = '', my_rating = 0} = userMovieData

  useEffect(() => {
    setUserMovieData(userData.find((movie) => movie.id === selectedMovie.id))
  }, [selectedMovie])

  const notesHandler = (e) => {
    const noteValue = e.target.value
    setUserMovieData(prev => ({...prev, note: noteValue}))
    setLocalData({id: id, title: title, note: noteValue}, userData)
  }

  return (
      <div id="carouselExampleIndicators" className="carousel slide mt-3 overflow-visible d-flex justify-content-center">
        <div className="carousel-inner px-3" style={{minHeight: "200px", width: "300px"}}>
          <div className="carousel-item active">
            <div className="lh-sm my-2" style={{width: carouselWidth}}>
              {ratingValue && <div className="mb-3">Audience Rating: <StarRating rating={ratingValue}/></div>}
              {<div className="mb-3">My Rating: <StarRating rating={my_rating} user={true}/></div>}
              {mainActors.length > 0 && <div className="mb-2"><strong>Staring:</strong> {mainActors.join(", ")}</div>}
              {directors.length > 0 && <div className="mb-2"><strong>Directed by:</strong> {directors.join(", ")}</div>}
              {writers && <div className="mb-2"><strong>Written by:</strong> {writers.join(", ")}</div>}
              {duration && <div><strong>Runtime:</strong> {Duration.fromISO(duration).toHuman()}</div>}
            </div>
          </div>
          <div className="carousel-item">
            <div style={{width: carouselWidth}}>
              {summary && <div>
                <div className="fw-bold">Summary</div>
                <div>{summary}</div>
              </div>}
            </div>
          </div>
          <div className="carousel-item">
            <div style={{width: carouselWidth}}>
              My Notes
              <textarea
                  style={{width: "100%", height: "150px"}}
                  placeholder="Enter your notes on this movie here"
                  value={note}
                  onChange={notesHandler}
              />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev"
                type="button"
                style={{
                  left: "-35px",
                  filter: "invert(1)",
                  top: '120px',
                  transform: 'translateY(-50%)',
                  bottom: 'auto',
                  height: '50px'
                }}
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next"
                type="button"
                style={{
                  right: "-15px",
                  filter: "invert(1)",
                  top: '120px',
                  transform: 'translateY(-50%)',
                  bottom: 'auto',
                  height: '50px'
                }}
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  )
}