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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value && nextProps.modify === false) {
      return {
        value: nextProps.value,
      }
    }
    return null;
  }

  render() {
    const {
      value, label, inputRef, ...rest
    } = this.props;
    return (
      <View>
        <FormLabel>
          {label}
        </FormLabel>
        <FormInput
          value={`${value}`}
          underlineColorAndroid="#d5bc26"
          ref={inputRef}
          {...rest}
        />
      </View>
    );
  }
}

BeerInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

BeerInput.defaultProps = {
};
