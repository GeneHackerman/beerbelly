// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SearchBreweries from './pages/SearchedBreweries';
// import SavedBreweries from './pages/SavedBreweries';
// import Navbar from './components/Navbar';
// function App() {
//   return (
//     <Router>
//       <>
//         <Navbar />
//         <Switch>
//           <Route exact path='/' component={SearchBreweries} />
//           <Route exact path='/saved' component={SavedBreweries} />
//           <Route render={() => <h1 className='display-2'>Ops! Wrong page!</h1>} />
//         </Switch>
//       </>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBreweries from './pages/SearchedBreweries';
import SavedBreweries from './pages/SavedBreweries';
import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBreweries} />
            <Route exact path="/saved" component={SavedBreweries} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;



