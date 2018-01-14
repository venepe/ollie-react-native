import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { postDevice } from '../../actions';
import styles from './styles';

class Scanner extends Component {
  static propTypes = {
    postDevice: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    title: 'Add Device',
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

    this.onBarCodeRead = this.onBarCodeRead.bind(this);

    this.state = {
      didCapture: false,
    };
  }

  onBarCodeRead(result) {
    if (!this.state.didCapture && result.data && result.data.length > 0) {
      this.setState({
        didCapture: true,
      });
      const data = result.data;
      const payload = JSON.parse(data);
      /*
      {
        device: {
          id: '2',
          name: '2',
        },
      }
      */
      console.log(payload);
      this.props.postDevice({
        payload,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          aspect={Camera.constants.Aspect.fill}
        >
          <View style={styles.container}>
            <View style={styles.box}>
              <Icon name="crop-free" size={300} color="#F5F5F5" />
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

export default connect(
  null,
  { postDevice },
)(Scanner);
