import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

// =========== STYLES ============= //

export default StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      top: 0,
      left: 0,
      right: 0,
      height: 1000,
      position: 'absolute'
    },
    container: {
      flex: 1,
      paddingTop: 100,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    containerCard: {
      flex: 1,
      // paddingTop: 30,
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
      marginTop: 30,
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
      // fontSize: 36,
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
      width: 250
    },
    contentContainer: {
      paddingVertical: 20
    },
    item: {
      fontSize: 40,
      backgroundColor: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
  });
  
  