import { combineReducers } from 'redux'

function movies(state = {}, action) {
  console.log("movies reducer", state, action);
  switch (action.type) {
    case 'UPDATE_MOVIE_DATA':
      return { ...state, [action.movie]: action.data }
    default:
      return state
  }
}

function displayList(state = [], action) {
  console.log("displayList reducer", state, action);
  switch (action.type) {
    case 'ADD_MOVIE':
      return [ ...state, action.movie ]
    case 'CLEAR_DISPLAY':
      return []
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  movies,
  displayList
});
