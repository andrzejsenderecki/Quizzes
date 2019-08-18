import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CookiesProvider } from 'react-cookie';
import { quizData } from './components/QuizzesList/configureRedux/reducer';
import { currentQuizAnswers } from './components/Quiz/configureRedux/reducer';

const rootReducer = combineReducers({
  quizData,
  currentQuizAnswers
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <CookiesProvider>
      <Provider store={store}>
          <App />
      </Provider>
  </CookiesProvider>,
document.getElementById('root'));