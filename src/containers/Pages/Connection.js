import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import desaturatedAppIcon from '../../../assets/icons/desaturated_beer.png';
import container from '../../StyleSheet/container';
import Button from '../../components/Button';
import { signin, signup } from '../../utils/api';
import Form from '../Form';

class ConnectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: false,
      isSubscribing: false,
    };

    this.fields = [
      {
        label: 'Email',
        name: 'email',
        type: 'Email',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'Password',
      }
    ];
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Connexion',
  })

  onChangeValue = (value, name) => {
    this.setState({
      [name]: value,
    });
  }

  handleConnect = () => {
    this.setState({
      isConnecting: true,
    })
  }

  handleSubscribe = () => {
    this.setState({
      isSubscribing: true,
    });
  }

  submitConnect = (fields) => {
    const { email, password } = fields;
    const { connect } = this.props;
    signin(email, password).then((value) => {
      connect(value);
      this.setState({
        isConnecting: false,
      });
    });
  }

  submitSubscribe = (fields) => {
    const { email, password } = fields;
    signup(email, password).then(() => {
      this.setState({
        isSubscribing: false,
      })
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const { isConnecting, isSubscribing } = this.state;
    const { user } = this.props;
    
    if (!isConnecting && !isSubscribing && !user.email) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <Image source={desaturatedAppIcon} style={styles.image}/>
            <Text>Vous n'etes pas connectey :(</Text>
          </ScrollView>
          <Button
            onPress={this.handleConnect}
            text={"Se connecter"}
            style="secondary" />
          <Button
            onPress={this.handleSubscribe}
            text={"S'inscrire"} />
        </View>
      );
    } else if (isSubscribing || isConnecting) {
      return (
        <Form fields={this.fields} onSubmit={isSubscribing ? this.submitSubscribe : this.submitConnect} />
      );
    }
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 40 }}>Welcome!</Text>
        <Text style={{ fontSize: 30 }}>{user.email}</Text>
        <Text>For now, there's nothing to see here, but stay tuned folks ;)</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container,
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 20,
  }
});

ConnectionPage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
  }),
};

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => {
  return {
    connect: dispatch.user.connect,
  };
};

export default connect(mapState, mapDispatch)(ConnectionPage);
