import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom'
import ChatRoomScreen from './components/ChatRoomScreen'
import ChatListScreen from './components/ChatListScreen'

const redirectToChats = (): JSX.Element => <Redirect to="/chats" />

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chats" component={ChatListScreen} />
        <Route
          exact
          path="/chats/:chatId"
          component={({
            match
          }: RouteComponentProps<{ chatId: string }>): JSX.Element => (
            <ChatRoomScreen chatId={match.params.chatId} />
          )}
        />
      </Switch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  )
}

export default App
