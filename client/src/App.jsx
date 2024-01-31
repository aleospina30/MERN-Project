import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {projectModels} from './pages/projectModels';
import { projectModelDetails }   from './pages/projectModelDetails'
 

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/projectModels"/>}/>
        <Route path='/projectModels' element={<projectModels/>}/>
        <Route path='/projectModels/:id' element={<projectModelDetails/>}/>
      </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App