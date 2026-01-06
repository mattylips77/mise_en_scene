import {useState, useEffect} from 'react'
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce"
import {Dropdown} from 'react-bootstrap';

import {useAppContext} from "../contexts/appContext.jsx"
import {getMoviesNewQuery, getGenres} from "../utils/fetches.js"

import {Result} from "./Result.jsx";

export const MovieList = () => {
  const {selectedMovie} = useAppContext()

  const [titleSearch, setTitleSearch] = useState("")
  const [genreSearch, setGenreSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [showLoading, setShowLoading] = useState(false)
  const [debouncedSearch] = useDebounce(titleSearch, 300);

  const queryArgs = {
    titleSearch,
    genreSearch,
    pageNumber
  }
  const {data: moviesData, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ['movies', debouncedSearch, genreSearch, pageNumber],
    queryFn: async () => {
      return await getMoviesNewQuery(queryArgs)
    },
    retry: 1,
    placeholderData: (previousData) => previousData || {data: [], totalPages: ''}
  })

  const {data: genreData} = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      return await getGenres()
    },
    retry: 1,
    placeholderData: (previousData) => previousData || {data: [], totalPages: []}
  })

  useEffect(() => {
    if (isLoading || isFetching) {
      const timer = setTimeout(() => {
        setShowLoading(true)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setShowLoading(false)
    }
  }, [isLoading, isFetching])

  const searchTitleHandler = (e) => {
    setPageNumber(1)
    setTitleSearch(e.target.value)
  }

  const {data: movieData, totalPages, moviesTotal} = moviesData
  const {data: genres} = genreData


  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  if (isError) return (<div>There was an error: {error.message}</div>)

  return (
      <div className={`${selectedMovie ? "d-none" : "d-flex"} d-lg-flex flex-column w-100 position-relative`}>
        {showLoading && <div className="w-100 h-100 position-absolute bg-dark bg-opacity-50 text-white fs-1 d-flex align-items-center justify-content-center">Loading...</div>}
        <div data-label="header" className="d-flex flex-row justify-content-between mb-2 align-items-center">
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
                {genreSearch || "Select Genre"}
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
        <div className="border border-1 border-dark-subtle" style={{minHeight: "605px"}}>
          {movieData.map((movie, index) => <Result key={movie.id} index={index} movie={movie}/>)}
        </div>

        <div data-label="pagination" className="d-flex flex-row justify-content-between flex-shrink-1">
          <div data-label="goto_pages">
            Page {pages.map((page, index) =>
              <div
                  key={page}
                  onClick={() => setPageNumber(page)}
                  className={`d-inline-block px-1 ${pageNumber === index + 1 && "text-primary"}`}
                  style={{cursor: "pointer"}}
              >{page}{index < pages.length - 1 && ','}</div>
          )}
          </div>
          <div data-label="page_up_down" className="d-flex flex-grow-0 gap-1 text-nowrap align-items-start">
            <button onClick={() => setPageNumber(prevPageNumber => --prevPageNumber)}
                    disabled={(pageNumber === 1)}
                    className="btn btn-link btn-sm text-decoration-none p-0 fw-bold">-
            </button>
            <div>
              Page: {pageNumber}<br/>
            </div>
            <button onClick={() => setPageNumber(prevPageNumber => ++prevPageNumber)}
                    disabled={(pageNumber >= totalPages)}
                    className="btn btn-link btn-sm text-decoration-none p-0 fw-bold">+
            </button>
          </div>
        </div>
      </div>
  )
}