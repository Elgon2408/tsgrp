# tsgrp
**Mobile app in React-Native CLI (iOS, Android)**

Used: react-navigation, redux.  
API: https://api.github.com/events
```
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
```
In screen 1 I have list after fetch api (25 elements) and update after every 60 sec., 
```
    useEffect(() => {
        dispatch(fetchEvents());
        const interval = setInterval(() => {
            if (!isEventsUpdatePaused) {
                dispatch(fetchEvents());
                setLastUpdate(new Date().getTime());
            }
        }, 60000);
        return () => clearInterval(interval);
    }, [dispatch, isEventsUpdatePaused]);
```
when touch in element list go to 2 screen with params.
```
   const onEventPress = (event: any) => {
        navigation.navigate('Screen2', { event });
        dispatch(pauseEventsUpdate());
    };
```
When scroll list update paused.
``` dispatch(pauseEventsUpdate()) ```
User can update list if last update before 15 sec 
```
    const onRefresh = () => {
        if (lastUpdate && currentTime - lastUpdate < 15000) {
            return;
        }
        dispatch(fetchEvents());
        setLastUpdate(currentTime);
    };
```
When go to 2 screen, list update paused and set time interval
If return to screen 1, the list is updated immediately
Time and list of manual updates will start again
