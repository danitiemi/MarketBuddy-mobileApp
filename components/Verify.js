import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import  LoginScreen  from './Login';
import MainRouterSwitch from './UserLists';


export default class LoginSwitch extends React.Component {

  render() {
    const props = this.props
    if (!props.loggedIn) {
      return (
       <LoginScreen loginHandler={props.loginHandler}/> 
      )
    } else {
      return (
        <MainRouterSwitch />
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row'
    }
});