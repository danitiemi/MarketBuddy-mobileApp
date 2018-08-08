import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SectionList, ScrollView, AsyncStorage, TouchableOpacity,
  SafeAreaView,} from 'react-native';
import { LinearGradient, Asset, Font, Constants } from 'expo';
import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15
import {post} from 'axios';

import Collapsible from 'react-native-collapsible';
import { User } from './components/Models';
import styles from './components/Styles';
import {login, getListFromTheInternet} from './api-svc';

import NavBar from './components/Header';
import ShoppingList from './components/UserLists';
import BarcodeScanner from './components/Scanner';
import renderIf from './components/RenderIf';

// ============== 2. LOGIN SWITCH =============== //
// 
// class LoginSwitch extends React.Component {

//   render() {
//     const props = this.props
//     if (!props.loggedIn) {
//       return (
//         <LoginScreen loginHandler={props.loginHandler}/> 
//       )
//     } else {
//       return (
//         <MainRouterSwitch />
//       )
//     }
//   }
// }

// ================== 2A. LOGIN SCREEN - FORM ===================== //
const Form = t.form.Form;

// const User = t.struct({
//   email: t.String,
//   password: t.String,
// });

// ============= NEW: HIDE PASSWORD ================== //
const options = {
  
  fields: {
      email: {
          // placeholder: t.t('Email'),
          auto: 'placeholders',
          // error: t.t('Email is empty'),
      },
      password: {
          // placeholder: t.t('Password'),
          auto: 'placeholders',
          // error: t.t('Password is empty'),
          password: true,
          secureTextEntry: true,
      }
  }
};

class LoginScreen extends React.Component {

  async submitHandle(){
    // const value = this.loginform.getValue();
    let value = {};
    value.email = 'root@root.com';
    value.password = 'root';
    this.props.attemptLogin(value.email, value.password);
  }

  //   // console.log("check loginRequest: ", loginRequest);
  //   loginRequest = JSON.stringify(loginRequest);
  //   // const loggedUser = login(loginRequest);
  //   // console.log("check function: ", loggedUser);
  //   // localStorage.setItem('user', JSON.stringify(loggedUser)); 
  //   post('http://192.168.88.120:7000/users/login', {user: loginRequest})
  //     // .then(response => response.data)
  //     .then((response) => {
  //       let userObject = JSON.stringify(response.data.user);
  //       AsyncStorage.setItem('user', userObject);
  //       let newUser = AsyncStorage.getItem('user');
  //       let userResolved = Promise.resolve(newUser);
  //       userResolved.then((content) => {
  //         console.log('promise loginScreen',content)
          
  //       })
  //       .catch(err=>{
  //         console.log(err)
  //       });
  //       this.props.loginHandler();
  //     })
  //   .catch(err=>{
  //     console.log("ERR", err)
  //   });
  // }


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
const userPromise = AsyncStorage.getItem('user');
let userContent = {lists:[]};
userPromise.then((content) => {
  userContent = JSON.parse(content);
})
.catch(err=>{
  console.log(err)
});

// ==== !!!!!!!! STYLE THE CARDS !!!!! ==== //
const ButtonContainer = (props) => {
  const { setScreen } = props
  return (
    <View style={styles.mainContainer}>
      <NavBar />
      <View style={styles.listCards}>
        <ScrollView>
        { props.userList.map((u, i) => {
          return (
            <View key={i} style={styles.card}>

            <Card
              title={u.name}
              // image={require('./assets/checklist.png')}
              backgroundColor='#4f6dc1'>

              <Button
                onPress={() => setScreen(u.id)}
                icon={{name: 'code'}}
                backgroundColor='#4f6dc1'
                buttonStyle={{borderRadius: 4, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Pick me' />
            </Card>
            </View>
          )
        })
      }
      </ScrollView>
      </View>
    </View>
  )
}


// ============= 2 || 3 USER's SHOPPING LIST ============== //

// const SmartScreen = (props) => {
//   if (props.screen == userContent.lists[2]) {
//     return (
//       <View style={styles.listContainer}>
//         <NavBar />
//         <ShoppingList />
//      </View>
//     )  
//   } else {
//     return (
//       <Text></Text>
//     )
//   }
// }

// ========= RENDERLIST = SHOPPINGLIST ============ //
// class RenderList extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       productArray: [], 
//       listTitle: '',
//     }
//   }

//   render(){
//     console.log(this.props)

//     let listName = this.props.list ? this.props.list.pickList.name : 'no name';
//     let pickList = this.props.list ? [this.props.list.pickList.products] : ['no products'];
    
//     return (
//       <View style={styles.listContainer}>
//         <View style={styles.header}>
//           <Header
//             leftComponent = {<Icon name='shopping-cart' type='feather' color='#fff'/>}
//             centerComponent={{ text: 'Market Buddy', style: { color: '#fff', fontSize: 20 } }}
//             rightComponent={{ icon: 'menu', color: '#fff' }}
//           />
//         </View>
        
//         <View style={styles.listCards}>
//         <View style={styles.userList}>

//         <SectionList
//           renderItem={({item, index, section}) => {
//           let data = item ? item[index].name : 'Loading';
//           return <Text key={index}>{data}</Text>}
//           }
//           renderSectionHeader={({section: {title}}) => (
//             <Text style={{fontWeight: 'bold'}}>{title}</Text>
//           )}
//           sections={[
//             {title: listName, data: pickList},
//           ]}
//           keyExtractor={(item, index) => item + index}
//         />
        
//         </View>
//         </View>
//      </View>
//     );
//   }
// }

// ======== NEW SMARTSCREEN =========== //
class SmartScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ShoppingList list={this.props} />
      // <RenderList list={this.props} />

    )  
  }
}

// =============== 2. MAIN ROUTER HOLDER ================ //

class MainRouterSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // renderProductList: false,
      currentScreen: '',
    }
    this.setScreen = this.setScreen.bind(this)
  }

  setScreen(listId) {
    this.props.selectList(listId);
    this.setState({renderProductList: true})
  }

  render() {
    console.log('MainRouterProps', this.props);
    return (
      <View style={styles.mainContainer}>
      { this.state.renderProductList ? <SmartScreen pickList={this.props.pickList} screen={this.state.currentScreen}  /> : <ButtonContainer userList={this.props.userLists} setScreen={this.setScreen}/> }
      </View>
    )
  }
}

  // setScreen(screen) {
  //   this.setState({
  //     currentScreen: screen
  //   })
  // }

//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         <ButtonContainer setScreen={this.setScreen} />
//         <SmartScreen screen={this.state.currentScreen}  />
//       </View>
//     )
//   }
// }

// ============ 1. APP ============ //

function AppPresenter({user, lists, loggingIn, loginError, selectedListId, selectedListItems, updatingList, selectList, attemptLogin}){
  console.log("AppPresenterlists: ", lists);
  return (
    <View style={styles.container}>
      {user ? <MainRouterSwitch  userLists={lists} selectList={selectList} pickList={selectedListItems}/> : <LoginScreen attemptLogin={attemptLogin}/> }
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: false,
      loggingIn: false,
      lists: '',
      updatingList: false, 
      selectedListItems: []
    }
  }

  attemptLogin = (email, password) => {
    this.setState({loggingIn: true});
    login(email, password)
      .then((data) => {
       let user = data.user;
        this.setState({user:user, loggingIn: false, lists: user.lists});
      }, ({error}) => {
        console.log('in error');
        this.setState({user: false, loggingIn: false, loginError: error})
      });
  }
  selectList = (listId) => {
    this.setState({selectedListId: listId, updatingList: true});
    getListFromTheInternet(listId)
      .then((data) => {
        this.setState({updatingList: false, selectedListItems: data});
      })

  }
  render() {
    
    return <AppPresenter {...this.state} attemptLogin={this.attemptLogin} selectList={this.selectList}/>
  }
}


// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loggedIn: false,
//     }
//     this.setLogin = this.setLogin.bind(this)
//   }
//   setLogin() {
//     this.setState({
//       loggedIn: true
//     })
//   }
//   render() {
//     const state = this.state
//     return (
//       <View style={styles.container}>
//         <LoginSwitch loggedIn={state.loggedIn} loginHandler={this.setLogin}/>
//       </View>
//     );
//   }
// }

// =========== STYLES ============= //
