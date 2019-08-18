import React  from 'react';
import PropTypes from 'prop-types';
import Media from "react-media";
import { ContainerStyled, BottomPanelContainerStyled, QuizCategoryStyled, QuestionCountStyled } from './QuestionsStyled'; 
import QuestionForm from '../QuestionForm/QuestionForm';
import Timer from '../Timer/Timer';
import QuestionButton from '../QuestionButton/QuestionButton';
import QuestionModal from '../QuestionModal/QuestionModal';
import BasicButton from '../../../BasicButton/BasicButton';
import Loading from '../../../Loading/Loading';
import { textExitQuizButton } from '../../../../constants';

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
    this.props.history.push(`/result/quiz/${this.props.match.params.id}`);
  }

  componentDidMount() {
    const { quizData } = this.props.quizData;
    window.onpopstate = this.onBackButtonEvent;
    
    this.setState({
      questionsCount: quizData && quizData.currentQuiz  ? quizData.currentQuiz.length : ''
    });
  }    

  nextQuestion = () => {
    const { quizData } = this.props;
    const questionsCount = quizData.currentQuizQuestions.length-1;
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
    const { quizData, match } = this.props;
    const { questionNumber } = this.state;
    const isQuiz = quizData.currentQuizQuestions;
    const quizId = match.params.id;
    const questionsCount = quizData.currentQuizQuestions ? quizData.currentQuizQuestions.length : '';

    return (
      <>  
        { this.state.modalOpen ? <QuestionModal onBackButtonEvent={this.onBackButtonEvent} showModal={this.showModal} /> : '' }
        <ContainerStyled>
          <QuizCategoryStyled>Wiedza ogólna</QuizCategoryStyled>
        </ContainerStyled>
        <ContainerStyled>
          {
            isQuiz && isQuiz.length ? isQuiz.map((question, index) => {
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
        </ContainerStyled>
        <Media query="(min-width: 768px)">
          <ContainerStyled>
            <QuestionButton onClick={this.prevQuestion} arrowLeft={true} />
            <QuestionButton onClick={this.nextQuestion} arrowLeft={false} />
          </ContainerStyled>
        </Media>
        <BottomPanelContainerStyled>
          <Media query="(max-width: 767px)">
            <>
              <ContainerStyled>
                <QuestionButton onClick={this.prevQuestion} arrowLeft={true} />
                <QuestionButton onClick={this.nextQuestion} arrowLeft={false} />
              </ContainerStyled>
              <ContainerStyled>
                <QuestionCountStyled>Pytanie <span>{questionNumber+1}</span> z <span>{questionsCount}</span></QuestionCountStyled>
                <Timer quiz_id={quizId} startTime={90} history={quizData.history} />
              </ContainerStyled>
            </>
          </Media>
          <Media query="(min-width: 768px)">
            <>
              <QuestionCountStyled>Pytanie <span>{questionNumber+1}</span> z <span>{questionsCount}</span></QuestionCountStyled>
              <Timer quiz_id={quizId} startTime={90} history={quizData.history} />
            </>  
          </Media>
          <BasicButton onClick={this.showModal} textLink={textExitQuizButton} />
        </BottomPanelContainerStyled>
      </>     
    )
  }
}

Questions.propTypes = {
    quizData: PropTypes.object
  };

export default Questions;