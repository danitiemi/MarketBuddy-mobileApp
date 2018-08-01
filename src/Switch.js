import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import LoginScreen from 'src/Login';
import MainRouterSwitch from 'src/UserLists';


export default class LoginSwitch extends Component {

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