import {useState, useEffect} from 'react'
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce"
import { Dropdown } from 'react-bootstrap';

import {useAppContext} from "./contexts/appContext.jsx"
import {getMoviesNewQuery, getMoviesPage, getGenres} from "./fetches.js"

import {Movie} from "./Movie.jsx";
import {Result} from "./result.jsx";


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

  console.log("queryArgs", queryArgs)

  const {data: moviesData, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ['movies', debouncedSearch, genreSearch, pageNumber],
    queryFn: async ({signal}) => {
      return await getMoviesNewQuery(queryArgs)
    },
    retry: 1,
    placeholderData: {data: [], totalPages: ''}
  })

  const {data: genreData} = useQuery({
    queryKey: ['genres'],
    queryFn: async ({signal}) => {
      return await getGenres()
    },
    retry: 1,
    placeholderData: {data: [], totalPages: []}
  })

  useEffect(() => {
     if (!localStorage.getItem('userData')) {
       localStorage.setItem('userData', JSON.stringify([]))
     } else {
       console.log('data', localStorage.getItem("userData"))
     }
  }, [])

  const searchTitleHandler = (e) => {
    setPageNumber(1)
    setTitleSearch(e.target.value)
  }

  console.log("moviesData", moviesData)
  const {data: movieData, totalPages, moviesTotal} = moviesData
  const {data: genres} = genreData


  const pages = [...Array(totalPages).keys()].map(i => i + 1);
  return (
      <>
        <h1>Search For Movies</h1>
        <div data-label="header" className="d-flex">
          <div>
            <input
              type="text"
              value={titleSearch}
              onChange={searchTitleHandler}
            />
          </div>
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
          <div data-label="page_up_down" className="d-flex flex-grow-0">
            <button onClick={() => setPageNumber(prevPageNumber => --prevPageNumber)}
                    disabled={(pageNumber === 1)}
                    className="btn btn-primary btn-sm">-
            </button>
            <div>
              Page: {pageNumber}<br/>
              {moviesTotal}
            </div>
            <button onClick={() => setPageNumber(prevPageNumber => ++prevPageNumber)}
                    disabled={(pageNumber === totalPages)}
                    className="btn btn-primary btn-sm">+
            </button>
          </div>
        </div>
        <div className="d-flex gap-5">
          <div className="column">
            <div>
              {movieData.map((movie) => <Result key={movie.id} movie={movie}/>)}
            </div>
            <div className="d-flex flex-row">
              Goto Page {pages.map((page, index) =>
                <div onClick={() => setPageNumber(page)} className="d-flex px-1" style={{cursor: "pointer"}} key={page}>{page}{index < pages.length - 1 && ','}</div>
              )}
            </div>
          </div>
          <div className="column">
            {selectedMovie &&
            <Movie movie={selectedMovie} />
            }
          </div>
        </div>
      </>
  )
}

export default App
