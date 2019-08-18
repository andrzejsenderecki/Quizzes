import { GET_QUIZ, GET_QUIZZES, GET_USERS_ANSWERS } from './actions';

export const quizData = (state = {}, action) => {
  switch (action.type) {
    case GET_QUIZ:
      return {
        ...state, currentQuizQuestions: action.payload
      }
    case GET_QUIZZES:
      return {
        ...state, allQuizzesList: action.payload
      }
    case GET_USERS_ANSWERS:
      return {
        ...state, otherUsersAnswersFromAllQuizzes: action.payload
      }  
    default: return state;
  }  
}