import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class BeerCarousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.length !== this.state.data.length) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  _renderItem({ item }) {
    return (
      <View>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: item.illustration }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginBottom: 20 }}>
        <Carousel
          data={this.state.data}
          layout="default"
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={200}
          windowSize={3}
          ref={(c) => { this.carousel = c; }}
        />
      </View>
    );
  }
}

BeerCarousel.propTypes = {
  data: PropTypes.array,
};

BeerCarousel.defaultProps = {
  data: [],
};
