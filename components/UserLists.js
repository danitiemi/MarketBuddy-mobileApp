import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
import NavBar from './Header';
import BarcodeScanner from './Scanner';



export default class ShoppingList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // scannerOn: false,
      activeSection: '',
      productArray: [],
      checked: [],
      listTitle: '',
      // loading: false,
      // seed: 1,
      // error: null,
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

  // ======== PLAN B =============== //

//   componentDidMount() {
//     this.makeRemoteRequest();
//   }

//   makeRemoteRequest = () => {
//     const { page, seed } = this.state;
//     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
//     this.setState({ loading: true });
//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           data: page === 1 ? res.results : [...this.state.data, ...res.results],
//           error: res.error || null,
//           loading: false,
//           refreshing: false
//         });
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
//   };

//   render() {
//     return (
//       <List>
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Coming soon...</Text>
//       </View>
//       </List>
//     );
//   }
// }

//  ======== END OF PLAN B ========= //

  render() {

    let listName = this.props.list ? this.props.list.pickList.name : 'no name';
    let pickList = this.props.list ? [this.props.list.pickList.products] : ['no products'];

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
              title="Different price? Add the new price below and scan your product here to update it."
              style={styles.button}
              />
            {this.state.scannerOn && <BarcodeScanner /> }
          </View>
        </TouchableHighlight> 

        <View style={styles.inputText}>
          {/* <Button
            backgroundColor='#e9ebf7'
            color='#000'
            accessibilityLabel="Update your product"
            onPress={() => this.openScanner() }
            // icon={{name: 'camera', color: '#000'}}
            title="SCAN"
            style={{height: 42, borderColor: 'gray'}}
          /> */}
          <TextInput
            placeholder={'New price here'}
            style={{height: 42, borderColor: 'gray', borderWidth: 1, backgroundColor: '#e9ebf7', width: 120}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button
            backgroundColor='#e9ebf7'
            color='#000'
            accessibilityLabel="Different price? Add the new price above and scan your product here to update it."
            onPress={() => this.openScanner() } 
            title="SEND"
            style={{height: 42, borderColor: 'gray'}}
          /> 
        </View>


        <View style={styles.listCards}>
          <SafeAreaView>
            <ScrollView style={styles.scroll}>

              <SectionList
                extraData={this.state}
                
                // sections={sections}
                sections={[
                  {title: listName, data: pickList},
                ]}
                // keyExtractor={item => item.title}
                keyExtractor={(item, index) => item + index}
                
                // renderSectionHeader={({ section }) => (
                renderSectionHeader={({section: {title}}) => (  
                  <TouchableOpacity onPress={() => this.onPress(section)}>
                    <View style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                // renderItem={({ item, section }) => (
                  
                  renderItem={({item, index, section}) => {

                      let data = item ? item[index].name : 'Loading';
                      return <Text style={styles.titleText} key={index}>{data}</Text>
                  
                  // <View>
                  //   <Collapsible
                  //     key={item}
                  //     collapsed={section.title !== this.state.activeSection}>
                  //     <ListItem 
                  //       title={
                  //         <CheckBox
                  //           title={item.title.name}
                  //           onPress={() => this.checkItem(item)}
                  //           checked={this.state.checked.includes(item)}
                  //         />
                  //       }
                  //       badge={{ value: `\$ ${item.price.toFixed(2)}`, textStyle: { color: 'black' }, containerStyle: { alignSelf: 'center', backgroundColor: 'grey', margin: 20 } }}
                  //       hideChevron={true}                           
                  //     />
                  //   </Collapsible>
                  // </View>
                }
              }

              

                // /* ========= RENDER ITEM: SAM'S ==========  */

                // renderItem={({item, index, section}) => {

                //   let data = item ? item[index].name : 'Loading';
                //   return <Text key={index}>{data}</Text>}
                //   }
                //   renderSectionHeader={({section: {title}}) => (
                //     <Text style={{fontWeight: 'bold'}}>{title}</Text>
                //   )}
                  // sections={[
                  //   {title: listName, data: pickList},
                  // ]}

                // ======== RENDER ITEM: MY CODE ========= //
                // renderSectionHeader={({ section }) => (
                //   <TouchableOpacity onPress={() => this.onPress(section)}>
                //     <View style={styles.sectionContainer}>
                //       <Text style={styles.sectionTitle}>{section.title}</Text>
                //     </View>
                //   </TouchableOpacity>
                // )}
                // renderItem={({ item, section }) => (
                //   <Collapsible
                //     key={item}
                //     collapsed={section.title !== this.state.activeSection}>
                //     <ListItem 
                //       title={
                //         <CheckBox
                //           title={item.title}
                //           onPress={() => this.checkItem(item)}
                //           checked={this.state.checked.includes(item)}
                //         />
                //       }
                //       badge={{ value: `\$ ${item.price.toFixed(2)}`, textStyle: { color: 'black' }, containerStyle: { alignSelf: 'center', backgroundColor: 'grey', margin: 20 } }}
                //       hideChevron={true}                           
                //     />
                //   </Collapsible>
                // )}
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
    marginRight: 30,
    marginTop: 24,
    opacity: 0.8,
    width: 160
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
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  scroll: {
    flexDirection: 'column'
  },
  inputText: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 8
  },
  titleText: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#000',
    margin: 15
  },
});
