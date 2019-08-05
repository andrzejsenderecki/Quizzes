import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';
import BasicLink from '../BasicLink/BasicLink';
import { textHomeLink } from '../../constants';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  a {
      margin: 40px;
  }
`;

const Header = styled.h1`
  margin: 20px;
  font-size: 60px;
  color: #FFFFFF;
  font-weight: 700; 
  text-align: center;

  span {
    color: #0770ab;
  }

  @media(min-width: 1500px) {
    margin: 60px 0 40px 0;
    font-size: 80px;
  }  
`;

const Subtitle = styled.p`
  margin: 15px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  color: #0770ab;

  span {
    font-size: 35px;
    font-weight: 600;
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    font-size: 20px;

    span {
      font-size: 30px;
    }
  }  

  @media(min-width: 1500px) {
    font-size: 30px;

    span {
      font-size: 40px;
    }
  }  
`;

const ResultText = styled.p`
  margin: 30px 15px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;

  @media(min-width: 1500px) {
    font-size: 60px;
  }
`;

class Result extends React.Component {
  componentWillMount() {
      this.checkQuizResult();
  }

  componentDidMount() {
    const { cookies, match } = this.props;
    const quizWasSolvedId = match.params.id;
    const isQuizWasSolvedCookie = cookies.get(`quizWasSolved_${match.params.id}`);

    if(!isQuizWasSolvedCookie) {
      cookies.set(`quizWasSolved_${quizWasSolvedId}`, quizWasSolvedId);
    }
  }

  othersUsersAnswers = () => {
    const { getUsersAnswersReducer, match } = this.props;
    let otherUsersAnswers;
    let allUsersQuizPassed = 0;
    let allUsersQuizFailed = 0;

    if(getUsersAnswersReducer && getUsersAnswersReducer.usersAnswers) {
      otherUsersAnswers = getUsersAnswersReducer.usersAnswers.filter(answer => {
      return answer.quizId === Number(match.params.id);
    })};

    if(otherUsersAnswers) {
      otherUsersAnswers.map((answer) => {
        answer.result === 1 ? allUsersQuizPassed += 1 : allUsersQuizFailed += 1;
        return null;
      });
    }

    this.setState({
      allUsersQuizPassed: allUsersQuizPassed,
      allUsersQuizFailed: allUsersQuizFailed
    }); 
  }

  sendResultToDataBase = () => {
    const { match } = this.props;
    const { goodAnswers, badAnswers, quizPassed } = this.state;

    const goodAnswersCount = goodAnswers.length;
    const badAnswersCount = badAnswers.length;
    const quizResult = quizPassed ? '1' : '0';
    const quizId = match.params.id;

    fetch(`http://localhost:7000/result/quiz/${quizId}?goodAnswers=${goodAnswersCount}&badAnswers=${badAnswersCount}&result=${quizResult}&quizId=${quizId}`).then(response => {
        response.json();
    });
  }

  checkQuizResult = () => {
    const { quizReducer, answerReducer } = this.props;
    let goodAnswers = [];
    let badAnswers = [];
    let quizPassed;
    const requiredCorrectAnswers = quizReducer && quizReducer.quiz ? quizReducer.quiz.length * 0.5 : '';
    this.othersUsersAnswers();

    Object.values(answerReducer).map((answer,index) => {
      return answer.answer === quizReducer.quiz[index].correct_answer ? goodAnswers.push(answer) : badAnswers.push(answer);
    });
    
    quizPassed = goodAnswers.length >= requiredCorrectAnswers ? true : false;
    
    this.setState({
      goodAnswers: goodAnswers,
      badAnswers: badAnswers,
      quizPassed: quizPassed
    }, this.sendResultToDataBase);
  }

  render() {
    const { quizReducer } = this.props;
    const { goodAnswers, badAnswers, quizPassed, allUsersQuizPassed, allUsersQuizFailed } = this.state;

    return (
      <>
        <Container>
          <Header>Wynik <span>quizu</span></Header>
        </Container>
        <Container>
          <Subtitle>Ilość pytań: <span>{quizReducer.quiz.length}</span></Subtitle>
          <Subtitle>Dobre odpowiedzi: <span>{goodAnswers.length}</span></Subtitle>
          <Subtitle>Błędne odpowiedzi: <span>{badAnswers.length}</span></Subtitle>
        </Container>
        <Container>    
          <ResultText>Quiz {quizPassed ? 'zaliczony! Brawo!' : 'niezaliczony'}</ResultText>
        </Container>
        <Container>
          <Subtitle>Osoby które zaliczyły quiz: <span>{allUsersQuizPassed}</span></Subtitle>
          <Subtitle>Osoby które niezaliczyły quizu: <span>{allUsersQuizFailed}</span></Subtitle>
        </Container>
        <Container>
          <BasicLink textLink={textHomeLink} to={`/`} />
        </Container>
      </>    
    )
  }
}

const mapStateToProps = (state) => {
  return state
} 

Result.propTypes = {
    quizQuestion: PropTypes.object
  };   

export default withCookies(connect(mapStateToProps,{})(Result));