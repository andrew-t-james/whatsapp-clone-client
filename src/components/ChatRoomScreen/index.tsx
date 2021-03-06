import gql from 'graphql-tag'
import React, { useCallback, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
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

const addMessageMutation = gql`
  mutation AddMessage($chatId: ID!, $content: String!) {
    addMessage(chatId: $chatId, content: $content) {
      id
      content
      createdAt
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

  const { data } = useQuery<{ chat: ChatQueryResult }>(getChatQuery, {
    variables: { chatId }
  })

  const [addMessage] = useMutation(addMessageMutation)

  useEffect(() => {
    let current = true
    if (current && data) {
      setChat(data.chat)
    }
    return (): void => {
      current = false
    }
  }, [data])

  const onSendMessage = useCallback(
    (content: string) => {
      addMessage({
        variables: { chatId, content },
        optimisticResponse: {
          __typename: 'Mutation',
          addMessage: {
            __typename: 'Message',
            id: Math.random()
              .toString(36)
              .substr(2, 9),
            createdAt: new Date(),
            content
          }
        },
        update: (client, { data }) => {
          if (data && data.addMessage) {
            client.writeQuery({
              query: getChatQuery,
              variables: { chatId },
              data: {
                chat: {
                  ...chat,
                  messages: chat && chat.messages.concat(data.addMessage)
                }
              }
            })
          }
        }
      })
    },
    [chat, chatId, addMessage]
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
