import './App.css';

import {useAppContext} from "./contexts/appContext.jsx"

import {Movie} from "./components/Movie.jsx";
import {MovieList} from "./components/MovieList.jsx"

function App() {
  const {selectedMovie} = useAppContext()

  return (
      <div data-label="app_container" className="w-75 mt-5" style={{maxWidth: "1000px"}}>
        {(selectedMovie) ? "true" : "false"}
        <div className="d-flex gap-5">
          <MovieList />
          {
            selectedMovie &&
              <div className={`${selectedMovie ? "d-flex" : "d-none"} movie_box_width d-lg-flex w-lg-25 flex-column mt-5 border border-1 border-dark-subtle p-4`}>
                    <Movie movie={selectedMovie}/>
              </div>
          }
        </div>
      </div>
  )
}

export default App
