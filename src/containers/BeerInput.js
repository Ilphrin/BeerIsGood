import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class BeerInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onChangeText: this.props.onChangeText,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      value: this.props.value,
      label: this.props.label,
      name: this.props.name,
    };
  }

  onChangeText = (value) => {
    this.setState({
      value,
    });
    this.state.onChangeText(value, this.state.name);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value && nextProps.modify === false) {
      return {
        value: nextProps.value,
      }
    }
    return null;
  }

  render() {
    return (
      <View>
        <FormLabel>
          {this.state.label}
        </FormLabel>
        <FormInput
          value={`${this.state.value}`}
          onChangeText={this.onChangeText}
          onFocus={this.state.onFocus}
          onBlur={this.state.onBlur}
          underlineColorAndroid={'#d5bc26'}
          ref={(ref) => { this.input = ref; }}
        />
      </View>
    );
  }
}

BeerInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

BeerInput.defaultProps = {
};
