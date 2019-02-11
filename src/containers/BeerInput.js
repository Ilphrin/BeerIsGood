import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class BeerInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onChangeText: this.props.onChangeText,
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
