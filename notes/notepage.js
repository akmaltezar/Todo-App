import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Notepage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      modal: false,
      id: '',
      title: '',
      note: '',
      token: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({
            token: value,
            title: this.props.route.params.title,
            note: this.props.route.params.note,
            id: this.props.route.params.id,
          });
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .then(() => this.getTodo())
      .catch(err => {
        console.log(err);
      });
  }
  getTodo() {
    fetch('https://api-todoapp-pp.herokuapp.com/api/todo', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({data: responseJson.data});
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }
  editTodo() {
    this.setState({loading: true});
    const {title, note} = this.state;

    const noteToSend = {
      title: title,
      note: note,
    };
    fetch(`https://api-todoapp-pp.herokuapp.com/api/todo/${this.state.id}`, {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(noteToSend),
      headers: {
        Authorization: `bearer  ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.props.navigation.replace('Home');
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({loading: false}));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Edit Task </Text>
        <View style={styles.box}>
          <TextInput
            onChangeText={title => this.setState({title})}
            value={this.state.title}
            multiline={true}
            placeholder="Title :"
            color="#0077b6"
          />
          <TextInput
            onChangeText={note => this.setState({note})}
            value={this.state.note}
            multiline={true}
            placeholder="Notes :"
            color="#0077b6"
          />
        </View>
        <TouchableOpacity onPress={() => this.editTodo()} style={styles.button}>
          {this.state.loading ? (
            <ActivityIndicator size={20} color={'white'} />
          ) : (
            <MaterialCommunityIcons name="pen" size={25} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
export default Notepage;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    color: '#0077b6',
    fontSize: 24,
    marginBottom: 15,
  },
  box: {
    width: 360,
    height: 220,
    backgroundColor: '#90e0ef',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077b6',
    width: 150,
    height: 50,
    borderRadius: 10,
    elevation: 15,
  },
});
