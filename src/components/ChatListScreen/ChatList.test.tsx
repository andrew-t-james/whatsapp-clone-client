import React from 'react'
import {
  cleanup,
  render,
  fireEvent,
  wait,
  waitForDomChange
} from '@testing-library/react'
import ChatList from './ChatList'
import { createBrowserHistory } from 'history'

describe('ChatsList', () => {
  afterEach(() => {
    delete window.location
    window.location = {
      href: '/'
    }
  })
  test('renders fetched chats data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT')
              }
            }
          ]
        }
      })
    )
    {
      const { container, getByTestId } = render(<ChatList history={history} />)
      await waitForDomChange({ container })
      expect(getByTestId('name')).toHaveTextContent('Foo Bar')
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      )
      expect(getByTestId('content')).toHaveTextContent('Hello')
      expect(getByTestId('date')).toHaveTextContent('18:00')
    }
  })

  test('should navigate to the target chat room on chat item click', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT')
              }
            }
          ]
        }
      })
    )

    const history = createBrowserHistory()

    {
      const { container, getByTestId } = render(<ChatList history={history} />)
      await waitForDomChange({ container })
      fireEvent.click(getByTestId('chat'))
      await wait(() => expect(history.location.pathname).toEqual('/chats/1'))
    }
  })
})
