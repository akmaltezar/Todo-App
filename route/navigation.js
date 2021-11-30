import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Splashscreen from '../pages/splashscreen';
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import Notes from '../notes/notes';
import Notepage from '../notes/notepage';
import Profil from '../pages/profil';
import About from '../pages/about';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splashscreen"
            component={Splashscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notes"
            component={Notes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Bottom}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notepage"
            component={Notepage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

class Bottom extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Notes"
          component={Notes}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="notebook"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Homes"
          component={Home}
          style={{}}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="pen" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          style={{}}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="info-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
