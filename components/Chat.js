import React from 'react';
import { View, Text } from 'react-native';




export default function Chat(props) {
  // Retrieving the name and color properties passed from the Start Screen
  let { name } = props.route.params;
  let { bgColor } = props.route.params;


  props.navigation.setOptions({ title: name });



  return (
    <View
      style={{
        backgroundColor: bgColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text>Hey World!</Text>
    </View>
  )
}

