import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';




export default function Chat(props) {
  // Retrieving the name and color properties passed from the Start Screen
  let { name } = props.route.params;
  let { bgColor } = props.route.params;


  useEffect(() => {
    // Set the screen title to the user name entered in the start screen
    props.navigation.setOptions({ title: name });
  });


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})