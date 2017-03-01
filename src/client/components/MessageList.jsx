import React, {Component, PropTypes} from 'react'
import Message from './Message.jsx'

class MessageList extends Component{
    isSelf(message){
        return this.props.username === message.get('user')
    }

    $getMessages(message){
        if (!message || message.size === 0) {
            return (
                <p>还没有消息</p>
            )
        }

        return message.map((message, index) => {
            return (
                <Message key={index} isSelf={this.isSelf(message)} message={message}/>
            )
        })
    }

    render(){
        return (
            <ui className='chat-messages'>
                {this.$getMessages(this.props.messages)}
            </ui>
        )
    }
}

export default MessageList