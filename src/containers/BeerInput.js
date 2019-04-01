import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

export default class BeerInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  onChangeText = (value) => {
    this.setState({
      value,
    });
    this.props.onChangeText(value, this.props.name);
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
    const { onChangeText, onFocus, onBlur, value, label, name, ...rest } = this.props;
    return (
      <View>
        <FormLabel>
          {label}
        </FormLabel>
        <FormInput
          value={`${this.state.value}`}
          onChangeText={this.onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          underlineColorAndroid={'#d5bc26'}
          ref={(ref) => { this.input = ref; }}
          {...rest}
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
