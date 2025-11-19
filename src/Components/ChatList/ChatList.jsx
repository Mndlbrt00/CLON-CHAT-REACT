import React, { useEffect } from "react";
import { getContacts } from "../../services/contactService";
import { useState } from "react";
import { Link } from "react-router";
import './ChatList.css'

const ChatList = ({contacts}) => {
    
  return (
    <div className="chat_list_container">
      <h2>Lista de Chats</h2>
      {contacts.map(
        (contact) => {
          return (
            <Link to={'/chat/' + contact.id} key={contact.id} className="chat_link">
              <img className="profile_picture" src={contact.profile_picture} alt={'Foto de ' + contact.name}/>
              <h2 className="profile_name">{contact.name}</h2>
              <span className="last_connection">{contact.last_connection}</span>
            </Link>
            )
          }
        )
      }
    </div>  
  )
}



export default ChatList