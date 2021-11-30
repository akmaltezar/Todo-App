import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

class Home extends Component {
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
          this.setState({token: value});
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
  addTodo() {
    this.setState({loading: true});
    const {title, note} = this.state;

    const noteToSend = {
      title: title,
      note: note,
    };
    fetch('https://api-todoapp-pp.herokuapp.com/api/todo', {
      method: 'POST',
      body: JSON.stringify(noteToSend),
      redirect: 'follow',
      headers: {
        Authorization: `bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.props.navigation.replace('Home');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }
  // deleteTodo(id) {
  //   fetch(`https://api-todoapp-pp.herokuapp.com/api/todo/${id}`, {
  //     method: 'DELETE',
  //     redirect: 'follow',
  //     headers: {
  //       Authorization: `bearer ${this.state.token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       this.getTodo();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => this.setState({loading: false}));
  // }
  // editTodo() {
  //   this.setState({loading: true});
  //   const {title, note} = this.state;

  //   const noteToSend = {
  //     title: title,
  //     note: note,
  //   };
  //   fetch(`https://api-todoapp-pp.herokuapp.com/api/todo/${this.state.id}`, {
  //     method: 'PUT',
  //     redirect: 'follow',
  //     body: JSON.stringify(noteToSend),
  //     headers: {
  //       Authorization: `bearer  ${this.state.token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson);
  //       this.addTodo();
  //     })
  //     .catch(err => console.log(err))
  //     .finally(() => this.setState({loading: false}));
  // }
  // DelNotes = id =>
  //   Alert.alert('Delete Note', 'Delete this note?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => this.props.navigation.navigate('Home'),
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Ok',
  //       onPress: () => this.deleteTodo(id),
  //     },
  //   ]);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Add Task</Text>
        <View style={styles.box}>
          <TextInput
            onChangeText={title => this.setState({title})}
            multiline={true}
            placeholder="Title :"
          />
          <TextInput
            onChangeText={note => this.setState({note})}
            multiline={true}
            placeholder="Notes :"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.addTodo()}>
          {this.state.loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <MaterialCommunityIcons name="plus" size={32} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Rubik-Regular',
    color: '#0077b6',
    fontSize: 24,
    margin: 15,
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
