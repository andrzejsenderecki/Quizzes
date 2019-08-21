import { GET_QUIZ, GET_QUIZZES, GET_USERS_ANSWERS, SEND_ANSWER } from './actions';

const initialState = {
  currentQuizAnswers: []
}

export const quizData = (state = initialState, action) => {
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
    case SEND_ANSWER: {
      const answer = `answer_${action.answer_id}`;
      return {
        ...state,    
        currentQuizAnswers: {...state.currentQuizAnswers, [answer]: {answer: action.payload, answer_id: action.answer_id}}
      }
    }  
    default: return state;
  }  
}