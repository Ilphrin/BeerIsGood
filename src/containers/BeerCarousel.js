import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import CameraContainer from './CameraContainer';

export default class BeerCarousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  onPictureTaken = (uri) => {
    const length = this.state.data.length;

    if (length < this.props.max) {
      this.setState(prevState => ({
        data: [...prevState.data, uri]
      }));
      this.props.onChange(this.state.data);
    }
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: item }}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 20 }}>
          <Carousel
            data={this.state.data}
            layout="default"
            renderItem={this.renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={200}
            windowSize={3}
          />
        </View>
        {!this.props.immutable && (
          <View style={{marginVertical: 20}}>
            <CameraContainer onPictureTaken={this.onPictureTaken} />
          </View>
        )}
      </View>
    );
  }
}

BeerCarousel.propTypes = {
  onChange: PropTypes.func,
  max: PropTypes.number,
};

BeerCarousel.defaultProps = {
  max: 3,
  data: [],
};
