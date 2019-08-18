import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContainerStyled, HeaderStyled, ResultItemStyled, ResultTextStyled } from './ResultStyled';
import { withCookies } from 'react-cookie';
import BasicLink from '../BasicLink/BasicLink';
import { textHomeLink } from '../../constants';

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

  othersUsersAnswers = numberGoodAnswersCurrentUser => {
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
      otherUsersAnswers.map(answer => {
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
        <ContainerStyled>
          <HeaderStyled>Wynik <span>quizu</span></HeaderStyled>
        </ContainerStyled>
        <ContainerStyled>
          <ResultItemStyled>Ilość pytań: <span>{quizReducer.quiz.length}</span></ResultItemStyled>
          <ResultItemStyled>Dobre odpowiedzi: <span>{goodAnswers.length}</span></ResultItemStyled>
          <ResultItemStyled>Błędne odpowiedzi: <span>{badAnswers.length}</span></ResultItemStyled>
        </ContainerStyled>
        <ContainerStyled>    
          <ResultTextStyled>Quiz {quizPassed ? 'zaliczony! Brawo!' : 'niezaliczony. Spróbuj ponownie za jakiś czas.'}</ResultTextStyled>
        </ContainerStyled>
        <ContainerStyled>
          <ResultItemStyled>Osoby które zaliczyły quiz: <span>{allUsersQuizPassed}</span></ResultItemStyled>
          <ResultItemStyled>Osoby które niezaliczyły quizu: <span>{allUsersQuizFailed}</span></ResultItemStyled>
        </ContainerStyled>
        <ContainerStyled>
          <ResultItemStyled>Ilość osób z lepszym wynikiem od Twojego: <span>{betterAndWorstUsers.betterUsers}</span></ResultItemStyled>
          <ResultItemStyled>Ilość osób z takim samym wynikiem jak Twój: <span>{betterAndWorstUsers.sameUsers}</span></ResultItemStyled>
          <ResultItemStyled>Ilość osób z gorszym wynikiem od Twojego: <span>{betterAndWorstUsers.worstUsers}</span></ResultItemStyled>
        </ContainerStyled>
        <ContainerStyled>
          <BasicLink textLink={textHomeLink} to={`/`} />
        </ContainerStyled>
      </>    
    )
  }
}

const mapStateToProps = state => {
  return state
} 

Result.propTypes = {
    quizQuestion: PropTypes.object
  };   

export default withCookies(connect(mapStateToProps,{})(Result));