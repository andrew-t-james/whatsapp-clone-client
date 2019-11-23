import React from 'react'
import styled from 'styled-components/macro'
import ChatsNavbar from '../ChatListNavbar'
import ChatsList from '../ChatList'

const Container = styled.div`
  height: 100vh;
`

const ChatsListScreen: React.FC = () => (
  <Container>
    <ChatsNavbar />
    <ChatsList />
  </Container>
)

export default ChatsListScreen
