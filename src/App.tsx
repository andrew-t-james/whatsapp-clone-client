import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
// import ChatRoomScreen from './components/ChatRoomScreen'
import ChatListScreen from './components/ChatListScreen'

const redirectToChats = (): JSX.Element => <Redirect to="/chats" />

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chats" component={ChatListScreen} />
        {/* <Route exact path="/chats/:chatId" component={ChatRoomScreen} /> */}
      </Switch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  )
}

export default App
