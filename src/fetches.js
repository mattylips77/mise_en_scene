const apiKey = import.meta.env.VITE_API_TOKEN;
import {api_url} from "./config.js"

export const fetchMovies = async (query) => {
  console.log("fetchMovies")
  const response = await fetch(`${api_url}/movies${query}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': "application/json"
    }
  })
  const data = await response.json()
  // console.log("data", data)
  return data
}

export const getMovieData = async (id) => {
  console.log("getMovieData")
  const response = await fetch(`${api_url}/movies/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': "application/json"
    }
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