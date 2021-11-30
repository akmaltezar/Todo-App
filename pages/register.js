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

class Register extends Component {
  state = {
    mata: true,
    mata2: true,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    loading: false,
  };

  register() {
    this.setState({loading: true});
    const {name, email, password, password_confirmation} = this.state;

    const dataToSend = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    fetch('https://api-todoapp-pp.herokuapp.com/api/auth/register', {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // this.props.navigation.navigate('Login')
        if (name === '') {
          alert('Please input your name');
        } else if (
          this.state.email.split('@')[1] !== 'gmail.com' &&
          this.state.email.split('@')[1] !== 'email.com'
        ) {
          alert('Incorrect Email');
        } else if (this.state.password.length < 6) {
          alert('Password must be at least 6 characters');
        } else if (this.state.password !== this.state.password_confirmation) {
          alert('Incorrect Password');
        } else {
          // alert('nah gitu dong dari tadi');
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}> Join Us ! </Text>
        <View style={styles.bungkus}>
          <MaterialCommunityIcons name="account" size={25} />
          <TextInput
            placeholder="Username"
            style={styles.name}
            onChangeText={name => this.setState({name})}
          />
        </View>
        <View style={styles.bungkus2}>
          <MaterialCommunityIcons name="email" size={24} />
          <TextInput
            placeholder="Email"
            style={styles.email}
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={styles.bungkus}>
          <MaterialCommunityIcons name="lock" size={25} />
          <TextInput
            placeholder="Password"
            secureTextEntry={this.state.mata}
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity
            style={styles.mata}
            onPressOut={() => this.setState({mata: !this.state.mata})}>
            <MaterialCommunityIcons name="eye" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.bungkus2}>
          <MaterialCommunityIcons name="lock-check" size={25} />
          <TextInput
            placeholder="Password Confirmation"
            secureTextEntry={this.state.mata2}
            onChangeText={password_confirmation =>
              this.setState({password_confirmation})
            }
          />
          <TouchableOpacity
            style={styles.mata2}
            onPressOut={() => this.setState({mata2: !this.state.mata2})}>
            <MaterialCommunityIcons name="eye" size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.register()} style={styles.button}>
          {this.state.loading ? (
            <ActivityIndicator size={20} color={'white'} />
          ) : (
            <Text style={styles.continue}>Next</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.next}> Already have an account ? </Text>
        <Text
          style={styles.next2}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          {' '}
          Just Sign In{' '}
        </Text>
      </View>
    );
  }
}
export default Register;
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
    width: 330,
    height: 55,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 7,
    marginBottom: 25,
    flexDirection: 'row',
    elevation: 15,
  },
  bungkus2: {
    width: 330,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 7,
    marginBottom: 25,
    elevation: 15,
    // },
    // name : {
    //     width : 300,
    //     height : 45,
    //     borderRadius : 25
    // },
    // email : {
    //     width : 300,
    //     height : 45,
    //     borderRadius : 25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077b6',
    width: 200,
    borderRadius: 13,
    height: 45,
    marginBottom: 15,
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
    right: 15,
    width: 25,
    height: 25,
  },
  mata2: {
    position: 'absolute',
    right: 15,
    width: 25,
    height: 25,
  },
});
