import React, { useRef, useEffect } from 'react'
import './ChatDetail.css'
import MessagesList from '../MessagesList/MessagesList'
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage'

 const ChatDetail = ({ chatDetail, createNewMessage, onBack }) => {
    if (!chatDetail) {
        return (
            <div>
                <h2>Cargando chat...</h2>
            </div>
        )
    }

    const messagesRef = useRef(null);

    useEffect(() => {
        if (!messagesRef.current) return;
        // Scroll to bottom when messages length changes
        messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
    }, [chatDetail.messages?.length]);
    return (
        <div className='full-chat-detail'>
            <div className='chat-detail-header'>
                <h2>{chatDetail?.name}</h2>
            </div>

            <div className='chat-detail-messages' ref={messagesRef}>
                <MessagesList messages={chatDetail.messages} />
            </div>

            <div className='new-message-input'>
                <CreateNewMessage createNewMessage={createNewMessage} />
            </div>
        </div>
    )
}

export default ChatDetail