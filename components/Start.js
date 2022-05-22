import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import BackgroundImage from '../assets/background-image.png';

import { signInAnonymously } from "firebase/auth";
import { auth } from '../config/firebase';

import NetInfo from '@react-native-community/netinfo';

// Create constant that holds background colors for Chat Screen
const colors = {
  color1: "#351c75",
  color2: "#674ea7",
  color3: "#8e7cc3",
  color4: "#b4a7d6",
  color5: "#d9d2e9",
};

export default function Start(props) {
  let [name, setName] = useState();
  let [color, setColor] = useState();

  // State to hold information if user is offline or online
  const [isConnected, setIsConnected] = useState(false);

  // Authenticate the user via Firebase and then redirect to the chat screen, passing the name and color props
  const onHandleStart = () => {
    if (isConnected) {
      signInAnonymously(auth)
        .then(() => {
          console.log('Login success');
          props.navigation.navigate('Chat', { name: name, color: color });
        })
        .catch(err => console.log(`Login err: ${err}`));
    }
    else {
      props.navigation.navigate('Chat', { name: name, color: color });
    }
  }

  useEffect(() => {

    // Check if user is offline or online using NetInfo
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

  })


  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode='cover'
        style={styles.image}
      >

        <Text style={styles.title}>chateandando</Text>

        <View style={styles.box}>

          {/* Input box to set user name passed to chat screen */}
          <TextInput
            onChangeText={(name) => setName(name)}
            value={name}
            style={styles.input}
            placeholder='Are you called?'
          />

          {/* Allow user to choose a background color for the chat screen */}
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[{ backgroundColor: colors.color1 }, styles.colorbutton]}
              onPress={() => setColor(colors.color1)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.color2 }, styles.colorbutton]}
              onPress={() => setColor(colors.color2)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.color3 }, styles.colorbutton]}
              onPress={() => setColor(colors.color3)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.color4 }, styles.colorbutton]}
              onPress={() => setColor(colors.color4)}
            />
            <TouchableOpacity
              style={[{ backgroundColor: colors.color5 }, styles.colorbutton]}
              onPress={() => setColor(colors.color5)}
            />
          </View>

          {/* Authenticate user & Open chatroom, passing user name and background color as props */}
          <Pressable
            onPress={onHandleStart}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? '#585563'
                  : '#757083'
              },
              styles.button
            ]}
          >
            <Text style={styles.buttontext}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  title: {
    fontSize: 50,
    fontWeight: '500',
    color: '#ffffff',
  },

  box: {
    width: '88%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-evenly',

  },

  input: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,

  },

  text: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
  },

  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  button: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#85f2ad",
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttontext: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  }
});