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

const ResultItem = styled.p`
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

  othersUsersAnswers = (numberGoodAnswersCurrentUser) => {
    const { getUsersAnswersReducer, match } = this.props;
    let otherUsersAnswers;
    let allUsersQuizPassed = 0;
    let allUsersQuizFailed = 0;

    if(getUsersAnswersReducer && getUsersAnswersReducer.usersAnswers) {
      otherUsersAnswers = getUsersAnswersReducer.usersAnswers.filter(answer => {
      return answer.quizId === Number(match.params.id);
    })};

    let betterAndWorstUsers = {
      betterUsers: 0,
      sameUsers: 0,
      worstUsers: 0
    }
  
    if(otherUsersAnswers) {
      otherUsersAnswers.map((answer) => {
        const goodAnswersCount = answer.goodAnswers;
        
        answer.result === 1 ? allUsersQuizPassed += 1 : allUsersQuizFailed += 1;

        if(goodAnswersCount > numberGoodAnswersCurrentUser) {
          betterAndWorstUsers.betterUsers += 1
        } else if(goodAnswersCount === numberGoodAnswersCurrentUser) {
          betterAndWorstUsers.sameUsers += 1
        } else if(goodAnswersCount < numberGoodAnswersCurrentUser) {
          betterAndWorstUsers.worstUsers += 1
        }
        
        return null;
      });
    }

    this.setState({
      allUsersQuizPassed: allUsersQuizPassed,
      allUsersQuizFailed: allUsersQuizFailed,
      betterAndWorstUsers: betterAndWorstUsers
    }); 
  }

  sendResultToDataBase = () => {
    const { match } = this.props;
    const { goodAnswers, badAnswers, quizPassed } = this.state;
    const goodAnswersCount = goodAnswers.length;
    const badAnswersCount = badAnswers.length;
    const quizResult = quizPassed ? 1 : 0;
    const quizId = match.params.id;

    fetch(`https://quizzes-api.andrewsenderecki.now.sh/result/quiz/${quizId}?goodAnswers=${goodAnswersCount}&badAnswers=${badAnswersCount}&result=${quizResult}&quizId=${quizId}`).then(response => {
        response.json();
    });
  }

  checkQuizResult = () => {
    const { quizReducer, answerReducer } = this.props;
    let goodAnswers = [];
    let badAnswers = [];
    let quizPassed;
    const requiredCorrectAnswers = quizReducer && quizReducer.quiz ? quizReducer.quiz.length * 0.5 : '';

    Object.values(answerReducer).map((answer,index) => {
      return answer.answer === quizReducer.quiz[index].correct_answer ? goodAnswers.push(answer) : badAnswers.push(answer);
    });
    
    quizPassed = goodAnswers.length >= requiredCorrectAnswers ? true : false;

    this.othersUsersAnswers(goodAnswers.length);
    
    this.setState({
      goodAnswers: goodAnswers,
      badAnswers: badAnswers,
      quizPassed: quizPassed
    }, this.sendResultToDataBase);
  }

  render() {
    const { quizReducer } = this.props;
    const { goodAnswers, badAnswers, quizPassed, allUsersQuizPassed, allUsersQuizFailed, betterAndWorstUsers } = this.state;
    
    return (
      <>
        <Container>
          <Header>Wynik <span>quizu</span></Header>
        </Container>
        <Container>
          <ResultItem>Ilość pytań: <span>{quizReducer.quiz.length}</span></ResultItem>
          <ResultItem>Dobre odpowiedzi: <span>{goodAnswers.length}</span></ResultItem>
          <ResultItem>Błędne odpowiedzi: <span>{badAnswers.length}</span></ResultItem>
        </Container>
        <Container>    
          <ResultText>Quiz {quizPassed ? 'zaliczony! Brawo!' : 'niezaliczony. Spróbuj ponownie za jakiś czas.'}</ResultText>
        </Container>
        <Container>
          <ResultItem>Osoby które zaliczyły quiz: <span>{allUsersQuizPassed}</span></ResultItem>
          <ResultItem>Osoby które niezaliczyły quizu: <span>{allUsersQuizFailed}</span></ResultItem>
        </Container>
        <Container>
          <ResultItem>Ilość osób z lepszym wynikiem od Twojego: <span>{betterAndWorstUsers.betterUsers}</span></ResultItem>
          <ResultItem>Ilość osób z takim samym wynikiem jak Twój: <span>{betterAndWorstUsers.sameUsers}</span></ResultItem>
          <ResultItem>Ilość osób z gorszym wynikiem od Twojego: <span>{betterAndWorstUsers.worstUsers}</span></ResultItem>
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