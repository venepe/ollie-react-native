import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import Smartconfig from 'react-native-smartconfig';
import { NetworkInfo } from 'react-native-network-info';
import SpinnerButton from '../SpinnerButton';
import styles from './styles';

class SmartConfig extends Component {
  static navigationOptions = {
    title: 'SmartConfig',
    headerStyle: {
      backgroundColor: '#0086C3',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
    headerTintColor: '#FFFFFF',
  }

  constructor(props) {
    super(props);

    this.configure = this.configure.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      network: 'Not connected',
      password: '',
      isConfiguring: false,
    };
  }

  componentDidMount() {
    NetworkInfo.getSSID((ssid) => {
      if (ssid !== 'error') {
        this.setState({
          network: ssid,
        });
      }
    });
  }

  onChangePassword(password) {
    this.setState({
      password,
    });
  }

  configure() {
    this.setState({
      isConfiguring: true,
    });
    Smartconfig.start({
      type: 'esptouch',
      ssid: this.state.network,
      bssid: '',
      password: this.state.password,
      timeout: 50000,
    }).then((results) => {
      // Array of device success do smartconfig
      console.log('results');
      console.log(results);
      this.setState({
        isConfiguring: false,
      });
      /* [
        {
          'bssid': 'device-bssi1', //device bssid
          'ipv4': '192.168.1.11' //local ip address
        },
        {
          'bssid': 'device-bssi2', //device bssid
          'ipv4': '192.168.1.12' //local ip address
        },
        ...
      ] */
    }).catch((error) => {
      console.log('error');
      console.log(error);
      this.setState({
        isConfiguring: false,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Network:</Text>
          <Text style={styles.text}>{this.state.network}</Text>
          <View style={styles.borderLine} />
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.textbox}
            placeholder={'Enter Password'}
            value={this.state.password}
            onChangeText={this.onChangePassword}
            password
            autoFocus={false}
            keyboardType={'default'}
            returnKeyType={'done'}
            autoCapitalize={'none'}
          />
          <View style={styles.borderLine} />
        </View>
        <SpinnerButton showSpinner={this.state.isConfiguring} title="Configure" onPress={this.configure} />
      </View>
    );
  }
}

export default SmartConfig;
