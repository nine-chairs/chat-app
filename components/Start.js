import React from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import BackgroundImage from '../img/Background.png';
import { LogBox } from "react-native";



LogBox.ignoreLogs(["EventEmitter.removeListener"]); //ignores automatically these warning logs. This method is depricated but I can't change it.
// background color circles
const colorsCircle = {
  color1: "#351c75",
  color2: "#674ea7",
  color3: "#8e7cc3",
  color4: "#b4a7d6",
  color5: "#d9d2e9",
}

export default class Start extends React.Component {
  // background colors
  bgColors = {
    color1: "#351c75",
    color2: "#674ea7",
    color3: "#8e7cc3",
    color4: "#b4a7d6",
    color5: "#d9d2e9",
  }
  // bubble colors
  bbColors = {
    color1: "#faf0e6",
    color2: "#fff0db",
    color3: "#eed9c4",
    color4: "#e4d5b7",
    color5: "#d9b99b",
  }
  // text colors
  txColors = {
    color1: "#000000",
    color2: "#ffffff",
  }

  constructor(props) {
    super(props);
    this.state = { username: '', bgColor: this.bgColors.color1, textColor: this.txColors.color2, bubbleColor: this.bbColors.color5 };
  }

  changeColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  changeTextColor = (newColor) => {
    this.setState({ textColor: newColor });
  }

  changeBubbleColor = (newColor) => {
    this.setState({ bubbleColor: newColor });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>

          <View style={styles.titleBox}>
            <Text style={styles.title}>chata-pp</Text>
          </View>

          <View style={styles.userChoices}>

            <View style={styles.userBox}>

              <TextInput style={styles.input}
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
                placeholder='are you called?'
              />

            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>which color?</Text>
            </View>

            <View style={styles.colorScheme}>

              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.color1 }, styles.borderRadius]}
                onPress={() => { this.changeColor(this.bgColors.color1), this.changeTextColor(this.txColors.color1), this.changeBubbleColor(this.bbColors.color1) }}
              />

              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.color2 }, styles.borderRadius]}
                onPress={() => { this.changeColor(this.bgColors.color2), this.changeTextColor(this.txColors.color1), this.changeBubbleColor(this.bbColors.color2) }}
              />

              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.color3 }, styles.borderRadius]}
                onPress={() => { this.changeColor(this.bgColors.color3), this.changeTextColor(this.txColors.color2), this.changeBubbleColor(this.bbColors.color3) }}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.color4 }, styles.borderRadius]}
                onPress={() => { this.changeColor(this.bgColors.color4), this.changeTextColor(this.txColors.color2), this.changeBubbleColor(this.bbColors.color4) }}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.color5 }, styles.borderRadius]}
                onPress={() => { this.changeColor(this.bgColors.color5), this.changeTextColor(this.txColors.color2), this.changeBubbleColor(this.bbColors.color5) }}
              />

            </View>

            <Pressable style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, bgColor: this.state.bgColor, textColor: this.state.textColor, bubbleColor: this.state.bubbleColor })}
            >

              <Text style={styles.buttonText}>ready to chat?</Text>

            </Pressable>


          </View>

        </ImageBackground >

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "50%",
    width: "88%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    fontWeight: '600',
    fontSize: 45,
    color: 'white',
  },

  userChoices: {
    borderRadius: 20,
    backgroundColor: "white",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  userBox: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
  },

  colorBox: {
    marginRight: "auto",
    paddingLeft: 15,
    width: "88%",
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
  },

  colorScheme: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  borderRadius: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0,
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "#394048",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  }

});
