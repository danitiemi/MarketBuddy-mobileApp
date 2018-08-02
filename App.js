import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import { LinearGradient, AppLoading, Asset, Font } from 'expo';
import { Button, Icon } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15

class LoginSwitch extends React.Component {

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

// FORM
const Form = t.form.Form;

// Form model
const User = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  auto: 'placeholders'
};

class LoginScreen extends React.Component {
  handleSubmit() {
    console.log(this.loginform);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image  */}
        <View style={styles.container1}>
          <View style={styles.container2}>
        {/* <LinearGradient
            colors = {['#120038', '#2a37b3', '#727d9c']}
            style = {{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 900,
        }}> */}
          <Form 
            ref={c => this.loginform = c} 
            type={User} 
            options={options} />
          <Button
            onPress={this.props.loginHandler}
            title="LOGIN"
            // rightIcon={{name: 'telegram-plane'}}
            style={styles.buttonLogin}
            backgroundColor= '#195bdd'
          />
          {/* <TouchableHighlight
            onPress={this.props.loginHandler}
          >
            <Text>LOGIN</Text> */}
          {/* </TouchableHighlight> */}
        {/* </LinearGradient> */}
          </View>
        </View>
      </View>
    )
  }
}

const ButtonContainer = (props) => {
  const { setScreen } = props
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={() => setScreen("A")}
        title="A"
        color="#841584"
      />
      <Button
        onPress={() => setScreen("B")}
        title="B"
        color="#841584"
      />
      <Button
        onPress={() => setScreen("C")}
        title="C"
        color="#841584"
      />
    </View>
  )
}

const SmartScreen = (props) => {
  if (props.screen == "A") {
    return (
      <Text>YOU ARE AT SCREEN A</Text>
    )  
  } else if (props.screen == "B") {
    return (
      <Text>HEYO IT'S SCREEN B</Text>
    )  
  } else if (props.screen == "C") {
    return (
      <Text>WHAT UP IT'S SCREEN C</Text>
    )  
  } else {
    return (
      <Text>YOU DIDN'T PICK ANY SCREEN????</Text>
    )
  }
}
class MainRouterSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: ''
    }
    this.setScreen = this.setScreen.bind(this)
  }
  setScreen(screen) {
    this.setState({
      currentScreen: screen
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ButtonContainer setScreen={this.setScreen}/>
        <SmartScreen screen={this.state.currentScreen} />
      </View>
    )
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.setLogin = this.setLogin.bind(this)
  }
  setLogin() {
    this.setState({
      loggedIn: true
    })
  }
  render() {
    const state = this.state
    return (
      <View style={styles.container}>
        <LoginSwitch loggedIn={state.loggedIn} loginHandler={this.setLogin}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0069ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container1: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    width: 300,
    borderRadius: 10
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
      // marginTop: 50,
    width: 240,
    // padding: 40,
    backgroundColor: '#fff',
  },
  buttonLogin: {
    borderWidth: 1,
    borderRadius: 4,
    // marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});