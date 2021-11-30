import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.teks}>Special Thanks to : </Text>
        <Text style={styles.teks}>Umi Siti Rochanah </Text>
        <Text style={styles.teks}>Abi Achmad Munasir </Text>
        <Text style={styles.teks}>Mas Faiz Khair Rasyid </Text>
        <Text style={styles.teks}>Mba Nisrina Nur Amalia </Text>
      </View>
    );
  }
}

export default About;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90e0ef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teks: {
    fontSize: 20,
    color: '#0077b6',
    fontFamily: 'Rubik-Regular',
  },
});
