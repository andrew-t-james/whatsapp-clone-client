import React from 'react'
import ChatsNavbar from './components/ChatsNavbar'
import ChatsList from './components/ChatList'

const App: React.FC = () => {
  return (
    <div>
      <ChatsNavbar />
      <ChatsList />
    </div>
  )
}

export default App
