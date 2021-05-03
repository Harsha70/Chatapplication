import React from 'react'
import {auth} from '../../../firebase/firebase'

import './ChatMessage.css'

export default function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || `https://avatars.dicebear.com/api/bottts/${uid}.svg`} alt="pic"/>
        <p>{text}</p>
      </div>
    </>)
  }