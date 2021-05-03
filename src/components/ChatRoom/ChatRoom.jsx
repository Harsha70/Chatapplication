import React, { useRef, useState } from 'react'; 
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, firestore} from '../../firebase/firebase'
import firebase from '../../firebase/firebase'

import ChatMessage from './ChatMessage/ChatMessage'

import "./ChatRoom.css"

export default function ChatRoom({roomId}) {
    const dummy = useRef();
    const messagesRef = roomId !== "" ? firestore.collection(`/rooms/${roomId}/messages/`) 
    : firestore.collection(`/rooms/vNX0WKovkml8DqfOiu8U/messages/`);
    
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault(); // default to refresh the page
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
  
      </main>
  
      <form onSubmit={sendMessage}>
        <div className="attach-emoji">
            <span>😃</span>
            <label><input type="file" style={{opacity:0}}/><span> 📎 </span></label>
        </div>
          
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>🕊️</button>
  
      </form>
    </>)
  }