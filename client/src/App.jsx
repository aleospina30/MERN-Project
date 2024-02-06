import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";



const client = new ApolloClient({
  uri: "https://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:id" element={<ProjectDetails/>}/>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
  );
}
export default App;
