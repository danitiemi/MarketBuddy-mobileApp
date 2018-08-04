import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SectionList} from 'react-native';
import { LinearGradient, AppLoading, Asset, Font } from 'expo';
import { Button, Icon, Card, ListItem } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15
import NavBar from './components/Header';


// ============== 2. LOGIN SWITCH =============== //
// 
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
      <LinearGradient
        colors = {['#727d9c', '#2a37b3', '#120038']}
        style = {{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 850
      }}>
      <View style={styles.container}>
      
        <View style={styles.logoContainer}>
          <Icon name='shopping-cart' type='feather' color='#fff'/>  
          <Text style={styles.titleText}>Market Buddy</Text>
          </View>
            <View style={styles.container1}>
              <View style={styles.container2}>
        
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
          </View>
        </View>
      </View>
    </LinearGradient>
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
    <View style={styles.mainContainer}>
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
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
     {/* <Text>YOU ARE AT SCREEN A</Text>  */}
     </View>
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
      <View style={styles.mainContainer}>
        < NavBar />
          {/* <View style={styles.container1> */}
            <ButtonContainer setScreen={this.setScreen} />
            <SmartScreen screen={this.state.currentScreen} />
          {/* </View> */}
      </View>
    )
  }
}

//  =============== INDIVIDUAL LIST ================== //
// ========== render list ============ //
class ListRender extends React.Component {

  render() {
    const props = this.props
    if (props.loggedIn) {
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
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f4bba',
    top: 0,
    left: 0,
    right: 0,
    height: 900,
    position: 'absolute'
  },
  container: {
    flex: 1,
    // backgroundColor: '#3f4bba',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
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
    flexDirection: 'row',
    marginBottom: 23
  },
  buttonLogin: {
    borderWidth: 1,
    borderRadius: 4,
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
    // backgroundColor: '#2a37b3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    // width: 100,
    // height: 100
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

