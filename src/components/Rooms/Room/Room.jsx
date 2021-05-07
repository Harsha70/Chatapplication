import React from 'react'
import "./Room.css"

const Room = ({room, selectRoom, selectedroom}) => {
    const roomName = room.name
    const roomId = room.id
    const selected = selectedroom === room.id ? 'selected' :'notselected'
    return (
        <div>
            <p className={`eachroom ${selected}`} onClick={()=>{selectRoom(roomId)}}>
                {roomName}
            </p>
        </div>
    )
}

export default Room
