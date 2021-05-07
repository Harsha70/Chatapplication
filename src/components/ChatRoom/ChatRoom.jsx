import React, { useRef, useState } from 'react'; 
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {auth, firestore} from '../../firebase/firebase'
import firebase from '../../firebase/firebase'

import ChatMessage from './ChatMessage/ChatMessage'

import UseStorage from '../useStorage/UseStorage'

import "./ChatRoom.css"

export default function ChatRoom({roomId}) {
    const dummy = useRef();
    const messagesRef = roomId !== "" ? firestore.collection(`/rooms/${roomId}/messages/`) 
    : firestore.collection(`/rooms/EHJjafIsOKJPG0yfYYEh/messages/`);
    
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
    console.log("messages", messages)
  
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

    const [error, seterror] = useState(null)

    const types = ["image/png", "image/jpeg", "image/jpg"]

    const changehandler = async (event) => {
      const selected= event.target.files[0]
      if (selected && types.includes(selected.type)){
          seterror("")
          const {url, progress} = UseStorage(selected, auth, roomId) // taken from flickgram and converted to normal function from custom hooks
        console.log(url, progress)
        }else{
          seterror("Please select image of type (png or jpeg)")
          window.alert(error)
      }
  }
  
    return (<>
      <main style={{margin:'0px'}}>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} roomId={roomId}/>)}
  
        <span ref={dummy}></span>
  
      </main>
  
      <form onSubmit={sendMessage}>
        <div className="attach-emoji">
            <span>😃</span>
            <label><input type="file" style={{opacity:0}} onChange ={changehandler} /><span> 📎 </span></label>
        </div>
          
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>🕊️</button>
  
      </form>
    </>)
  }