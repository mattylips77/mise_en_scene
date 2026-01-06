const apiKey = import.meta.env.VITE_API_TOKEN;
import {api_url} from "./config.js"



const fetch_headers = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': "application/json"
}

const query_movies = () => {
  console.log('query movies')

}

export const getMoviesNewQuery = async (queryArgs) => {
  console.log("getMoviesNewQuery")

  const {titleSearch, genreSearch, pageNumber} = queryArgs
  console.log("moivesQuery")
  const query = `?${[
    `page=${pageNumber}`,  
    titleSearch && `search=${titleSearch}`,
    genreSearch && `genre=${genreSearch}`
  ].filter(Boolean).join("&")}`;

  console.log("MoviesQuery", query)

  const response = await fetch(`${api_url}/movies${query}`, {
    method: 'GET',
    headers: fetch_headers
  })
  const data = await response.json()
  console.log("data before add", data)

  const {totalPages} = data

  let moviesTotal = 0

  if (totalPages > 1) {
    const last_page_query = `?${[
      `page=${totalPages}`,
      titleSearch && `search=${titleSearch}`,
      genreSearch && `genre=${genreSearch}`
    ].filter(Boolean).join("&")}`;

    const last_page_response =  await fetch(`${api_url}/movies${last_page_query}`, {
      method: 'GET',
      headers: fetch_headers
    })

    const last_page_data = await last_page_response.json()
    const last_page_count = last_page_data.data.length
    moviesTotal = 25 * totalPages + last_page_count // @todo allow updating limit
  } else {
    moviesTotal = last_page_count
  }
  const newData = {...data, moviesTotal: moviesTotal}
  console.log("data after add", newData)
  return newData
}

export const getMoviesPage = async (query) => {
  console.log("getMoviesPage")
  const response = await fetch(`${api_url}/movies${query}`, {
    method: 'GET',
    headers: fetch_headers
  })
  const data = await response.json()
  // console.log("data", data)
  return data
}


export const getMovieData = async (id) => {
  console.log("getMovieData")
  const response = await fetch(`${api_url}/movies/${id}`, {
    method: 'GET',
    headers: fetch_headers
  })
  const data = await response.json()
  return data
}

export const getGenres = async () => {
  console.log("getGenres")
  console.log("Fetching from:", api_url)
  const response = await fetch(`${api_url}/genres/movies`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': "application/json"
    }
  })
  const data = await response.json();
  console.log("genreData", data)
  return data;
}