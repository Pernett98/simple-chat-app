import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import store from './store'
import Login from './components/Login'
import Users from './components/Users';
import Chat from './components/Chat';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Users: {
      screen: Users
    },
    Chat: {
      screen: Chat
    }
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerTitle: 'Chat!'
    }
  }
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    )
  }

}

export default App

