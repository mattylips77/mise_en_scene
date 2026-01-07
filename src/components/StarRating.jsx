import {Star} from "lucide-react";
import {useAppContext} from "../contexts/useAppContext.jsx";
import {setLocalData} from "../utils/utils.js";

export const StarRating = ({rating, user, size}) => {
  const {selectedMovie, userData, userMovieData, setUserMovieData} = useAppContext()
  const clampedRating = Math.max(0, Math.min(10, rating));

  const userRatingHandler = (index) => {
    const {id, title} = selectedMovie
    const rating = index + 1
    const updatedMovieData = {...userMovieData, my_rating: rating}
    setUserMovieData(updatedMovieData)
    setLocalData({id: id, title: title, my_rating: rating}, userData)
  }

  const star_size = () => {
    return size === "sm" ? "15px" : "25px"
  }

  return (
      <div className="d-flex align-items-center">
        {[...Array(10)].map((_, index) => {
          const fillPercentage = Math.max(0, Math.min(1, clampedRating - index)) * 100;

          return (
              <div key={index}
                   onClick={user ? () => userRatingHandler(index) : null}
                   className="position-relative me-2"
                   style={{
                     width: star_size(),
                     height: star_size(),
                     cursor: user ? 'pointer' : 'default'
                   }}>
                {/* Background star (empty/gray) */}
                <Star className="position-absolute top-0 start-0 text-black" style={{width: star_size(), height: star_size()}}/>

                {/* Foreground star (filled/black) with clip-path */}
                <div
                    className="position-absolute top-0 start-0 overflow-hidden"
                    style={{
                      width: star_size(),
                      height: star_size(),
                      clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                    }}
                >
                  <Star className="text-warning position-absolute top-0 start-0" style={{width: star_size(), height: star_size(), fill: "#ffc107"}}/>
                </div>
              </div>
          );
        })}
        {(size !== "sm") && <span className="ms-2 small fw-medium">{clampedRating.toFixed(1)}</span>}
      </div>
  );
};
