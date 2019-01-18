import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

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

    let index = this.props.index;
    if (index < 0 || index >= this.SRM.length) {
      index = 0;
    }

    this.state = {
      index,
      text: this.generateText(index),
      immutable: this.props.immutable,
      onPress: this.props.onPress,
    };
  }

  changeColor = () => {
    if (!this.state.immutable) {
      let newIndex = this.state.index;
      if (newIndex === this.SRM.length - 1) {
        newIndex = 0;
      }
      else {
        newIndex += 1;
      }
      this.setState({
        index: newIndex,
        text: this.generateText(newIndex),
      });
      this.state.onPress(newIndex);
    }    
  }

  generateText = (index = this.index) => {
    return `${this.SRM[index][1]} - ${this.SRM[index][2]}`;
  }

  render() {
    const changeColorOnClick = () => {
      if (this.state.immutable === false) {
        this.changeColor();
        this.state.onPress(this.state.index);
      }
    }
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.changeColor}>
          <View style={styleBox(this.SRM[this.state.index][0]).box} />
        </TouchableWithoutFeedback>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}

const styleBox = color => StyleSheet.create({
  box: {
    backgroundColor: color,
    width: 120,
    height: 36,
  },
});

const style = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

ColorBox.propTypes = {
  index: PropTypes.number,
  immutable: PropTypes.bool,
  onPress: PropTypes.func,
};

ColorBox.defaultProps = {
  index: 0,
  immutable: false,
  onPress: null,
};

export default ColorBox;
