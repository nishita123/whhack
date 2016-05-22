import URI from 'urijs'
import fetch from 'isomorphic-fetch'
import { trackException } from './analytics'

const omdbApi = 'http://www.omdbapi.com'
const tmdbApi = 'https://api.themoviedb.org/3/find/'
const tmdbApiKey = 'dcc243d37ffa2467531d758c65d9aff9'
// TODO This should be fetched from tmdb's config
const tmdbPosterPath = 'http://image.tmdb.org/t/p/w300'

export default function fetchMovieData(movie, onFetch) {
  let omdbUri = URI(omdbApi)
    .query({'t': movie})
    .toString()
  fetch(omdbUri)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw "omdb_error"
      }
    })
    .then(omdbjson => {
      if (omdbjson.Response != 'True') {
        throw "omdb_not_found"
      }
      // We need to call tmdb for the poster, because omdb's poster doesn't
      // work properly.
      let tmdbUri = URI(tmdbApi + omdbjson.imdbID)
        .query({external_source: 'imdb_id', api_key: tmdbApiKey})
        .toString()
      return fetch(tmdbUri)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw "tmdb_error"
          }
        })
        .then(tmdbJson => {
          if (tmdbJson.movie_results.length > 0) {
            let posterPath = tmdbJson.movie_results[0].poster_path
            let posterUri = tmdbPosterPath + posterPath
            omdbjson.Poster = posterUri
          }
          return omdbjson
        })
        .then(finalJson => {
          onFetch(finalJson)
        })
    })
    .catch(err => {
      console.log('Error in fetcher: ' + err)
      trackException({exDescription: 'fetcher: ' + err, exFata: false})
    })
}
