import React from 'react';
import {
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
import NavBar from './Header';
import BarcodeScanner from './Scanner';
import Collapsible from 'react-native-collapsible'; // Version can be specified in package.json


export default class ShoppingList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scannerOn: false,
      activeSection: '',
      checked: [],
    };
  }

  onPress = section => {
    this.setState({
      activeSection: this.state.activeSection === section.title
        ? ''
        : section.title,
    });
  };

  openScanner = () => {
    this.setState({ scannerOn: true })
  }

  checkItem = item => {
    const { checked } = this.state;
    
    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
      console.log('inside checkitem', item)
  
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <NavBar />
        <TouchableHighlight>
          <View style={styles.scanner}>
            {/* <Image source={require('./assets/camera.png')} /> */}
            <Button
              backgroundColor='#e9ebf7'
              color='#000'
              accessibilityLabel="Update your product"
              onPress={() => this.openScanner() } 
              title="Update your product."
              style={styles.button}
              />
            {this.state.scannerOn && <BarcodeScanner /> }
          </View>
        </TouchableHighlight> 

        <View style={styles.listCards}>
          <SafeAreaView>
            <ScrollView style={styles.scroll}>
              <SectionList
                extraData={this.state}
                sections={sections}
                keyExtractor={item => item.title}
                renderSectionHeader={({ section }) => (
                  <TouchableOpacity onPress={() => this.onPress(section)}>
                    <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                renderItem={({ item, section }) => (
                  <Collapsible
                    key={item}
                    collapsed={section.title !== this.state.activeSection}>
                    <ListItem 
                      title={
                        <CheckBox
                          title={item.title}
                          onPress={() => this.checkItem(item)}
                          checked={this.state.checked.includes(item)}
                        />
                      }
                      badge={{ value: `\$ ${item.price.toFixed(2)}`, textStyle: { color: 'black' }, containerStyle: { alignSelf: 'center', backgroundColor: 'grey', margin: 20 } }}
                      hideChevron={true}                           
                    />
                  </Collapsible>
                )}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}


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
  listCards:{
    flex: 1,
    backgroundColor: '#e9ebf7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  listContainer: {
    // backgroundColor: '#e9ebf7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 380
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 30,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
    width: 250
  },
  scanner: {
    backgroundColor: '#e9ebf7',
    width: 300,
    height: 170,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    
  },
  button: {
    // height: 170,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  scroll: {
    flexDirection: 'column'
  },
});
