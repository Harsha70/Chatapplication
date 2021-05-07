import React,{useState} from 'react'

import {firestore} from '../../firebase/firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore';

import Room from './Room/Room'

import firebase from '../../firebase/firebase'

const Rooms = (props) => {

    const roomsRef = firestore.collection('rooms')
    const roomsrefcollect = roomsRef.orderBy('createdAt').limit(25);
    const [rooms] = useCollectionData(roomsrefcollect, { idField: 'id' });
    // console.log("rooms", rooms)
    const [selectedroom, setselectedroom] = useState('EHJjafIsOKJPG0yfYYEh')

    const selectRoom = (roomId) => {
        props.selectRoom(roomId)
        setselectedroom(roomId)

    }

    const Addroom = async() => {
        let newgrp = prompt('Add group');
      if (String(newgrp) !== ""){
        await roomsRef.add({
            name: newgrp,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
      }
    }

    return (
        <div>
            <header>
                <h1>rooms</h1>
                <h1 style={{cursor:'pointer'}} onClick={Addroom}>ADD+</h1>
            </header>
            <div>
            {rooms && rooms.map((room)=><Room key={room.id} room={room} selectedroom={selectedroom} selectRoom={selectRoom}/>)}
            </div>
        </div>
    )
}

export default Rooms
