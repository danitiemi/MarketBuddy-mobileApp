
// import React from 'react';
// import {
//   Text,
//   StyleSheet,
//   SectionList,
//   TouchableOpacity,
//   TouchableHighlight,
//   SafeAreaView,
//   View,
//   Image,
//   ScrollView,
//   TextInput
// } from 'react-native';
// import { Button, Icon, Card, ListItem, Header, Divider, CheckBox } from 'react-native-elements';
// import NavBar from './Header';
// import BarcodeScanner from './Scanner';
// import Collapsible from 'react-native-collapsible'; // Version can be specified in package.json

// const sections = [
//   {
//     data: [
//       {
//         title: 'KitKat',
//         price: 1.30
//       },
//       {
//         title: 'Popcorn',
//         price: 4.70
//       },
//       {
//         title: 'Coke',
//         price: 2.99
//       },
//       {
//         title: 'Cheetos',
//         price: 4.20
//       },
//     ],
//     title: 'Safeway',
//     total: '\$ 13.19'
//   },
//   {
//     data: [
//       {
//         title: 'KitKat',
//         price: 1.90
//       },
//       {
//         title: 'Popcorn',
//         price: 5.20
//       },
//       {
//         title: 'Coke',
//         price: 3.25
//       },
//       {
//         title: 'Cheetos',
//         price: 4.70
//       },
//     ],
//     title: 'Market Place IGA',
//     total: '\$ 15.05',
//   },
//   {
//     data: [
//       {
//         title: 'KitKat',
//         price: 1.50
//       },
//       {
//         title: 'Popcorn',
//         price: 3.57
//       },
//       {
//         title: 'Coke',
//         price: 3.25
//       },
//       {
//         title: 'Cheetos',
//         price: 3.99
//       },
//     ],
//     title: 'SaveOn Foods',
//     total: '\$ 12.31',
//   },
//   {
//     data: [
//       {
//         title: 'KitKat',
//         price: 1.65
//       },
//       {
//         title: 'Popcorn',
//         price: 3.20
//       },
//       {
//         title: 'Coke',
//         price: 2.35
//       },
//       {
//         title: 'Cheetos',
//         price: 2.99
//       },
//     ],
//     title: 'T&T',
//     total: '\$ 10.19',
//   },
// ];


// export default class UpdateList extends React.Component {
// //   constructor (props) {
//     // super(props);
//     // this.state = {
//     //   scannerOn: false,
//     //   activeSection: '',
//     //   checked: [],
//     //   text: ''
//     // };
    

//     state = {
//         scannerOn: false,
//         activeSection: '',
//         checked: [],
//         text: ''
//       }
// //  } 

//   onPress = section => {
//     this.setState({
//       activeSection: this.state.activeSection === section.title
//         ? ''
//         : section.title,
//     });
//   };

//   openScanner = () => {
//     this.setState({ scannerOn: true })
//   }

//   checkItem = item => {
//     const { checked } = this.state;
  
//     console.log(this.state, 'hereeee')
  
//     if (!checked.includes(item)) {
//       this.setState({ checked: [...checked, item] });
//     } else {
//       this.setState({ checked: checked.filter(a => a !== item) });
//       console.log('inside checkitem', item)
  
//     }

//   };


//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         <NavBar />
//         <TouchableHighlight>
//         <View style={styles.scanner}>
//         <Icon
//             raised
//             name='camera'
//             type='entypo'
//             color='#000'
//             onPress={() => this.openScanner()} />
//           {/* <Icon icon={{type: 'entypo', name: 'camera', color: '#000'}} */}
//           <Button
//             backgroundColor='#e9ebf7'
//             color='#000'
//             accessibilityLabel="Update this product"
//             onPress={() => this.openScanner() } 
//             // title="Price does not match? Scan the product to update it!"
//             style={styles.button}
//           />
//           {this.state.scannerOn && <BarcodeScanner /> }
          
        
//         </View>
//         </TouchableHighlight> 

//         <View style={styles.inputText}>
//           {/* <Button
//             backgroundColor='#e9ebf7'
//             color='#000'
//             accessibilityLabel="Update your product"
//             onPress={() => this.openScanner() }
//             icon={{name: 'camera', color: '#000'}}
//             title="SCAN"
//             style={{height: 40, borderColor: 'gray'}}
//           /> */}
//           <TextInput
//             placeholder={'  $$ NEW PRICE HERE'}
//             style={{height: 42, borderColor: 'gray', borderWidth: 1, backgroundColor: '#e9ebf7', width: 150}}
//             onChangeText={(text) => this.setState({text})}
//             value={this.state.text}
//           />
//           <Button
//             backgroundColor='#e9ebf7'
//             color='#000'
//             accessibilityLabel="Different price? Add the new price above and scan your product here to update it."
//             onPress={() => this.openScanner() } 
//             title="OK"
//             style={{height: 40, borderColor: 'gray'}}
//           /> 
//         </View>

//         <View style={styles.listCards}>
//           <SafeAreaView>
//           <ScrollView style={styles.scroll}>
//             <SectionList
//               extraData={this.state}
//               sections={sections}
//               keyExtractor={item => item.title}
//               renderSectionHeader={({ section }) => (
//                 <TouchableOpacity onPress={() => this.onPress(section)}>
//                   <View style={styles.sectionContainer}>
//                     <Text style={styles.sectionTitle}>{section.title}</Text>
//                     console.log(section)
//                     <Text style={styles.sectionTitle}>{section.total}</Text>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               renderItem={({ item, section }) => (
//                 <Collapsible
//                   key={item}
//                   collapsed={section.title !== this.state.activeSection}>
//                   <ListItem 
//                     title={
//                       <CheckBox
//                         title={item.title}
//                         onPress={() => this.checkItem(item)}
//                         checked={this.state.checked.includes(item)}
//                       />
//                     }  
//                     badge={{ value: `\$ ${item.price.toFixed(2)}`, textStyle: { color: 'white' }, containerStyle: { alignSelf: 'center', backgroundColor: '#3e5491', margin: 20, padding: 17 } }}
//                     hideChevron={true}
//                     // style={ {padding: 10}}
//                   />
                 
//                 </Collapsible>
//               )}
//             />
//             </ScrollView>
//           </SafeAreaView>
//         </View>
//       </View>
//     );
//   }
// }



// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#3e5491',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 900,
//     position: 'absolute'
//   },
//   listCards:{
//     flex: 1,
//     backgroundColor: '#e9ebf7',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 400,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   listContainer: {
//     // backgroundColor: '#e9ebf7',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 380
//   },
//   sectionContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0, 0, 0, 0.12)',
//     backgroundColor: '#fff',
//     flexDirection: 'row'
//   },
//   sectionTitle: {
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 20,
//     marginLeft: 30,
//     marginRight: 70,
//     marginTop: 24,
//     opacity: 0.8,
//     width: 160,
//     fontWeight: 'bold'
//   },
//   scanner: {
//     backgroundColor: '#e9ebf7',
//     width: 300,
//     height: 170,
//     marginTop: 10,
//     marginBottom: 10,
//     padding: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
   
//     position: 'relative',
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//   },
//   scroll: {
//     flexDirection: 'column'
//   },
//   inputText: {
//     flexDirection: 'row',
//     height: 40,
//     marginBottom: 10
//   }
//   // sectionTotal: {
//   //   // flexDirection: 'row'
//   //   alignItems: 'center'
//   // }
// });