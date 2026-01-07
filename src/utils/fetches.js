const apiKey = import.meta.env.VITE_API_TOKEN;
import {api_url} from "../config.js"


const fetchHeaders = {
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': "application/json"
}

export const getMoviesNewQuery = async (queryArgs) => {
  console.log("getMoviesNewQuery")

  const {titleSearch, genreSearch, limit, pageNumber} = queryArgs
  const query = `?${[
    `page=${pageNumber}`,
    titleSearch && `search=${titleSearch}`,
    genreSearch && `genre=${genreSearch}`,
    limit && `limit=${limit}`
  ].filter(Boolean).join("&")}`;

  const response = await fetch(`${api_url}/movies${query}`, {
    method: 'GET',
    headers: fetchHeaders
  })
  const data = await response.json()

  const {totalPages} = data

  let moviesTotal = 0
  console.log('total pages', totalPages)


  if (totalPages > 1) {
    const last_page_query = `?${[
      `page=${totalPages}`,
      titleSearch && `search=${titleSearch}`,
      genreSearch && `genre=${genreSearch}`,
      limit && `limit=${limit}`
    ].filter(Boolean).join("&")}`;

    console.log('last_page_query', last_page_query)

    const last_page_response = await fetch(`${api_url}/movies${last_page_query}`, {
      method: 'GET',
      headers: fetchHeaders
    })

    const last_page_data = await last_page_response.json()
    console.log("last_page_data", last_page_data)
    console.log(`${limit} x ${totalPages - 1} + ${last_page_data.data.length}`)
    moviesTotal = limit * (totalPages - 1) + last_page_data.data.length
  } else {
    moviesTotal = data.data.length
  }

  const newData = {...data, moviesTotal: moviesTotal}
  return newData
}

export const getMoviesPage = async (queryArgs) => {
  const {titleSearch, genreSearch, limit, pageNumber} = queryArgs
  const query = `?${[
    `page=${pageNumber}`,
    titleSearch && `search=${titleSearch}`,
    genreSearch && `genre=${genreSearch}`,
    limit && `limit=${limit}`
  ].filter(Boolean).join("&")}`;

  console.log("getMoviesPage")
  const response = await fetch(`${api_url}/movies${query}`, {
    method: 'GET',
    headers: fetchHeaders
  })
  const data = await response.json()
  return data
}


export const getMovieData = async (id) => {
  console.log("getMovieData")
  const response = await fetch(`${api_url}/movies/${id}`, {
    method: 'GET',
    headers: fetchHeaders
  })
  const data = await response.json()
  return data
}

export const getGenres = async () => {
  console.log("getGenres")
  const response = await fetch(`${api_url}/genres/movies`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': "application/json"
    }
  })
  const data = await response.json();
  return data;
}