import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';


export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    read: null
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  onBarCodeRead = async obj => {
    await delay(500);
    if (this.state.read == obj.data) return;
    this.setState({ read: obj.data });
    alert(`Bar code with type ${obj.type} and data ${obj.data} has been scanned!`);
    alert('Your product have been updated!')
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <BarCodeScanner
            onBarCodeRead={this.onBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
      );
    }
  }
}

// Workaround is to add a delay and check if that was already scanned

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    height: 900,
    position: 'absolute'
  },
})