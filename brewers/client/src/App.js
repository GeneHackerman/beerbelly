import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchDrinks from './pages/SearchDrinks';
import SavedDrinks from './pages/SavedDrinks';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchDrinks} />
          <Route exact path='/saved' component={SavedDrinks} />
          <Route render={() => <h1 className='display-2'>Ops! Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;

