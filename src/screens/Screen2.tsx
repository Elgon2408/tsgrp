import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Screen2 = ({ navigation, route }: any) => {
  const events = useSelector((state: any) => state.events);
  const eventId = route.params.eventId;
  const event = events.find((event: any) => event.id === eventId);
  console.log(event)
  return (
    <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text>{event.type}</Text>
      <Text>{event.actor.url}</Text>
      <Text>{event.repo.url}</Text>
      <Text>{event.commits!=null ? event.payload.commits[0].message:null}</Text>
    </SafeAreaView>
  );
};

export default Screen2;