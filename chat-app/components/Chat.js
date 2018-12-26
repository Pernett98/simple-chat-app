import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { openChat, sendMessage } from '../store'

class Chat extends Component {

  constructor(props) {
    super(props)
    this.send = this.send.bind(this)
  }

  componentDidMount() {
    openChat({ user: this.props.user, receiver: this.props.receiver })
  }

  send(message) {
    sendMessage(message.text, this.props.user, this.props.receiver)
  }

  render() {
    return (
      <GiftedChat
        messages={ this.props.messages }
        user={{
          _id: this.props.user.id
        }}
        onSend={ message => this.send(message[0]) }
      />
    )
  }

}

const mapStateToProps = (state, { navigation }) => ({
  messages: state.messages,
  user: state.user,
  receiver: navigation.getParam('receivingUser')
})

export default connect(mapStateToProps)(Chat)