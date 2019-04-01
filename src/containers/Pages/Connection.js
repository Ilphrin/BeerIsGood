import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import I18n from '../../utils/i18n';
import BeerInput from '../BeerInput';
import Button from '../../components/Button';
import { signin, signup } from '../../utils/api';

class ConnectionPage extends Component {
  state = {
    email: "",
    password: "",
    isConnecting: false,
    isSubscribing: false,
  };

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

  submitConnect = () => {
    const { email, password } = this.state;
    const { connect } = this.props;
    signin(email, password).then((value) => {
      connect(value);
      this.setState({
        isConnecting: false,
      });
    });
  }

  submitSubscribe = () => {
    const { email, password } = this.state;
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
    return (
      <View>
        {!isConnecting && !isSubscribing && !user.email && (
          <View>
            <Button
              onPress={this.handleConnect}
              text={"Se connecter"} />
            <Button
              onPress={this.handleSubscribe}
              text={"S'inscrire"} />
          </View>
        )}
        {(isSubscribing || isConnecting) && (
          <View>
            <BeerInput
              value={this.state.email}
              onChangeText={this.onChangeValue}
              label={"Email"}
              name="email"
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <BeerInput
              value={this.state.password}
              onChangeText={this.onChangeValue}
              label={"Password"}
              autoComplete="password"
              autoCapitalize="none"
              secureTextEntry
              name="password" />
            <Button
              onPress={isSubscribing ? this.submitSubscribe : this.submitConnect}
              text={isSubscribing ? "Inscription" : "Connexion"}
            />
          </View>
        )}
        {user.email && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 40 }}>Bienvenue!</Text>
          <Text style={{ fontSize: 30 }}>{user.email}</Text>
        </View>
        )}
      </View>
    )
  }
}

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
