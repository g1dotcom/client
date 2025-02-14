import React from 'react'

const Room = ({username,room,setUsername,setRoom, setChatScreen, socket}) => {

  const sendRoom = () => {
    socket.emit("room", room)
    setChatScreen(true)
    }

  return (
    <div className='flex items-center justify-center h-full '>
            <div className="w-1/3 h-[500px] bg-indigo-600 flex flex-col space-y-4 p-3 rounded-xl">
            <h1 className='text-center my-4 font-bold text-2xl'>Welcome To Chat</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} className='h-12 rounded-xl p-3 outline-none' type="text" placeholder='Username' />
            <input  value={room} onChange={e => setRoom(e.target.value)}  className='h-12 rounded-xl p-3 outline-none' type="text" placeholder='Room' />
            <div onClick={sendRoom} className="tracking-wider hover:opacity-50 text-white cursor-pointer bg-indigo-900 border h-12 pt-2 text-xl text-center rounded-lg">CHAT!!!</div>
            </div>
    </div>
  )
}

export default Room