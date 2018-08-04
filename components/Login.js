import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import MainRouterSwitch from './UserLists';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';

// export class LoginScreen extends React.Component {

//     render() {
//       return (
//         <View style={styles.container}>
//           <Text>Login Screen</Text>
//           <TouchableHighlight
//             onPress={this.props.loginHandler}
//           >
//             <Text>LOGIN</Text>
//           </TouchableHighlight>
//         </View>
//       )
//     }
// }

// export class LoginSwitch extends React.Component {

//   render() {
//     const props = this.props
//     if (!props.loggedIn) {
//       return (
//        <LoginScreen loginHandler={props.loginHandler}/> 
//       )
//     } else {
//       return (
//         <MainRouterSwitch />
//       )
//     }
//   }
// }



// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     buttonContainer: {
//       flexDirection: 'row'
//     }
// });

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "t"
    }

    this.logIn = this.logIn.bind(this)
  }

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('213079429277026', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);

      const profile = (await response.json())
      console.log(profile)
      this.setState({
        name: profile.name
      })
    }
  }
  
  render() {
    const state = this.state
    return (
      <View style={styles.container1}>
        <View style={styles.container2}>
          {
            state.name || (
              <TouchableHighlight
              onPress={this.logIn}
              >
                <Image
                  source={{uri: 'https://scontent.fyvr1-1.fna.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=0&oh=75f2de065fd5fc4261d8ed45eaf936de&oe=5B2833EA'}}
                  style={{
                    height: 45,
                    width: 300
                  }}
                />
              </TouchableHighlight>
            )
          }
          {
            !state.name || <ChatContainer/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'papayawhip',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'papayawhip',
    justifyContent: 'center',
    alignItems: 'center'
  },
});