import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from './components/Questions/Questions';
import QuizWasSolved from '../../components/QuizWasSolved/QuizWasSolved';
import { withCookies } from 'react-cookie';

const Quiz = props => {
  const { cookies, match, history } = props;
  const quizWasSolvedId = match.params.id;
  const isQuizWasSolvedCookie = cookies.get(`quizWasSolved_${quizWasSolvedId}`);

  return (    
    isQuizWasSolvedCookie && isQuizWasSolvedCookie === quizWasSolvedId ? <QuizWasSolved history={history} /> : <Questions {...props} />   
  )
}

const mapStateToProps = state => {
  return state;
}

Quiz.propTypes = {
    cookies: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
  };  

export default withCookies(connect(mapStateToProps, {})(Quiz));