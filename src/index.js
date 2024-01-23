import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

//
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink(
    {
      uri: process.env.REACT_APP_GRAPHQL_API,
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_ADMIN_SECRET
      }
    }
  ),
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));