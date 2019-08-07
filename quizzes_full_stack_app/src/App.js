import React from 'react';
import QuizzesList from './components/QuizzesList/QuizzesList';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={QuizzesList} /> 
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/result/quiz/:id' component={Result} /> 
      </Switch>
    </Router>
  );
}

export default App;