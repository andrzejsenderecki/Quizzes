import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { quizData } from './reducer';

// this reducer will be developed, therefore rootReducer is here
const rootReducer = combineReducers({
  quizData
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;