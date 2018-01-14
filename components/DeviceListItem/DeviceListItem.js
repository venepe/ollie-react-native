import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { deleteDevice } from '../../actions';
import styles from './styles';

class DeviceListItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    device: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    deleteDevice: PropTypes.func.isRequired,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    device: {},
    onPress: () => {},
  }

  constructor(props) {
    super(props);

    this.deleteDevice = this.deleteDevice.bind(this);

    this.state = {
      rowID: props.rowID,
      device: props.device,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.device) {
      this.setState({ device: nextProps.device });
    }
  }

  deleteDevice() {
    const id = this.state.device.id;
    this.props.deleteDevice({ payload: { id } });
  }

  render() {
    const right = [
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: this.deleteDevice },
    ];

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(this.state.rowID)}>
          <View style={[styles.card, styles.container]}>
            <Text style={styles.title}>{this.state.device.id}</Text>
            <Text style={styles.title}>{this.state.device.name}</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

export default connect(
  null,
  { deleteDevice },
)(DeviceListItem);
