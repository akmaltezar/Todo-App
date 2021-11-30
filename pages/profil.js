import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: '',
      title: '',
      note: '',
      token: '',
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    fetch('https://api-todoapp-pp.herokuapp.com/api/auth/logout', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.props.navigation.replace('Login');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  WarningLogout = () =>
    Alert.alert('Logout', ' Are you sure you want to logout?', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => this.logout(),
      },
    ]);

  render() {
    return (
      <View style={styles.safeArea}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('About')}>
          <Image
            source={require('../assets/notebook.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Todo v.1.0</Text>
        <Text style={styles.text}>Copyright©2021 </Text>
        <Text style={styles.text}> Akmal Tezar </Text>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => this.WarningLogout()}>
          <View>
            <Text style={styles.teks}> Logout </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profil;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90e0ef',
  },
  icon: {
    width: 120,
    height: 120,
  },
  text: {
    fontSize: 15,
  },
  teks: {
    fontSize: 17,
  },
  touch: {
    marginTop: 300,
    backgroundColor: '#0077b6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 15,
    width: 150,
    height: 50,
  },
});
