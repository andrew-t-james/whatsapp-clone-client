import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { MockLink } from 'apollo-link-mock'

export const mockApolloClient = (mocks: []): object => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks)
  })
}
