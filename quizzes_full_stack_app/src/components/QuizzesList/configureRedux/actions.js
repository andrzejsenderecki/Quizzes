export const GET_QUIZZES = 'GET_QUIZZES';
export const GET_QUIZ = 'GET_QUIZ';
export const GET_USERS_ANSWERS = 'GET_USERS_ANSWERS';

export function getQuizzes(data) {
  return {
    type: GET_QUIZZES,
    payload: data
  }
}

export const getQuiz = data => {
  return {
    type: GET_QUIZ,
    payload: data
  }
}

export const getUsersAnswersAction = data => {
  return {
    type: GET_USERS_ANSWERS,
    payload: data
  }
}