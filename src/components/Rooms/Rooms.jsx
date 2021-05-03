import React from 'react'

import {firestore} from '../../firebase/firebase'

import { useCollectionData } from 'react-firebase-hooks/firestore';

import Room from './Room/Room'

const Rooms = (props) => {

    const roomsRef = firestore.collection('rooms');
    const [rooms] = useCollectionData(roomsRef, { idField: 'id' });
    console.log("rooms", rooms)

    const selectRoom = (roomId) => {
        props.selectRoom(roomId)
    }

    return (
        <div>
            <header>
                rooms
            </header>
            <div>
            {rooms && rooms.map((room)=><Room key={room.id} room={room} selectRoom={selectRoom}/>)}
            </div>
        </div>
    )
}

export default Rooms
