import {ApolloClient} from 'apollo-client'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {onError} from 'apollo-link-error'
import {ApolloLink} from 'apollo-link'

import {BatchHttpLink} from 'apollo-link-batch-http'
import UserStore from './store/auth'

// const timeoutLink = new ApolloLinkTimeout(15000) // 15 second timeout

const batchLink = new BatchHttpLink({
  uri: process.env.REACT_APP_BASE_URL,
})

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      console.log(JSON.stringify(graphQLErrors, null, 2))
      console.log(networkError)
      if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    setContext((_, {headers}) => {
      const token = UserStore.token
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer:${token}` : '',
        },
      }
    }),
    // timeoutLink,
    batchLink,
  ]),
  cache: new InMemoryCache(),
})
