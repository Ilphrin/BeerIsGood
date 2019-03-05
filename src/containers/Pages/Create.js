import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, PermissionsAndroid, Dimensions, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import { FormLabel, FormInput } from 'react-native-elements';
const { Permissions, FileSystem } = Expo;
import Stars from 'react-native-stars';
import BeerCarousel from '../BeerCarousel';
import BeerInput from '../BeerInput';
import CameraContainer from '../CameraContainer';
import AutoComplete from '../AutoComplete';
import sql from '../../models/sqlite';
import primaryButton from '../../StyleSheet/buttons';
import container from '../../StyleSheet/container';
import Button from '../../components/Button';
import ColorBox from '../../components/ColorBox';
import mapPicCarousel from '../../utils/mapPicCarousel';
import { getCorrespondances } from '../../utils/api';
import { strings } from '../../utils/i18n.js';

export default class BeerCreate extends Component {
  constructor(props) {
    super(props);

    this.updateList = this.props.navigation.getParam('updateList');
    const beer = props.navigation.getParam('beer');

    if (beer !== undefined) {
      this.state = {
      hasCameraPermissions: null,
      isUsingCamera: false,
      data: [],
      namePosition: [],
      modify: true,
      nameFocus: false,
      editing: true,
      ...beer,
      };
      this.isNewBeer = false;
    }
    else {
      this.state = {
        name: '',
        brewery: '',
        type: '',
        pic: '',
        picsecond: '',
        picthird: '',
        color: 0,
        ibu: 0,
        alcohol: 0.0,
        stars: 3,
        modify: true,
        nameFocus: false,
        editing: false,
        data: [],
        namePosition: [],
        hasCameraPermissions: null,
        isUsingCamera: false
      };
      this.isNewBeer = true;
    }
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(this.picFolder, { intermediates: true }).catch(e => {
      console.log('Directory already exists');
    });
  }

  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.beer !== undefined) {
      return {
        title: strings('Create.editBeer'),
      };
    }
    return {
      title: strings('Create.createBeer'),
    };
  }

  onChangeValue = (value, name) => {
    let newState = {};
    newState[name] = value;
    if (name === 'name') {
      if (value.length === 0) {
        newState.data = [];
        newState.modify = true;
        this.setState(newState);
      }
      else if (value.length % 3 === 0) {
        getCorrespondances(value).then(data => {
          newState.data = data;
          newState.modify = true;
          this.setState(newState);
        });
      }
    }
    else {
      this.setState(newState);
    }
  }

  onPutBeer = (event) => {
    const newBeer = this.state;
    let sqlite_function = sql.new_beer;
    if (!this.isNewBeer) {
      sqlite_function = sql.update_beer;
    }
    // This is needed for regressions purpose (old variable name for photos)
    if (newBeer.pic === undefined) {
      newBeer.pic = newBeer.photo;
    }
    sqlite_function(sql.db, newBeer, (transaction, result, achievement) => {
      if (achievement !== null) {
        this.updateList(achievement);
      }
      else {
        this.updateList();
      }
      this.props.navigation.goBack();
    });
  }

  onPictureTaken = (uri) => {
    let obj = {
      isUsingCamera: false,
    };
    if (this.state.pic === '') {
      obj.pic = uri;
    }
    else if (this.state.picsecond === '') {
      obj.picsecond = uri;
    }
    else {
      obj.picthird = uri;
    }

    this.setState(obj);
  }

  renderCamera() {
    if (this.state.isUsingCamera) {
      return (
        <CameraContainer
          onPictureTaken={this.onPictureTaken} />
      );
    }
  }

  isUsingCamera = () => {
    this.setState({
      isUsingCamera: !this.state.isUsingCamera
    });
  }

  renderPhotos = () => {
    return (
      <BeerCarousel
        data={mapPicCarousel(this.state.pic, this.state.picsecond, this.state.picthird)}
      />
    );
  }

  nameRenderedCallback = e => {
    this.nameView.measureInWindow((x, y, width, height) => {
      this.setState({
        namePosition: [x, y],
      })
    });
  }

  onSelection = elem => {
    this.setState({
      name: elem.name,
      ibu: elem.ibu,
      alcohol: elem.alcohol,
      data: [],
      modify: false,
    });
  }

  render() {
    let camera = this.renderCamera();
    return (
      <View style={styles.container}>
        {camera}
        <ScrollView>
          <View ref={ref => this.nameView = ref} onLayout={this.nameRenderedCallback}>
            <BeerInput
              value={this.state.name}
              onChangeText={this.onChangeValue}
              label={strings('Beer.name')}
              name="name"
              modify={this.state.modify}
            />
          </View>
          {this.state.data.length > 0 && !this.state.editing &&
            <AutoComplete
              data={this.state.data}
              position={this.state.namePosition}
              onSelection={this.onSelection}
              style={styles.autocomplete}
            />
          }

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <FormLabel>
                {strings('Beer.srm')}
              </FormLabel>
              <View style={{marginLeft: 20, marginTop: 5, marginBottom: 10}}>
                <ColorBox onPress={this.onChangeValue} index={this.state.color} />
              </View>
            </View>

            <View style={{maxWidth: '30%'}}>
              <BeerInput
                value={this.state.ibu}
                onChangeText={this.onChangeValue}
                label={strings('Beer.ibu')}
                name="ibu"
                modify={this.state.modify}
              />
            </View>

            <View style={{maxWidth: '30%'}}>
              <BeerInput
                value={this.state.alcohol}
                onChangeText={this.onChangeValue}
                label={strings('Beer.alcohol')}
                name="alcohol"
                modify={this.state.modify}
              />
            </View>
          </View>

          <BeerInput
            value={this.state.brewery}
            onChangeText={this.onChangeValue}
            label={strings('Beer.brewery')}
            name="brewery"
            modify={this.state.modify}
          />

          <BeerInput
            value={this.state.type}
            onChangeText={this.onChangeValue}
            label={strings('Beer.type')}
            name="type"
            modify={this.state.modify}
          />

          <View style={{marginBottom: 20, marginTop: 20}}>
            <Stars
              default={this.state.stars}
              spacing={12}
              count={5}
              starSize={18}
              emptyStar={require('../../../assets/icons/emptyStar.png')}
              backingColor={"#EAEADF"}
              update={(val) => { this.setState({ stars: val }) }}
            />
          </View>

          {this.state.picthird === '' && (
            <Button
              onPress={this.isUsingCamera}
              style={styles.picButton}
              text={strings('Create.newPhoto')}
            />
          )}
          {this.renderPhotos()}
        </ScrollView>
        <Button
          onPress={this.onPutBeer}
          text={strings('Create.finish')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container,
  beerImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  finishButton: primaryButton,
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  picButton: {
    marginBottom: 20,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  multipleColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  autocomplete: {
    marginLeft: 20,
    marginRight: 20,
  }
});

BeerCreate.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  })
};
