import {useState, useEffect} from 'react'
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce"
import { Dropdown } from 'react-bootstrap';

import {useAppContext} from "./contexts/appContext.jsx"
import {fetchMovies, getGenres} from "./fetches.js"

import {Movie} from "./Movie.jsx";
import {Result} from "./result.jsx";


function App() {
  const {selectedMovie} = useAppContext()

  const [titleSearch, setTitleSearch] = useState("")
  const [genreSearch, setGenreSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [debouncedSearch] = useDebounce(titleSearch, 300);

  let query = '';
  const query_movies = () => {
    console.log("query movies")
    query = `?${[
      `page=${pageNumber}`,
      titleSearch && `search=${titleSearch}`,
      genreSearch && `genre=${genreSearch}`
    ].filter(Boolean).join("&")}`;
  }

  query_movies()
  const {data: moviesData, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ['movies', debouncedSearch, genreSearch, pageNumber],
    queryFn: async ({signal}) => {
      return await fetchMovies(query)
    },
    retry: 1,
    placeholderData: {data: [], totalPages: []}
  })

  const {data: genreData} = useQuery({
    queryKey: ['genres'],
    queryFn: async ({signal}) => {
      return await getGenres(query)
    },
    retry: 1,
    placeholderData: {data: [], totalPages: []}
  })

  const searchTitleHandler = (e) => {
    setPageNumber(1)
    setTitleSearch(e.target.value)
  }



  console.log("genreData", genreData.data)
  const {data: movieData, totalPages} = moviesData
  console.log("movieData", movieData)
  const {data: genres} = genreData
  console.log("selectedddddMove", selectedMovie)


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
                    className="btn btn-primary btn-sm">-
            </button>
            <div>Page Number: {pageNumber}</div>
            <button onClick={() => setPageNumber(prevPageNumber => ++prevPageNumber)}
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
