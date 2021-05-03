import './App.css';

import React, {useState} from 'react'; 
import { useAuthState } from 'react-firebase-hooks/auth';

import Rooms from './components/Rooms/Rooms'
import ChatRoom from './components/ChatRoom/ChatRoom'

import {auth} from './firebase/firebase'
import firebase from './firebase/firebase'

function App() {
  const [roomId, setroomId] = useState("")
  const [user] = useAuthState(auth);
  // console.log("user", user)

  const selectRoom = (roomId) => {
    // console.log("room selected ", roomId)
    setroomId(roomId)
  }

  return (
    <div className="App" style={{display:'grid', gridTemplateColumns:"1fr 2fr"}}>
      <Rooms selectRoom={selectRoom} />
      <div>
        <header>
          <h1>⚛️🔥💬</h1>
          <SignOut />
        </header>

        <section>
          {user ? <ChatRoom roomId={roomId}/> : <SignIn />}
        </section>
      </div>
    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;
