import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Mainpage from "./pages/adminmain"
import Editpage from "./pages/edit"
import Createpage from "./pages/create"
import PublicHome from "./pages/publichome"

import PublicPostpage from "./pages/PublicPostpage"











import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          // Don't cache separate results based on
          // any of this field's arguments.
          

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing , incoming) {
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache
});


export interface IApplicationProps{}

const Application: React.FunctionComponent<IApplicationProps>=(props)=>{

return(
<ApolloProvider client={client}>
    <BrowserRouter >
    
        <Routes>
          
          <Route path="/" element={<PublicHome/>}></Route>
            
            <Route path="/admin" element={<Mainpage/>}></Route>
            <Route path="/public/posts" element={<PublicPostpage/>}>
                <Route index element ={<PublicPostpage/>}/>
                <Route path=":number" element={<PublicPostpage/>}/>



            </Route>
            <Route path="/posts/create" element={<Createpage/>}></Route>
            <Route path="/posts/edit" element={<Editpage/>}>
                <Route index element ={<Editpage/>}/>
                <Route path=":number" element={<Editpage/>}/>



            </Route>

            
        </Routes>
        

    
    </BrowserRouter>
    </ApolloProvider>
)

}

export default Application