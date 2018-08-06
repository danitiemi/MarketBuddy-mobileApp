import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  header: {
    width: 380,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
})

export default class NavBar extends React.Component {

  render() {
    
    return (
      <View style={styles.header}>
        <Header
          leftComponent = {<Icon name='shopping-cart' type='feather' color='#fff'/>}
          centerComponent={{ text: 'Market Buddy', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        />
      </View>
    )
  }
}

