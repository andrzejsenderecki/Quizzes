import { getQuizzes, getQuiz, getUsersAnswersAction } from './actions';

export const apiRequest = async () => {
  const response = await fetch('https://quizzes-api.andrewsenderecki.now.sh/', { method: 'GET' });
  const json = await response.json();

  return json;
}

export const getAllTests = () => 
  async(dispatch) => {
    const quizzes = await apiRequest();
    dispatch(getQuizzes(quizzes));
  }

export const apiRequestTest = async (quizId) => {
  const response = await fetch(`https://quizzes-api.andrewsenderecki.now.sh/quiz/${quizId}`, { method: 'GET' });
  const json = await response.json();

  return json;
}

export const getOneTest = (quizId) => 
  async(dispatch) => {
    const quiz = await apiRequestTest(quizId);
    dispatch(getQuiz(quiz));
  }

export const getUsersAnswers = async () => {
  const response = await fetch(`https://quizzes-api.andrewsenderecki.now.sh/users/answers`, { method: 'GET' });
  const json = await response.json();

  return json;
}

export const getAllUsersAnswers = () => 
  async(dispatch) => {
    const quiz = await getUsersAnswers();
    dispatch(getUsersAnswersAction(quiz));
  }