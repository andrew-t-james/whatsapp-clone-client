import gql from 'graphql-tag'
import React, { useCallback, useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import ChatRoomNavbar from './ChatRoomNavbar'
import MessageInput from './MessageInput'
import MessagesList from './MessagesList'
import { History } from 'history'

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`

interface ChatRoomScreenParams {
  chatId: string
  history: History
}

export interface ChatQueryMessage {
  id: string
  content: string
  createdAt: Date
}

export interface ChatQueryResult {
  id: string
  name: string
  picture: string
  messages: Array<ChatQueryMessage>
}

type OptionalChatQueryResult = ChatQueryResult | null

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  history,
  chatId
}) => {
  const [chat, setChat] = useState<OptionalChatQueryResult>(null)

  const client = useApolloClient()
  const { data } = useQuery<{ chat: ChatQueryResult }>(getChatQuery, {
    variables: { chatId }
  })

  useEffect(() => {
    let current = true
    if (current && data) {
      setChat(data.chat)
    }
    return (): void => {
      current = false
    }
  })

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat'
      }

      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message)
          }
        }
      })
    },
    [chat, chatId, client]
  )

  if (!chat) return null

  return (
    <Container>
      <ChatRoomNavbar chat={chat} history={history} />
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  )
}

export default ChatRoomScreen
