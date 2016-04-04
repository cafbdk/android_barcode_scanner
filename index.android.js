'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import BarcodeScanner from 'react-native-barcodescanner';

var api = require('./components/api.js');


var cafbScanner = React.createClass({
    getInitialState: function() {
        return{
            barcode: '',
            type: '',
            torchMode: 'on',
            cameraType: 'back',
        }
        console.log('state loaded');
    },

    barcodeReceived(e) {
      var code = e.data;
      console.log('Barcode: ' + e.data);
      console.log('Barcode Length: '+ e.data.length);
      console.log('Type: ' + e.type);

      this.setState({
        'barcode': e.data,
        'type': e.type,
      });

      this.getUPC(code);
  },

    getUPC: function(code){
        var URL = 'https://cafbsite.herokuapp.com/api/auth/upc=' + code + '/?format=json';
        api(URL).then(
            (response) => {
                console.log(response);
                console.log(URL);
            });

    },

    render() {
      return (
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
      );
  },

});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6600',
    },
    webview_header: {
        paddingLeft: 10,
        backgroundColor: '#FF6600',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    header_item: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    webview_body: {
        flex: 9
    },
    button: {
        textAlign: 'center',
        color: '#FFF',
    },
    page_title: {
        color: '#FFF'
    },
    spinner: {
        alignItems: 'flex-end'
    }
});

AppRegistry.registerComponent('cafbScanner', () => cafbScanner);
