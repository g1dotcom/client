import React, { useEffect, useState } from 'react'

const Chat = ({socket, room , username}) => {

  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket.on('messageReturn', (data) => {
      setMessageList((prev) => [...prev, data])
    })
  }, [socket])

  const sendMessage = async() => {
    const messageContent = {  
      username: username,
      message: message,
      room: room,
      date: (new Date(Date.now)).getHours() + '.' + (new Date(Date.now)).getMinutes() + '.' + (new Date(Date.now)).getSeconds() 
   
  }
  await socket.emit('message', messageContent)
  setMessageList((prev) => [...prev, messageContent])
  setMessage('')
  }

  console.log(messageList)

  return (
    <div className='flex items-center justify-center h-full'>

      <div className="w-1/3 h-[600px] bg-white relative">
      <div className="w-full h-16 bg-gray-700 flex items-center p-2">
        <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {
            messageList && messageList.map((msg, i ) => (
              <div key={i} className={`${username === msg.username ? `flex justify-end` : ``}`}>
              <div className={`${username === msg.username ? "bg-green-500" : "bg-blue-500"} w-2/3 h-14 p-2 bg-green-600 text-white text-sm m-2 rounded-xl rounded-br-none`}>
                          <div>{msg.message}</div>
                             <div className="w-full flex justify-end text-xs">{msg.username}</div>
                 
                      </div>
              </div>
            ))
          }
         
          
   
      



          </div>
     
      <div className="absolute bottom-0 left-0 w-full">
        <input
        value={message}
        onChange={e => setMessage(e.target.value)}
         className='w-3/4 h-12 border p-3 outline-none'
          type="text"
          placeholder='message send'
         
        />
        <button onClick={sendMessage} className='w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70'>SEND</button>
      </div>
      </div>
    </div>
  )
}

export default Chat