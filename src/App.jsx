import { useState, useEffect } from 'react'
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce"

import {Result} from "./result.jsx";


const apiKey = import.meta.env.VITE_API_TOKEN;
import {api_url} from "./config.js"


function App() {
  const [titleSearch, setTitleSearch] = useState(null)
  const [genreSearch, setGenreSearch] = useState(null)
  const [error, setError] = useState(null)
  const [moviesAll, setMoviesAll] = useState([])


  let query = '';
  const query_movies = () => {
    if (genreSearch || titleSearch) {
        const titleQuery = titleSearch ? `search=${titleSearch}` : ''
        const genreQuery = genreSearch ? `genre=${genreSearch}` : ''
        query = `?${[titleQuery, genreQuery].join("&")}`
    } else {
      return
    }
    fetch(`${api_url}/movies${query}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': "application/json"
      }
    }).then(response => {
      console.log("response")
          if (!response.ok) {
            setError("error")
          }
          return response.json()
        }
    ).then(data => {
      setMoviesAll(data.data)
      console.log(data.data)
    })
  }

  const searchTitleHandler = (e) => {
    setTitleSearch(e.target.value)
    query_movies()
  }


  return (
    <>
    {error && <div style={{color: "red"}}>error</div> }
      <h1>Search For Movies</h1>
      <input
        type="text"
        value={titleSearch}
        onChange={searchTitleHandler}
      />

      {moviesAll.length > 0 && moviesAll.map((movie) => <Result movie={movie} />)}
    </>
  )
}

export default App
