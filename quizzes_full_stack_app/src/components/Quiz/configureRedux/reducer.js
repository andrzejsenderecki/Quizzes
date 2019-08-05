import { SEND_ANSWER } from './action';

export const getAnswer = (answer,answer_id) => {
  return {
    type: SEND_ANSWER,
    payload: answer,
    answer_id: answer_id
  }
}

export const answerReducer = (state = [], action) => {
  const answer = `answer_${action.answer_id}`;

  switch(action.type) {
    case SEND_ANSWER: {
      return {
        ...state,    
        [answer]: {answer: action.payload, answer_id: action.answer_id}
      }
    }
    default: return state
  }
}