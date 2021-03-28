import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Cards from './pages/Cards/Cards';
import CardsAdd from './pages/CardsAdd/CardsAdd';
import CardsEdit from './pages/CardsEdit/CardsEdit';

function App() {
  const isDefaultPath = true

  useEffect(() => {
    localStorage.setItem('cardBrand', 'null')
  }, [])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <main className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
                return (
                  isDefaultPath ?
                  <Redirect to="/cards" /> :
                  <Redirect to="/" /> 
                )
            }}
          />
          <Route exact path="/cards" component={Cards} />
          <Route path='/cards/add' component={CardsAdd} />
          <Route path='/cards/:cardId' component={CardsEdit} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
