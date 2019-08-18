import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTests, getOneTest, getAllUsersAnswers } from './configureRedux/apiRequest';
import { ContainerStyled, ButtonContainerStyled, SubtitleAStyled, SubtitleBStyled } from './QuizzesListStyled';
import BasicLink from '../BasicLink/BasicLink';
import Loading from '../Loading/Loading';
import Logo from '../Logo/Logo';

const QuizzesList = props => {
  const { quizzesListReducer, getOneTest } = props;
  const quizzes = quizzesListReducer.quizzes; 

  useEffect(() => {
    if(!quizzes) {
        props.getAllTests();
        props.getAllUsersAnswers();
    }
  });

  return (
    <ContainerStyled>
      <Logo />
      <SubtitleAStyled>90 sekund, <span>6 pytań</span></SubtitleAStyled>
      <SubtitleBStyled><span>Podejmij</span> wyzwanie!</SubtitleBStyled>
      <ButtonContainerStyled>
        { quizzes ? quizzes.map(quiz =>
          <BasicLink onClick={() => getOneTest(quiz.id)} to={`/quiz/${quiz.id}`} key={quiz.id} textLink={quiz.name} />
          ) : <Loading />
        }
      </ButtonContainerStyled>
    </ContainerStyled>
  )
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  getAllTests: () => dispatch(getAllTests()),
  getOneTest: quizId => dispatch(getOneTest(quizId)),
  getAllUsersAnswers: () => dispatch(getAllUsersAnswers())
});

QuizzesList.propTypes = {
    quizzesListReducer: PropTypes.object,
    getOneTest: PropTypes.func
  };   

export default connect(mapStateToProps, mapDispatchToProps)(QuizzesList);