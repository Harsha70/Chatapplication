import React from 'react'
import "./Room.css"

const Room = ({room, selectRoom}) => {
    const roomName = room.name
    const roomId = room.id
    const selected = 'selected'
    return (
        <div>
            <p className={`eachroom ${selected}`} onClick={()=>selectRoom(roomId)}>
                {roomName}
            </p>
        </div>
    )
}

export default Room
