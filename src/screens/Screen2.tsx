import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Screen2 = ({ route, navigation }: any) => {
  const event = route.params.event
  return (
    <View style={{flex:1}}>
      <Text>{event.actor.login}</Text>
      <Text>{event.actor.url}</Text>
    </View>
  );
};

export default Screen2;