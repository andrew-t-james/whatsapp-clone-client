import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps
} from 'react-router-dom'
import ChatRoomScreen from './components/ChatRoomScreen'
import ChatListScreen from './components/ChatListScreen'
import AnimatedSwitch from './components/AnimatedSwitch'

const redirectToChats = (): JSX.Element => <Redirect to="/chats" />

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AnimatedSwitch>
        <Route exact path="/chats" component={ChatListScreen} />
        <Route
          exact
          path="/chats/:chatId"
          component={({
            match,
            history
          }: RouteComponentProps<{ chatId: string }>): JSX.Element => (
            <ChatRoomScreen chatId={match.params.chatId} history={history} />
          )}
        />
      </AnimatedSwitch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  )
}

export default App
