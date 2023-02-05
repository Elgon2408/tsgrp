# tsgrp
Mobile app in React-Native CLI (iOS, Android)
Used: react-navigation, redux
API: https://api.github.com/events
In screen 1 I have list after fetch api (25 elements) and update after every 60 sec., when touch in element list go to 2 screen with params.
When scroll list update paused.
User can update list if last update before 15 sec 
When go to 2 screen, list update paused and set time interval
If return to screen 1, the list is updated immediately
Time and list of manual updates will start again
