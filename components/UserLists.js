import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';


export default class MainRouterSwitch extends React.Component {
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