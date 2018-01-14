import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from './styles';

class SpinnerButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    showSpinner: PropTypes.bool,
  }

  static defaultProps = {
    title: '',
    onPress: () => {},
    underlayColor: '#99d9f4',
    backgroundColor: '#48BBEC',
    textColor: '#FFFFFF',
    showSpinner: false,
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      backgroundColor: props.backgroundColor,
      underlayColor: props.underlayColor,
      title: props.title,
      textColor: props.textColor,
      showSpinner: props.showSpinner,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  onPress(e) {
    this.props.onPress(e);
  }

  render() {
    let spinner;
    if (this.state.showSpinner) {
      spinner = <ActivityIndicator animating color="#FFFFFF" size="small" />;
    } else {
      spinner = (<Text style={[styles.defaultButtonText, { color: this.state.textColor }]}>
        {this.state.title}</Text>);
    }
    return (
      <TouchableHighlight
        style={[{ backgroundColor: this.state.backgroundColor }]}
        onPress={this.onPress}
        activeOpacity={0.2}
        underlayColor={this.state.underlayColor}
      >
        <View style={styles.spinnerButton}>
          <View style={styles.spinner}>
            {spinner}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SpinnerButton;
