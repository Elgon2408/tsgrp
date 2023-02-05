import axios from 'axios';

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const PAUSE_EVENTS_UPDATE = 'PAUSE_EVENTS_UPDATE';
export const RESUME_EVENTS_UPDATE = 'RESUME_EVENTS_UPDATE';

export const fetchEventsSuccess = (events: any) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: events
});

export const pauseEventsUpdate = () => ({
    type: PAUSE_EVENTS_UPDATE
});

export const resumeEventsUpdate = () => ({
    type: RESUME_EVENTS_UPDATE
});

export const fetchEvents = () => {
    return async dispatch => {
        try {
            var config = {
                method: 'get',
                url: 'https://api.github.com/events',
                headers: {
                    'HTTP': '2/200',
                    'X-Poll-Interval': '60',
                    'ETag': '"a18c3bded88eb5dbb5c849a489412bf3"',
                    'Accept': 'application/vnd.github+json',
                    'per_page': '25',
                    'page': '1'
                }
            };
            const response = await axios(config);
            dispatch(fetchEventsSuccess(response.data));
        } catch (error) {
            console.error(error);
        }
    };
};