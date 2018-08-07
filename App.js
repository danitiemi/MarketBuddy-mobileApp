import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SectionList, ScrollView, AsyncStorage, FlatList} from 'react-native';
import { LinearGradient, AppLoading, Asset, Font } from 'expo';
import { Button, Icon, Card, ListItem, Header, List } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15
import {User} from './models';
import styles from './styles'
import {login, getListFromTheInternet} from './api-svc';

// ================== 2A. LOGIN SCREEN - FORM ===================== //
const Form = t.form.Form;
const options = {
  auto: 'placeholders'
};

class LoginScreen extends React.Component {

  async submitHandle(){
    const value = this.loginform.getValue();
    this.props.attemptLogin(value.email, value.password);
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
     <View style={styles.header}>
      <Header
        leftComponent = {<Icon name='shopping-cart' type='feather' color='#fff'/>}
        centerComponent={{ text: 'Market Buddy', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ icon: 'menu', color: '#fff' }}
      />
      </View>
      <View style={styles.listCards}>
      <ScrollView>
        { userContent.lists.map((u, i) => {
          return (
            <View key={i} style={styles.card}>

            <Card
              title={u.name}
              image={require('./assets/checklist.png')}
              backgroundColor='#4f6dc1'>

              <Button
                onPress={() => setScreen(u, u.id)}
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

// ============= 2 || 3. SHOPPING LIST ============== //
class RenderList extends React.Component{
  constructor(props){
    super(props);
    this.state = {productArray: [], listTitle: ''}
  }
  componentDidMount() {
    const listPromise = AsyncStorage.getItem('listArray');

    listPromise.then((content) => {
      let parse = JSON.parse(content);
      listContent = parse.products;
      listTitle = parse.name;
      this.setState({productArray: parse.products, listTitle: parse.name});
    })

  }
  render(){
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
          renderItem={({item, index, section}) => <Text key={index}>{item.name}</Text>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={[
            {title: this.state.listTitle, data: this.state.productArray},
          ]}
          keyExtractor={(item, index) => item + index}
        />
        
        </View>
        </View>
     </View>
    );
  }
}
const SmartScreen = (props) => {
  if (props.screen == userContent.lists[2]) {
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
            {title: 'Movie Snacks', data: ['Popcorn', 'Cheetos', 'Skittles', 'Liquid Honey', 'Pickles', 'M&M', 'Coke', 'Cris', 'Giovani', 'Leo', 'Dani', 'Sam']},
          ]}
          renderItem={({item}) => 
            <Text style={styles.item}>
              {item}
              <Icon name='shopping-cart' type='feather' color='#fff'/>
            </Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        </View>
        </View>
     </View>
    )  
  } else if (props.screen == userContent.lists[1]) {
    return (
      // <Text>HEYO IT'S SCREEN B</Text>
      <RenderList/>
    )  
  } else if (props.screen == userContent.lists[0]) {
    return <RenderList/>
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
  setScreen(screen, listId) {
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

// ============ 1. APP ============ //

function AppPresenter({user, loggingIn, loginError, selectedListId, updatingList, selectList, attemptLogin}){
  return (
    <View style={styles.container}>
      {user ? <MainRouterSwitch/> : <LoginScreen attemptLogin={attemptLogin}/> }
    </View>
  );
}
export default class App extends React.Component {
  state = {
    user: undefined,
    loggingIn: false
  }
  attemptLogin = (email, password) => {
    this.setState({loggingIn: true});
    login(email, password)
      .then((user) => {
        this.setState({user:user, loggingIn: false})
      }, ({error}) => {
        this.setState({user: undefined, loggingIn: false, loginError: error})
      });
  }
  selectList = (listId) => {
    this.setState({selectedListId: listId, updatingList: true});
    getListFromTheInternet(listId)
      .then((selectedListItems) => {
        this.setState({updatingList: false, selectedListItems: selectedListItems});
      })

  }
  render() {
    return <AppPresenter {...this.state} attemptLogin={this.attemptLogin} selectList={this.selectList}/>
  }
}

