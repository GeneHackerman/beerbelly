import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBreweries from './pages/SearchedBreweries';
import SavedBreweries from './pages/SavedBreweries';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBreweries} />
          <Route exact path='/saved' component={SavedBreweries} />
          <Route render={() => <h1 className='display-2'>Ops! Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;

