import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


 const client = new ApolloClient({
  uri: 'https://localhost:4000',
  cache: new InMemoryCache()
})

function App() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
        <Routes>
        <Route></Route>
        </Routes>
        </BrowserRouter>
      </ApolloProvider>
    )
  }

export default App

