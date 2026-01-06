import {useEffect} from "react";
import {StarRating} from "./StarRating.jsx";
import {Duration} from "luxon";
import {useAppContext} from "./contexts/appContext.jsx";

export const MovieDataCarousel = () => {
  const carouselWidth = 250
  const {selectedMovie, setSelectedMovie, userData, userMovieData, setUserMovieData} = useAppContext()

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

  useEffect(() => {
    setUserMovieData(userData.find((movie) => movie.id === selectedMovie.id))
  }, [selectedMovie])

  const notesHandler = (e) => {
    const noteValue = e.target.value
    setUserMovieData(prev => ({...prev, note: noteValue}))
    setLocalData({id: id, title: title, note: noteValue})
  }

  const setLocalData = (userMovieData) => {

    const index = userData.findIndex(i => i.id === userMovieData.id);
    (index !== -1) ? userData[index] = {...userData[index], ...userMovieData} : userData.push(userMovieData);

    localStorage.setItem("userData", JSON.stringify(userData))
  }

  return (
      <div id="carouselExampleIndicators" className="carousel slide mt-3 overflow-visible d-flex justify-content-center" data-bs-theme="dark">
        <div className="carousel-inner px-3" style={{minHeight: "200px", width: "300px"}}>
          <div className="carousel-item active">
            <div style={{width: carouselWidth}}>
              {ratingValue && <div>Audience Rating: <StarRating rating={ratingValue}/></div>}
              {/*{myRatingValue && <div>My Rating: {myRating}</div>}*/}
              {mainActors.length > 0 && <div>Staring: {mainActors.join(", ")}</div>}
              {directors.length > 0 && <div>Directed by {directors.join(", ")}</div>}
              {writers && <div>Written by: {writers.join(", ")}</div>}
              {duration && <div>Runtime: {Duration.fromISO(duration).toHuman()}</div>}
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
                  style={{width: '100%', height: "150px"}}
                  placeholder="Enter your notes on this movie here"
                  value={userMovieData?.note || ""}
                  onChange={notesHandler}
              />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" style={{left: "-35px"}} data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button"  style={{right: "-5px"}} data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  )
}