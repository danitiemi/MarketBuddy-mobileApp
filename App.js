import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import { LinearGradient, AppLoading, Asset, Font } from 'expo';
import { Button, Icon, Card, ListItem } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15


// ============== 2. LOGIN SWITCH =============== //
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


// ================== 2A. LOGIN SCREEN - FORM ===================== //
const Form = t.form.Form;

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
        <View style={styles.logoContainer}>
          <Icon name='shopping-cart' type='feather' color='#fff'/>  
          <Text style={styles.titleText}>Market Buddy</Text>
          </View>
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
                backgroundColor= '#4f6dc1'
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

// ============ 2A USER LISTS =============== //
const userLists = [
 {
    name: 'Weekly Groceries',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Movie Snacks',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
  {
    name: 'Cheat Day',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Detox',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  }
 
]

// ==== !!!!!!!! STYLE THE CARDS !!!!! ==== //
const ButtonContainer = (props) => {
  const { setScreen } = props
  return (
    <View>
      <View style={styles.listCards}>
        { userLists.map((u, i) => {
          return (
            <View key={i} style={styles.user}>

            <Card
              title={u.name}>
              {/* image={require('./assets/basket.png')}> */}
              {/* <Text style={{marginBottom: 10}}>

              </Text> */}
              <Button
                onPress={() => setScreen(u)}
                icon={{name: 'code'}}
                backgroundColor='#4f6dc1'
                // fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='SHOP!' />
            </Card>
            </View>
          )
        })
      }
      </View>

      
       {/* <Card title="Pick your List">
        {
          userLists.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text style={styles.name}>{u.name}</Text>
              </View>
            );
          })
        } 
       </Card>
       </View> */}
     {/* </View> */}
    
    
    {/* <View style={styles.buttonContainer}> */}
      
      {/* <Button
        onPress={() => setScreen("A")}
        title="Essentials"
        color="#841584"
      />
      <Button
        onPress={() => setScreen("B")}
        title="Movie Snacks"
        color="#841584"
      />
      <Button
        onPress={() => setScreen("C")}
        title="Cheat Day"
        color="#841584"
      /> */}

    </View>
  )
}

// ============= 2 || 3. SHOPPING LIST ============== //
const SmartScreen = (props) => {
  if (props.screen == userLists[0]) {
    return (
      <Text>YOU ARE AT SCREEN A</Text>
    )  
  } else if (props.screen == userLists[1]) {
    return (
      <Text>HEYO IT'S SCREEN B</Text>
    )  
  } else if (props.screen == userLists[2]) {
    return (
      <Text>WHAT UP IT'S SCREEN C</Text>
    )  
  } else {
    return (
      <Text>YOU DIDN'T PICK ANY SCREEN????</Text>
    )
  }
}


// const SmartScreen = (props) => {
//   if (props.screen == "A") {
//     return (
//       <Text>YOU ARE AT SCREEN A</Text>
//     )  
//   } else if (props.screen == "B") {
//     return (
//       <Text>HEYO IT'S SCREEN B</Text>
//     )  
//   } else if (props.screen == "C") {
//     return (
//       <Text>WHAT UP IT'S SCREEN C</Text>
//     )  
//   } else {
//     return (
//       <Text>YOU DIDN'T PICK ANY SCREEN????</Text>
//     )
//   }
// }



// =============== 2. MAIN ROUTER HOLDER ================ //
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


// ============ 1. APP ============ //
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

// =========== STYLES ============= //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a37b3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10
  },
  container2: {
    // flex: 1,
    justifyContent: 'center',
      // marginTop: 20,
    width: 240,
    // padding: 40,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row'
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
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    margin: 15
  },
  listContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCards:{
    backgroundColor: '#2a37b3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    // width: 100,
    // height: 100
  }
});