import React from 'react'
import styled from 'styled-components/macro'
import ChatsNavbar from './ChatListNavbar'
import ChatsList from './ChatList'
import { History } from 'history'

const Container = styled.div`
  height: 100vh;
`

interface ChatsListScreenProps {
  history: History
}

const ChatsListScreen: React.FC<ChatsListScreenProps> = ({
  history
}: {
  history: History
}) => (
  <Container>
    <ChatsNavbar />
    <ChatsList history={history} />
  </Container>
)

export default ChatsListScreen
