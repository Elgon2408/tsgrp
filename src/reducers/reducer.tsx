import { FETCH_EVENTS_SUCCESS, PAUSE_EVENTS_UPDATE, RESUME_EVENTS_UPDATE } from './actions';

const initialState = {
  events: [],
  isEventsUpdatePaused: false
};

export const eventsReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload
      };
    case PAUSE_EVENTS_UPDATE:
      return {
        ...state,
        isEventsUpdatePaused: true
      };
    case RESUME_EVENTS_UPDATE:
      return {
        ...state,
        isEventsUpdatePaused: false
      };
    default:
      return state;
  }
};