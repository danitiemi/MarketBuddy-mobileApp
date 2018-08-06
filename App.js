import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SectionList, ScrollView, AsyncStorage, FlatList} from 'react-native';
import { LinearGradient, Asset, Font, Constants } from 'expo';
import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native'; // 0.6.15


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
      <View style={styles.listContainer }>
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

    </View>
  )
}

// ============= 2 || 3. SHOPPING LIST ============== //
const SECTIONS = [
  {
    data: [
      {
        title: 'List Item 1',
        price: 13
      },
      {
        title: 'List Item 2',
        price: 13
      },
      {
        title: 'List Item 3',
        price: 13
      },
      {
        title: 'List Item 4',
        price: 13
      },
    ],
    title: 'Safeway',
  },
  {
    data: [
      {
        title: 'List Item 1',
      },
      {
        title: 'List Item 2',
      },
      {
        title: 'List Item 3',
      },
      {
        title: 'List Item 4',
      },
    ],
    title: 'SECTION 2',
  },
  {
    data: [
      {
        title: 'List Item 1',
      },
      {
        title: 'List Item 2',
      },
      {
        title: 'List Item 3',
      },
      {
        title: 'List Item 4',
      },
    ],
    title: 'SECTION 3',
  },
  {
    data: [
      {
        title: 'List Item 1',
      },
      {
        title: 'List Item 2',
      },
      {
        title: 'List Item 3',
      },
      {
        title: 'List Item 4',
      },
    ],
    title: 'SECTION 4',
  },
]

function keyExtractor(item) {
  return item.title
}

const renderSectionHeader = ({ section }) =>
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>

state = {
  checked: [],
};


const renderItem = ({ item }) => 
  <ListItem title={
    <CheckBox
      title={item.title}
      // {section.price}
      onPress={() => this.checkItem(item)}
      checked={this.state.checked.includes(item)}
    />} 
  />

checkItem = item => {
  const { checked } = this.state;

  console.log(item, 'Item nya');
  console.log(this.state, 'hereeee')

  if (!checked.includes(item)) {
    this.setState({ checked: [...checked, item] });
  } else {
    this.setState({ checked: checked.filter(a => a !== item) });
    console.log('inside checkitem', item)

  }
};


const SmartScreen = (props) => {
  // this.state = {
  //   checked: ["List Item 1"] 
  // }
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
        
        <SectionList
            extraData={this.state}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            sections={SECTIONS}
            keyExtractor={keyExtractor}

        />
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
      currentScreen: '',
      checked: []
    }
    this.setScreen = this.setScreen.bind(this)
    // this.checkItem = this.checkItem.bind(this)
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
        <SmartScreen screen={this.state.currentScreen}  />
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
    width: 350,
    marginTop: 30,
    borderRadius: 10,
    // borderWidth: 1,
    // marginLeft: 14
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    
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
    // marginBottom: 10
  },
  card: {
    width: 300,
    // marginTop: 8,

  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
    width: 350
  },
  
});

