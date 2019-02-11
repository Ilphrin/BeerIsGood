import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';


class AutoComplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.styles = props.style;
    this.state = {
      data: [],
    };

    console.log(props.position);
    this.styles = StyleSheet.create({
      container: {
        position: 'absolute',
        width: '90%',
        backgroundColor: '#fff',
        padding: 5,
        top: props.position[1] - 44, // minus header size
        left: 19,
        zIndex: 10,
      },
      elem: {
        paddingBottom: 5,
      },
      text: {
        fontSize: 18,
      },
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data.slice(0, 4),
      };
    }
    return null;
  }

  onPress = elem => {
    this.props.onSelection(elem);
  }

  render() {
    const elems = this.state.data.map(elem => (
      <TouchableWithoutFeedback key={elem.id} onPress={() => {
          this.onPress(elem);
        }}>
        <View style={this.styles.elem}>
          <Text style={this.styles.text}>{elem.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ));
    return (
      <View style={[this.styles.container, this.style]}>
        {elems}
      </View>
    );
  }
}

AutoComplete.propTypes = {
  style: PropTypes.number,
  position: PropTypes.array.isRequired,
};

AutoComplete.defaultProps = {
  style: {},
};

export default AutoComplete;
