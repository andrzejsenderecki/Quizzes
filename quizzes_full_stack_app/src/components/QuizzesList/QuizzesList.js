import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTests, getOneTest, getAllUsersAnswers } from './configureRedux/apiRequest';
import styled from 'styled-components';
import BasicLink from '../BasicLink/BasicLink';
import Loading from '../Loading/Loading';
import Logo from '../Logo/Logo';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  
  a {
    margin: 20px 0;
  }

  @media(min-width: 768px) {
    flex-direction: row;
    
    a {
      margin: 30px 10px;
    }
  }
`;

const SubtitleA = styled.p`
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  color: #0770ab;

  span {
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    font-size: 45px;
  }

  @media(min-width: 1500px) {
    font-size: 60px;
  }
`;

const SubtitleB = styled.p`
  margin: 10px 0 30px 0;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: #0770ab;

  span {
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    margin-bottom: 20px;
  }

  @media(min-width: 1500px) {
    font-size: 40px;
  }
`;

const QuizzesList = (props) => {
  const { quizzesListReducer, getOneTest } = props;
  const quizzes = quizzesListReducer.quizzes; 

  useEffect(() => {
    if(!quizzes) {
        props.getAllTests();
        props.getAllUsersAnswers();
    }
  });

  return (
    <Container>
      <Logo />
      <SubtitleA>90 sekund, <span>6 pytań</span></SubtitleA>
      <SubtitleB><span>Podejmij</span> wyzwanie!</SubtitleB>
      <ButtonContainer>
        { quizzes ? quizzes.map(quiz =>
          <BasicLink onClick={() => getOneTest(quiz.id)} to={`/quiz/${quiz.id}`} key={quiz.id} textLink={quiz.name} />
          ) : <Loading />
        }
      </ButtonContainer>
    </Container>
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