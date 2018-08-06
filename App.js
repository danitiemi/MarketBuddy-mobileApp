import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SectionList, ScrollView, AsyncStorage, FlatList} from 'react-native';
import { LinearGradient, AppLoading, Asset, Font } from 'expo';
import { Button, Icon, Card, ListItem, Header, List } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15
import {post} from 'axios';


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

// async function login(loginRequest) {
//   try {
//     console.log("in async");
//     let response = await fetch(
//       'http://192.168.88.120:7000/users/login',
//     );
//     let responseJson = await response.json();
//     console.log("in fucntion: ", responseJson);
//     return responseJson.user;
//   } catch (error) {
//     console.error(error);
//   }
// }



class LoginScreen extends React.Component {

  submitHandle(){

    const value = this.loginform.getValue();
    // console.log(value.email);
    var loginRequest = {
        email: value.email,
        password: value.password
      };
    // console.log("check loginRequest: ", loginRequest);
    loginRequest = JSON.stringify(loginRequest);
    // const loggedUser = login(loginRequest);
    // console.log("check function: ", loggedUser);
    // localStorage.setItem('user', JSON.stringify(loggedUser)); 
    post('http://192.168.88.120:7000/users/login', {user: loginRequest})
      // .then(response => response.data)

      .then((response) => {
        //console.log(response.data)
        let userObject = JSON.stringify(response.data.user);
        AsyncStorage.setItem('user', userObject);
        //console.log(AsyncStorage)
        let newUser = AsyncStorage.getItem('user');
        let userResolved = Promise.resolve(newUser);
        userResolved.then((content) => {
          console.log(content)
        })
        .catch(err=>{
          console.log(err)
        })
        //console.log("newUser: ", newUser);
        //console.log(userObject);
        // let userPromise = AsyncStorage.setItem('user', userObject);
        //console.log(userPromise)
        //let userResolved = Promise.resolve(userPromise);
        // userResolved.then((content) => {
        //   let newUser = AsyncStorage.getItem('user');
        //   console.log("newUser: ", newUser);
        // })
        // .catch(err=>{
        //   console.log(err)
        // })
      })

      // .then(user => {
      //   console.log("returned user: ", user);
      //   console.log("email: ", user.user.email);

      //   let userObject = JSON.stringify(user.user);

      //   let userPromise = AsyncStorage.setItem('user', userObject);

      //   let userResolved = Promise.resolve(userPromise);

      //   userResolved.then((result) => {
      //     console.log("promise result: ", result);
      //     const newUser = AsyncStorage.getItem('user');
      //     console.log("newUser: ", newUser);
      //   }).catch(err => {
      //     console.log(err);
      //   })

    // })
    .catch(err=>{
      console.log("ERR", err)
    });



  // //   fetch('https://192.168.88.120:7000/users/login', {
  //     method: 'POST',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json, charset=utf-8',
  //     }),
  //     cache: "no-cache",
  //     body: JSON.stringify(loginRequest)
  //   })
  //   .then((response) => {
  //     console.log('RESPONSE', response);
  //     return response.json()
  //   })
  //   .then((user) => {
      
  //     console.log('user', user)
  //     _storeData = async () => {
  //       try {
  //         await AsyncStorage.setItem('user', user);
  //       } catch (error) {
  //         console.log("I am an error");
  //       }
  //     }
  //   })
  //   .catch(err=>{
  //     console.log("ERR", err)
  //   })

  //   _retrieveData = async () => {
  //     try {
  //       const newValue = await AsyncStorage.getItem('user');
  //       console.log("check local: ", newValue);
  //     } catch (error) {

  //     }
  //   }
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
                onPress={this.submitHandle.bind(this)}
                // onPress={this.props.loginHandler}
                title="LOGIN"
                style={styles.buttonLogin}
                backgroundColor= '#4f6dc1'
              />
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
  },
  {
    name: 'Cheat Day',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 }
 
]

// ==== !!!!!!!! STYLE THE CARDS !!!!! ==== //
const ButtonContainer = (props) => {
  const { setScreen } = props
  return (
    <View style={styles.mainContainer}>
     <View style={styles.header}>
      <Header
        leftComponent = {<Icon name='shopping-cart' type='feather' color='#fff'/>}
        centerComponent={{ text: 'Market Buddy', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ icon: 'menu', color: '#fff' }}
      />
      </View>
      <View style={styles.listCards}>
        { userLists.map((u, i) => {
          return (
            <View key={i} style={styles.card}>

            <Card
              title={u.name}
              image={require('./assets/checklist.png')}
              backgroundColor='#4f6dc1'>

              <Button
                onPress={() => setScreen(u)}
                icon={{name: 'code'}}
                backgroundColor='#4f6dc1'
                buttonStyle={{borderRadius: 4, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Pick me' />
            </Card>
            </View>
          )
        })
      }
      </View>

    </View>
  )
}

// ============= 2 || 3. SHOPPING LIST ============== //
const SmartScreen = (props) => {
  if (props.screen == userLists[2]) {
    return (
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Header
            leftComponent = {<Icon name='shopping-cart' type='feather' color='#fff'/>}
            centerComponent={{ text: 'Market Buddy', style: { color: '#fff', fontSize: 20 } }}
            rightComponent={{ icon: 'menu', color: '#fff' }}
          />
        </View>
        
        <View style={styles.listCards}>
        <View style={styles.userList}>
        
        <SectionList
          sections={[
            // {title: 'D', data: ['Shopping List']},
            {title: 'Movie Snacks', data: ['Popcorn', 'Cheetos', 'Skittles', 'Liquid Honey', 'Pickles', 'M&M', 'Coke', 'Cris', 'Giovani', 'Leo', 'Dani', 'Sam']},
          ]}
          // sections= [ 
          //   {
          //     id: 0,
          //     title: 'Safeway',
          //     userID: 1,
          //     data: [ 
          //       {id: 1, name: 'Popcorn', price:'Cheetos'}, 
          //       // 'Skittles', 'Liquid Honey', 'Pickles', 'M&M', 'Coke', 'Cris', 'Giovani', 'Leo', 'Dani', 'Sam']
          //       // {id: 0, text: 'Guru Nanak Jayanti'},
          //       // {id: 1, text: 'Guy Fawkess Day'},
          //       // {id: 2, text: 'Veterans Day observed'},
          //     ]
          //   // {title: 'D', data: ['Shopping List']},
          //   // {title: 'Movie Snacks', data: ['Popcorn', 'Cheetos', 'Skittles', 'Liquid Honey', 'Pickles', 'M&M', 'Coke', 'Cris', 'Giovani', 'Leo', 'Dani', 'Sam']},
          //    } 
          // ]
          renderItem={({item}) => 
            <Text style={styles.item}>
              {item}
              <Icon name='shopping-cart' type='feather' color='#fff'/>
            </Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
          // containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        />
        {/* </List> */}
        {/* <Text>YOU ARE AT SCREEN A</Text>  */}
        </View>
        </View>
     </View>
    )  
  } else if (props.screen == userLists[1]) {
    return (
      <Text>HEYO IT'S SCREEN B</Text>
    )  
  } else if (props.screen == userLists[0]) {
    return (
      <Text>WHAT UP IT'S SCREEN C</Text>
    )  
  } else {
    return (
      <Text></Text>
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
        <ButtonContainer setScreen={this.setScreen} />
        <SmartScreen screen={this.state.currentScreen} />
      </View>
    )
  }
}

//  =============== INDIVIDUAL LIST ================== //
// ========== render list ============ //



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
    // backgroundColor: '#3f4bba',
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
    backgroundColor: '#e9ebf7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 380
  },
  userList: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 100,
    width: 350,
    marginTop: 30,
    borderRadius: 10,
    // borderWidth: 1,
    // marginLeft: 14
        
    
  },
  listCards:{
    flex: 1,
    backgroundColor: '#e9ebf7',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 30,
    width: 400,
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
  header: {
    width: 380,
    
  },
  card: {
    width: 300,
  }
   
});

