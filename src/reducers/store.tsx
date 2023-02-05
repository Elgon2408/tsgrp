import { createStore, combineReducers, applyMiddleware } from 'redux';
import { eventsReducer } from './reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  events: eventsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
