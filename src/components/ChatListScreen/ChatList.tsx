import React, { useCallback } from 'react'
import moment from 'moment'
import { List, ListItem } from '@material-ui/core'
import styled from 'styled-components/macro'
import { History } from 'history'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Container = styled.div`
  height: calc(100% - 56px);
  overflow-y: overlay;
`

const StyledList = styled(List)`
  padding: 0 !important;
`

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px;
  display: flex;
`

const ChatPicture = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`

const ChatInfo = styled.div`
  width: calc(100% - 60px);
  height: 46px;
  padding: 15px 0;
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`

const ChatName = styled.div`
  margin-top: 5px;
`

const MessageContent = styled.div`
  color: gray;
  font-size: 15px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const MessageDate = styled.div`
  position: absolute;
  color: gray;
  top: 20px;
  right: 0;
  font-size: 13px;
`

export const getChatsQuery = gql`
  query GetChats {
    chats {
      id
      name
      picture
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`

interface Chat {
  id: string
  name: string
  picture: string
  lastMessage: Message
}

interface Message {
  id: string
  content: string
  createdAt: number
}

interface ChatsListProps {
  history: History
}

const ChatsList: React.FC<ChatsListProps> = ({ history }) => {
  const { data } = useQuery<{ chats: Chat[] }>(getChatsQuery)

  const navToChat = useCallback(
    chat => {
      history.push(`chats/${chat.id}`)
    },
    [history]
  )

  if (data === undefined || data.chats === undefined) {
    return null
  }
  const chats = data.chats

  return (
    <Container>
      <StyledList>
        {chats.map((chat: Chat) => (
          <StyledListItem
            key={chat.id}
            button
            data-testid="chat"
            onClick={navToChat.bind(null, chat)}>
            <ChatPicture
              src={chat.picture}
              alt="Profile"
              data-testid="picture"
            />
            <ChatInfo>
              <ChatName data-testid="name">{chat.name}</ChatName>
              {chat.lastMessage && (
                <>
                  <MessageContent data-testid="content">
                    {chat.lastMessage.content}
                  </MessageContent>
                  <MessageDate data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </MessageDate>
                </>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  )
}

export default ChatsList
