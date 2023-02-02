import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducer to manage the events
const eventsReducer = (state = [], action: { type: any; events: any; }) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.events;
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  events: eventsReducer,
});

// Create the store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// Action to set the events
export const setEvents = (events: any[]) => {
  return {
    type: 'SET_EVENTS',
    events,
  };
};

// Action to fetch the events from the GitHub API
export const fetchEvents = () => {
  return async (dispatch) => {
    var config = {
      method: 'get',
      url: 'https://api.github.com/events',
      headers: { 
        'HTTP': '2/200', 
        'X-Poll-Interval': '60', 
        'ETag': '"a18c3bded88eb5dbb5c849a489412bf3"', 
        'Accept': 'application/vnd.github+json', 
        'per_page': '30', 
        'page': '1'
      }
    };
    const response = await axios(config);
    dispatch(setEvents(response.data));
  };
};