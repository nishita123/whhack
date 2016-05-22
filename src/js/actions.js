import sanitize from './sanitizer'
import fetch from './fetcher'
import { trackEvent } from './analytics'

export function addFile(file) {
  return (dispatch, getState) => {
    let sanitized = sanitize(file)
    trackEvent({
      eventCategory: 'selection',
      eventAction: 'sanitize',
      eventLabel: file.name
    })
    if (sanitized.length == 0 || getState().displayList[sanitized]) {
      return
    }

    dispatch(addMovie(sanitized))
    if (getState().movies[sanitized]) {
      return
    }

    // not in store, we need to fetch this
    fetch(sanitized, (data) => dispatch(updateMovieData(sanitized, data)))
  }
}

function addMovie(movie) {
  return {
    type: 'ADD_MOVIE',
    movie: movie
  }
}

export function clearDisplay() {
  return {
    type: 'CLEAR_DISPLAY'
  }
}

function updateMovieData(movie, data) {
  return {
    type: 'UPDATE_MOVIE_DATA',
    data: data,
    movie: movie
  }
}
