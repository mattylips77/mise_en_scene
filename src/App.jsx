import './App.css';

import {useAppContext} from "./contexts/useAppContext.jsx"

import {Movie} from "./components/Movie.jsx";
import {MovieList} from "./components/MovieList.jsx"

function App() {
  const {selectedMovie} = useAppContext()

  return (
      <div data-label="app_container" className="w-75 mt-5" style={{maxWidth: "1000px"}}>
        <div className="d-flex gap-5">
          <MovieList />
          {
            selectedMovie &&
              <div
                  className={`${selectedMovie ? "d-flex" : "d-none"} movie_box_width d-lg-flex w-lg-25 flex-column border border-1 border-dark-subtle p-4`}
                  style={{marginTop: "44px"}}
              >
                    <Movie movie={selectedMovie}/>
              </div>
          }
        </div>
      </div>
  )
}

export default App
