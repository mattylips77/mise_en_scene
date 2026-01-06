import {useState, useEffect} from 'react'
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce"
import {Dropdown} from 'react-bootstrap';

import {useAppContext} from "./contexts/appContext.jsx"
import {getMoviesNewQuery, getMoviesPage, getGenres} from "./fetches.js"

import {Movie} from "./Movie.jsx";
import {Result} from "./Result.jsx";


function App() {
  const {selectedMovie} = useAppContext()

  const [titleSearch, setTitleSearch] = useState("")
  const [genreSearch, setGenreSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [debouncedSearch] = useDebounce(titleSearch, 300);
  const [resetItemCount, setResetItemCount] = useState(false)

  const queryArgs = {
    titleSearch,
    genreSearch,
    pageNumber
  }
  const {data: moviesData, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ['movies', debouncedSearch, genreSearch, pageNumber],
    queryFn: async ({signal}) => {
      return await getMoviesNewQuery(queryArgs)
    },
    retry: 1,
    placeholderData: (previousData) => previousData || {data: [], totalPages: ''}
  })

  const {data: genreData} = useQuery({
    queryKey: ['genres'],
    queryFn: async ({signal}) => {
      return await getGenres()
    },
    retry: 1,
    placeholderData: (previousData) => previousData || {data: [], totalPages: []}
  })

  const searchTitleHandler = (e) => {
    setPageNumber(1)
    setTitleSearch(e.target.value)
  }

  console.log("moviesData", moviesData)

  const {data: movieData, totalPages, moviesTotal} = moviesData
  const {data: genres} = genreData


  const pages = [...Array(totalPages).keys()].map(i => i + 1);
  return (
      <div data-label="app_container" className="w-75 mt-5">
        <div className="d-flex gap-5">
          <div className="d-flex flex-column w-100">
            <div data-label="header" className="d-flex flex-row justify-content-between mb-2">
              <div className="d-flex flex-row justify-content-start gap-3 w-75">
                <input
                    data-label="title_search"
                    type="text"
                    className="w-100"
                    value={titleSearch}
                    onChange={searchTitleHandler}
                    placeholder="Search by Title"
                />
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="genre-dropdown">
                    {genreSearch || 'Select Genre'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setGenreSearch('')}>
                      All Genres
                    </Dropdown.Item>
                    {genres.map((genre) => (
                        <Dropdown.Item
                            key={genre.id}
                            onClick={() => setGenreSearch(genre.title)}
                            active={genreSearch === genre.title}
                        >
                          {genre.title}
                        </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>{moviesTotal} Results</div>
            </div>
            <div className="border border-1 border-dark-subtle" style={{height: "605px"}}>
              {movieData.map((movie, index) => <Result key={movie.id} index={index} movie={movie}/>)}
            </div>

            <div data-label="pagination" className="d-flex flex-row justify-content-between flex-shrink-1">
              <div data-label="goto_pages" className="d-flex flex-row">
                Page {pages.map((page, index) =>
                  <div
                      key={page}
                      onClick={() => setPageNumber(page)}
                      className={`d-flex px-1 ${pageNumber === index + 1 && "text-primary"}`}
                      style={{cursor: "pointer"}}
                  >{page}{index < pages.length - 1 && ','}</div>
              )}
              </div>
              <div data-label="page_up_down" className="d-flex flex-grow-0 gap-1">
                <button onClick={() => setPageNumber(prevPageNumber => --prevPageNumber)}
                        disabled={(pageNumber === 1)}
                        className="btn btn-link btn-sm text-decoration-none p-0">-
                </button>
                <div>
                  Page: {pageNumber}<br/>
                </div>
                <button onClick={() => setPageNumber(prevPageNumber => ++prevPageNumber)}
                        disabled={(pageNumber >= totalPages)}
                        className="btn btn-link btn-sm text-decoration-none p-0">+
                </button>
              </div>
            </div>
          </div>
          {
            (selectedMovie &&  Object.keys(selectedMovie).length > 0) &&
              <div className="d-flex flex-column mt-5 border border-1 border-dark-subtle p-4" style={{width: "425px"}}>
                    <Movie movie={selectedMovie}/>
              </div>
          }
        </div>
      </div>
  )
}

export default App
