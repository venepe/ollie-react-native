import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppState,
  Button,
  ListView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import DeviceListItem from '../DeviceListItem';
import { getDevices } from '../../reducers';
import { fetchDevices, init } from '../../actions';
import styles from './styles';

class DeviceList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
    devices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    init: PropTypes.func.isRequired,
    fetchDevices: PropTypes.func.isRequired,
  }

  static defaultProps = {
    devices: [],
  }

  static navigationOptions = {
    title: 'ollie',
    headerStyle: {
      backgroundColor: '#3B5998',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitle: 'Back',
  };

  static getUpdatedState(devices) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
      dataSource: ds.cloneWithRows(devices),
    };
  }

  constructor(props) {
    super(props);

    this.props.init();

    this.getSetupState = this.getSetupState.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onPressRow = this.onPressRow.bind(this);

    this.state = this.getSetupState();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.props.fetchDevices()
      .catch(() => {
        console.log('Failed');
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.devices) {
      console.log(nextProps.devices);
      this.setState(DeviceList.getUpdatedState(nextProps.devices));
    }
  }

  onPressRow(selectedIndex) {
    const device = this.props.devices[selectedIndex];
    const { navigate } = this.props.navigation;

    navigate('Device', { device });
  }

  getSetupState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.devices),
    };
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.props.init();
    }
  }

  renderRow(rowData, sectionID, rowID) {
    const id = parseInt(rowID, 10);
    return (
      <DeviceListItem device={rowData} rowID={id} onPress={this.onPressRow} />
    );
  }

  render() {
    let renderComponent;
    if (this.props.devices.length > 0) {
      renderComponent = (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
        />
      );
    } else {
      renderComponent = (<View />);
    }
    return renderComponent;
  }
}

DeviceList.navigationOptions = (props) => {
  const { navigation } = props;
  const { navigate } = navigation;

  return {
    title: 'Devices',
    headerStyle: {
      backgroundColor: '#0086C3',
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
      color: '#FFFFFF',
    },
    headerRight: (
      <Button
        title={'Configure'}
        color={'#FFFFFF'}
        onPress={() => navigate('SmartConfig')}
      />
    ),
    headerLeft: (
      <Button
        title={'Add Device'}
        color={'#FFFFFF'}
        onPress={() => navigate('Scanner')}
      />
    ),
  };
};

const mapStateToProps = state => ({
  devices: getDevices(state),
});

export default connect(
  mapStateToProps,
  { init, fetchDevices },
)(DeviceList);
