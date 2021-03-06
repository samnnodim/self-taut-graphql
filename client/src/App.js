import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// APOLLO config
import {
  ApolloClient, gql, graphql, ApolloProvider
} from 'react-apollo';

// GRAPQHL setup
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './data/schema';

//  make a schema & connect it 
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });


// make a client
const client = new ApolloClient({
  networkInterface: mockNetworkInterface
});

// GQL query: get the ChannelsList
const ChannelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsList = ({ data: {loading, error, channels}}) => {
  if (loading) { return <p>Loading ...</p>; }
  if (error) { return <p>{error.message}</p>; }

  return <ul>{ channels.map(ch => <li key={ch.id}>{ch.name}</li>) }</ul>;
}

const ChannelsListWithData = graphql(ChannelsListQuery)(ChannelsList);


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
