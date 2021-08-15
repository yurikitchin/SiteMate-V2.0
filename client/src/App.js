import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './pages/LandingPage/Landing';
import Home from './pages/HomePage/Home';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
             <Route exact path="/">
              <Landing />
            </Route>
            {/* <Route exact path="/signup">
              <SignUp />
            </Route> */}
            <Route exact path="/home">
              <Home />
            </Route>
            {/* <Route exact path="/employees">
              <Employees />
            </Route>
            <Route exact path="/sites">
              <Sites />
            </Route>
            <Route exact path="/Roster">
              <Roster />
              </Route>
            <Route exact path="/employeeRoster">
              <employeeRoster />
            </Route> */}
        </Router>
    </ApolloProvider>
  );
}

export default App;
