import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, MessageText, Time, InputToolbar } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import "firebase/firestore";
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        username: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    //configuration for firebase

    const firebaseConfig = {
      apiKey: "AIzaSyArCA7cNE742jNkZAugzbZVvG4YEvfvTNI",
      authDomain: "chat-app-f3713.firebaseapp.com",
      projectId: "chat-app-f3713",
      storageBucket: "chat-app-f3713.appspot.com",
      messagingSenderId: "1062700050774",
      appId: "1:1062700050774:web:87ad7e39a8fd44f6740ef7"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    };

    // references the collection to query its documents
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessagesUser = null;

  };

  //takes a snapshot of the conversation

  onCollectionUpdate = QuerySnapshot => {
    const messages = [];
    // go through each document
    QuerySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages();
  };

  //get messages from the AsyncStorage

  async getMessages() {

    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }

  };

  //save messages into AsnycStorage

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  //to delete the messages (developer purposes)

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {

    const username = this.props.route.params.username;

    //tells the app what to do when online and ofline

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          //update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              username: username,
              avatar: "https://placeimg.com/140/140/any"
            },
          });
          // create a reference to the active user's documents (messages)
          this.referenceMessagesUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);

          // listens for updates in the collection

          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);

          this.saveMessages();
        });

      } else {
        this.setState({ isConnected: false });
        console.log('offline');
        this.getMessages();
      }

    })

  };

  componentWillUnmount() {
    if (this.state.isConnected) {
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe();
    }
  };

  //add a message

  addMessage() {

    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  //bubble costumization

  renderBubble(props) {
    const textColor = this.props.route.params.textColor;
    const bubbleColor = this.props.route.params.bubbleColor;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bubbleColor,
          }
        }}
        renderMessageText={(props) => {
          return (
            <MessageText
              {...props}
              textStyle={{
                right: { color: textColor },
              }}
            />
          );
        }}
        renderTime={(props) => {
          return (
            <Time
              {...props}
              timeTextStyle={{
                right: {
                  color: textColor,
                },
              }}
            />
          );
        }}
      />
    )
  }

  //remove of InputToolbar when offline

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;

  }

  //render a map with current location, if the user shared their location on a message

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  //What happens when user sends a message

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  render() {
    let { username, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: username });

    return (

      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            username: this.state.username,
            avatar: this.state.user.avatar
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 