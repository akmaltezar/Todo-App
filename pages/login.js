import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Login extends Component {
  state = {
    mata: true,
    email: '',
    password: '',
    loading: false,
  };
  login() {
    this.setState({loading: true});
    const {email, password} = this.state;

    const dataToSend = {
      email: email,
      password: password,
    };
    fetch('https://api-todoapp-pp.herokuapp.com/api/auth/login', {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.token.original.access_token);
        const {role_data} = result;
        if (role_data) {
          AsyncStorage.setItem('token', result.token.original.access_token);
          this.props.navigation.replace('Home');
        } else {
          alert('Incorrect Email or Password');
        }
      })
      .catch(err => {
        console.log(err);
        alert('Incorrect Email or Password');
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}> Welcome ! </Text>
        <View style={styles.bungkus}>
          <MaterialCommunityIcons name="email" size={23} />
          <TextInput
            placeholder="Email"
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={styles.bungkus2}>
          <MaterialCommunityIcons name="lock" size={25} />
          <TextInput
            secureTextEntry={this.state.mata}
            placeholder="Password"
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity
            style={styles.mata}
            onPressOut={() => this.setState({mata: !this.state.mata})}>
            <MaterialCommunityIcons name="eye" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.login()} style={styles.button}>
          {this.state.loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.continue}>Continue</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.next}> Don't have any account ? </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.next2}>Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#90e0ef',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 50,
    marginTop: 50,
  },
  bungkus: {
    flexDirection: 'row',
    width: 330,
    height: 55,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 7,
    marginBottom: 35,
    elevation: 15,
  },
  bungkus2: {
    width: 330,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#ffff',
    borderRadius: 7,
    marginBottom: 35,
    elevation: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077b6',
    width: 200,
    borderRadius: 13,
    height: 45,
    marginBottom: 35,
    elevation: 15,
  },
  continue: {
    fontSize: 18,
    color: '#fff',
  },
  next: {
    fontSize: 15,
    color: '#000',
  },
  next2: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  mata: {
    position: 'absolute',
    right: 20,
    width: 25,
    height: 25,
  },
});
