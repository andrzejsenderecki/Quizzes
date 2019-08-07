import { GET_QUIZ, GET_QUIZZES, GET_USERS_ANSWERS } from './actions';

export const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUIZ:
      return {
        ...state, quiz: action.payload
      }
    default: return state;
  }  
}

export const quizzesListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUIZZES:
      return {...state, quizzes: action.payload}
    default: return state;
  } 
}

export const getUsersAnswersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_ANSWERS:
      return {...state, usersAnswers: action.payload}
    default: return state;
  } 
}