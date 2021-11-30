import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="trash" size={25} />;

class Notes extends Component {
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
        this.getTodo();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }
  deleteTodo(id) {
    fetch(`https://api-todoapp-pp.herokuapp.com/api/todo/${id}`, {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        Authorization: `bearer ${this.state.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.getTodo();
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
        this.addTodo();
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({loading: false}));
  }
  DelNotes = id =>
    Alert.alert('Delete', 'Are you sure you want to delete this item ?', [
      {
        text: 'Cancel',
        onPress: () => this.props.navigation.navigate('Notes'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => this.deleteTodo(id),
      },
    ]);
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.toptitle}> Todo List</Text>
        </View>
        <ScrollView>
          <View style={styles.box}>
            {this.state.data.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.props.navigation.navigate('Notepage', {
                    id: value.id,
                    title: value.title,
                    note: value.note,
                  });
                }}
                style={styles.catatan}>
                <Text style={styles.title}> {value.title}</Text>
                <Text style={styles.note}> {value.note}</Text>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => this.DelNotes(value.id)}>
                  <Icon>{myIcon}</Icon>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Homes')}
          style={styles.addButton}>
          <Icon name="plus" size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Notes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toptitle: {
    color: '#0077b6',
    fontSize: 24,
    marginTop: 15,
    fontFamily: 'Rubik-Regular',
  },
  box: {
    flexDirection: 'column-reverse',
  },
  icon: {
    marginTop: 20,
    position: 'absolute',
    color: 'red',
    right: 10,
  },
  safeArea: {},
  scrollView: {},
  addButton: {
    backgroundColor: '#0077b6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    borderRadius: 50,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  catatan: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 375,
    fontFamily: 'Rubik-Regular',
    height: 60,
    marginTop: 12,
    backgroundColor: '#90e0ef',
    borderRadius: 15,
  },
  title: {
    fontWeight: 'bold',
    color: '#0077b6',
  },
  note: {
    color: '#0077b6',
  },
});
