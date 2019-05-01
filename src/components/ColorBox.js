import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

class ColorBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.SRM = [
      ['#f8f753', 2, 'Pale lager'],
      ['#f6f513', 3, 'Blonde Ale'],
      ['#ece61a', 4, 'Weissbier'],
      ['#d5bc26', 6, 'IPA'],
      ['#bf923b', 8, 'Saison'],
      ['#bf813a', 10, 'English Bitter'],
      ['#bc6733', 13, 'Double IPA'],
      ['#8d4c32', 17, 'Amber Ale'],
      ['#5d341a', 20, 'Brown Ale'],
      ['#261716', 24, 'Irish Dry Stout'],
      ['#0f0b0a', 29, 'Stout'],
      ['#080707', 35, 'Foreign Stout'],
      ['#030403', 45, 'Imperial Stout'],
    ];
    this.state = {
      value: this.props.value || 0,
      text: this.generateText(this.props.value || 0),
    };
  }

  changeColor = () => {
    if (!this.props.immutable) {
      let newValue = this.state.value;
      if (newValue === this.SRM.length - 1) {
        newValue = 0;
      }
      else {
        newValue += 1;
      }
      this.setState({
        value: newValue,
        text: this.generateText(newValue),
      });
      this.props.onChange(newValue);
    }
  }

  generateText = (value) => {
    return `${this.SRM[value][1]} - ${this.SRM[value][2]}`;
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.changeColor}>
          <View style={styleBox(this.SRM[this.state.value][0]).box} />
        </TouchableWithoutFeedback>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}

const styleBox = color => StyleSheet.create({
  box: {
    backgroundColor: color,
    height: 36,
  },
});

const style = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

ColorBox.propTypes = {
  immutable: PropTypes.bool,
};

ColorBox.defaultProps = {
  immutable: false,
};

export default ColorBox;
