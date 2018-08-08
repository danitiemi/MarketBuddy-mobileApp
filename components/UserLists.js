import React from 'react';
import {
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  View
} from 'react-native';
import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
import NavBar from './Header';
import BarcodeScanner from './Scanner';
import Collapsible from 'react-native-collapsible'; // Version can be specified in package.json

const sections = [
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
        price: 13

<<<<<<< HEAD
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
    title: 'IGA',
  },
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
    title: 'SaveOn Foods',
  },
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
    title: 'T&T',
  },
];

export default class ShoppingList extends React.Component {
  state = {
    activeSection: '',
    checked: []
  };

  onPress = section => {
    this.setState({
      activeSection: this.state.activeSection === section.title
        ? ''
        : section.title,
    });
  };

=======
export default class ShoppingList extends React.Component {
  state = {
    activeSection: '',
    checked: []
  };

  onPress = section => {
    this.setState({
      activeSection: this.state.activeSection === section.title
        ? ''
        : section.title,
    });
  };

>>>>>>> e3c881c... slightly less stupid now
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <NavBar />
        <View style={styles.listCards}>
          <SafeAreaView>
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
                        price={item.price}

                        onPress={() => this.checkItem(item)}
                        checked={this.state.checked.includes(item)}
                      />
                    }                         
                  />
                  {/* text={<Text>Barcode Scanner</Text>} */}
                </Collapsible>
              )}
            />
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
    backgroundColor: '#e9ebf7',
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
});
