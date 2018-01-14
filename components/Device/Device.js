import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { down, up, stop } from '../../actions';
import styles from './styles';

class Device extends Component {
  static propTypes = {
    down: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    up: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    title: 'Device',
    headerStyle: {
      backgroundColor: '#0086C3',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerTintColor: '#FFFFFF',
    headerBackTitle: 'Cancel',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
  };

  constructor(props) {
    super(props);

    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.stop = this.stop.bind(this);
  }

  down() {
    this.props.down();
  }

  up() {
    this.props.up();
  }

  stop() {
    this.props.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPressIn={this.up} onPressOut={this.stop}>
          <Icon name="arrow-up-bold-circle" size={200} color="#73E8FF" />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={this.down} onPressOut={this.stop}>
          <Icon name="arrow-down-bold-circle" size={200} color="#73E8FF" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  { down, up, stop },
)(Device);
