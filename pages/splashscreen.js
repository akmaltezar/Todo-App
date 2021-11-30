import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

// useEffect(() => {
//   createChannels()
//   setTimeout(() => {
//     navigation.replace('Home')
//   }, 3000)
// },[])

class Splashscreen extends Component {
  constructor() {
    super();
    this.state = {};
    setTimeout(() => {
      AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          this.props.navigation.replace('Home');
        } else {
          this.props.navigation.replace('Login');
        }
      });
    }, 3000);
    // this.state = {};
    // setTimeout(() => {
    //   this.props.navigation.navigate('Login');
    // }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/9633-loading.json')}
          loop={true}
          autoPlay={true}
        />
      </View>
    );
  }
}

export default Splashscreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#90e0ef',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 100,
  },
});
