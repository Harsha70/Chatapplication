import React from 'react'
import {auth} from '../../../firebase/firebase'

import './ChatMessage.css'
import {firestore} from '../../../firebase/firebase'

export default function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const roomId = props.roomId
    const msgId = props.message.id
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    const editmsgRef = roomId ? firestore.collection(`rooms/${roomId}/messages`):firestore.collection(`rooms/EHJjafIsOKJPG0yfYYEh/messages`)
    // console.log("roomId", roomId) // null ?
    const onEdit = () => {
      let edit = prompt('Edit Message');
      if (String(edit) !== "" && edit !== null){
        editmsgRef.doc(msgId).update({
          text: edit
        });
    }
  }
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || `https://avatars.dicebear.com/api/bottts/${uid}.svg`} alt="pic"/>
        {props.message.url? 
        <img className={"chat-img"} src={props.message.url} alt="Img"/> 
        :<p>{text} {messageClass==="sent"?<span className="hideedit" onClick={() => onEdit()}>✏️</span>:null}</p>}
      </div>
    </>)
  }