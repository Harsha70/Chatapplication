import React from 'react'

import {firestore} from '../../firebase/firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore';

import Room from './Room/Room'

import firebase from '../../firebase/firebase'

const Rooms = (props) => {

    const roomsRef = firestore.collection('rooms').orderBy('createdAt');
    const [rooms] = useCollectionData(roomsRef, { idField: 'id' });
    console.log("rooms", rooms)

    const selectRoom = (roomId) => {
        props.selectRoom(roomId)
    }

    const Addroom = () => {
        let newgrp = prompt('Add group');
      if (String(newgrp) !== ""){
        roomsRef.add({
            name: newgrp,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
      }
    }

    return (
        <div>
            <header>
                <h1>rooms</h1>
                <h1 onClick={Addroom}>Add</h1>
            </header>
            <div>
            {rooms && rooms.map((room)=><Room key={room.id} room={room} selectRoom={selectRoom}/>)}
            </div>
        </div>
    )
}

export default Rooms
