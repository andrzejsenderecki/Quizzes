import React  from 'react';
import PropTypes from 'prop-types';
import Media from "react-media";
import QuestionForm from '../QuestionForm/QuestionForm';
import Timer from '../Timer/Timer';
import QuestionButton from '../QuestionButton/QuestionButton';
import styled from 'styled-components';
import QuestionModal from '../QuestionModal/QuestionModal';
import BasicButton from '../../../BasicButton/BasicButton';
import Loading from '../../../Loading/Loading';
import { textExitQuizButton } from '../../../../constants';

const Container = styled.div`
  display: flex;
  justify-content:center;
  align-items: flex-end;
  width: 100%;
`;

const BottomPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: #000046;
  
  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-beetwen;
    bottom: 0;
    background: none;
    padding: 0;

    button {
      margin: 60px;
    }
  }
`;

const QuizCategory = styled.h1`
  margin-top: 20px;
  font-size: 30px;
  font-weight: 600;
  color: #0770ab;
  
  @media(min-width: 768px) {
    margin: 10vh 0 50px 0;
  }

  @media(min-width: 1367px) {
    margin: 20vh 0 50px 0;
  }

  @media(min-width: 1500px) {
    margin: 10vh 0 50px 0;
    font-size: 50px;
  }
`;

const QuestionCount = styled.p`
  margin-top: 10px;
  font-size: 25px;
  font-weight: 400;
  color: #0770ab;

  span {
    font-size: 35px;
    font-weight: 600;
    color: #FFFFFF;
  }
  
  @media(min-width: 768px) {
    margin: 0 60px 0 0;
    cursor: pointer;
  }

  @media(min-width: 1500px) {
    font-size: 45px;

    span {
      font-size: 55px;
    }
  }
`;

class Questions extends React.Component {
  state = {
      questionNumber: 0,
      modalOpen: false
  }
  
  showModal = () => {
    this.setState({
        modalOpen: !this.state.modalOpen
    });
  }

  onBackButtonEvent = e => {
    e.preventDefault();
    this.props.quizData.history.push(`/result/quiz/${this.props.quizData.match.params.id}`);
  }

  componentDidMount() {
    const { quizReducer } = this.props.quizData;
    window.onpopstate = this.onBackButtonEvent;
    
    this.setState({
        questionsCount: quizReducer && quizReducer.quiz  ? quizReducer.quiz.length : ''
    });
  }    

  nextQuestion = () => {
    const { quizData } = this.props;
    const questionsCount = quizData.quizReducer.quiz.length-1;
    let { questionNumber } = this.state;

    if(questionNumber < questionsCount) {
        this.setState({
            questionNumber: questionNumber += 1
        });
    }
  }

  prevQuestion = () => {
    let { questionNumber } = this.state;

    if(questionNumber > 0) {
        this.setState({
            questionNumber: questionNumber -= 1
        });
    }
  }

  render() {
    const { quizData } = this.props;
    const { questionNumber } = this.state;
    const isQuizReducer = quizData.quizReducer.quiz;
    const quizId = quizData.match.params.id;
    const questionsCount = quizData.quizReducer.quiz ? quizData.quizReducer.quiz.length : '';

    return (
      <>  
        { this.state.modalOpen ? <QuestionModal onBackButtonEvent={this.onBackButtonEvent} showModal={this.showModal} /> : '' }
        <Container>
          <QuizCategory>Wiedza ogólna</QuizCategory>
        </Container>
        <Container>
          {
            isQuizReducer && isQuizReducer.length ? isQuizReducer.map((question, index) => {
              return questionNumber === index &&
                <QuestionForm
                    quizId={quizId}
                    questionId={index}
                    quizQuestion={question}
                    key={index}
                />
            }) 
            : <Loading />
          }
        </Container>
        <Media query="(min-width: 768px)">
          <Container>
            <QuestionButton onClick={this.prevQuestion} arrowLeft={true} />
            <QuestionButton onClick={this.nextQuestion} arrowLeft={false} />
          </Container>
        </Media>
        <BottomPanelContainer>
          <Media query="(max-width: 767px)">
            <Container>
              <QuestionButton onClick={this.prevQuestion} arrowLeft={true} />
              <QuestionButton onClick={this.nextQuestion} arrowLeft={false} />
            </Container>
          </Media>
          <QuestionCount>Pytanie <span>{questionNumber+1}</span> z <span>{questionsCount}</span></QuestionCount>
          <Timer quiz_id={quizId} startTime={90} history={quizData.history} />
          <BasicButton onClick={this.showModal} textLink={textExitQuizButton} />
        </BottomPanelContainer>
      </>     
    )
  }
}

Questions.propTypes = {
    quizData: PropTypes.object
  };

export default Questions;