import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAnswer } from '../../configureRedux/reducer';
import { ContainerStyled, FormContainerStyled, QuestionTextStyled, AnswerStyled, RadioButtonLabelStyled, RadioButtonStyled } from './QuestionFormStyled';

class QuestionForm extends React.Component {
  state = {
    checkedAnswer: ''
  }

  componentDidUpdate() {
    const { currentQuizAnswers, quizData, getAnswer } = this.props;

    if(currentQuizAnswers.length===0) {
        quizData.quiz.map((answer,index) => getAnswer('',index));
    } 
  }

  handleChangeOption = (e, answerId, quizId) => {
    const { getAnswer } = this.props;
    const answer = e.target.value;
    const answerToChecked = this.checkedAnswer(quizId);
    
    getAnswer(answer, answerId, quizId);
    
    this.setState({
      checkedAnswer: answerToChecked
    });
  }

  checkedAnswer = () => {
    const { currentQuizAnswers } = this.props;

    const answerToChecked = currentQuizAnswers && Object.values(currentQuizAnswers).map((answer,index) => {
      return answer.answer_id === index && answer.answer;
    });

    return answerToChecked;
  }

  render() {
  const { questionId, quizId, quizQuestion, currentQuizAnswers, quizData, getAnswer } = this.props;
  const { question, answer_a, answer_b, answer_c, answer_d } = quizQuestion;
  const answerToChecked = this.checkedAnswer(quizId);

  if(currentQuizAnswers.length===0) {
      quizData.currentQuizQuestions.map((answer,index) => getAnswer('', index));
  } 

  return (
      <ContainerStyled>
        <QuestionTextStyled>{question}</QuestionTextStyled>
          {
            <FormContainerStyled>
              <AnswerStyled><RadioButtonStyled type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_a} checked={answerToChecked[questionId] === answer_a} /><RadioButtonLabelStyled /><span>{answer_a}</span></AnswerStyled>
              <AnswerStyled><RadioButtonStyled type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_b} checked={answerToChecked[questionId] === answer_b} /><RadioButtonLabelStyled /><span>{answer_b}</span></AnswerStyled>
              <AnswerStyled><RadioButtonStyled type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_c} checked={answerToChecked[questionId] === answer_c} /><RadioButtonLabelStyled /><span>{answer_c}</span></AnswerStyled>
              <AnswerStyled><RadioButtonStyled type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_d} checked={answerToChecked[questionId] === answer_d} /><RadioButtonLabelStyled /><span>{answer_d}</span></AnswerStyled>
            </FormContainerStyled>
          }
      </ContainerStyled>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = dispatch => ({
  getAnswer: (answer,answer_id) => dispatch(getAnswer(answer,answer_id))
});

QuestionForm.propTypes = {
    questionId: PropTypes.number,
    quizId: PropTypes.string,
    quizQuestion: PropTypes.object,
    answerReducer: PropTypes.object,
    quizReducer: PropTypes.object,
    getAnswer: PropTypes.func
  };   

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);