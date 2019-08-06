import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAnswer } from '../../configureRedux/reducer';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 0 290px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media(min-width: 768px) {
    padding: 0;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation-name: answers;
  animation-duration: 1s;

  @keyframes answers {
      from {opacity: 0;}
      to {opacity: 100;}
    }

  @media(min-width: 768px) {
      flex-direction: row;
    }
`;

const QuestionText = styled.p`
  margin: 20px 10px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;
  
  @media(min-width: 768px) {
    margin: 10px 0 0 0;
    font-size: 50px; 
    animation-name: questionMargin;
    animation-duration: 1s; 

    @keyframes questionMargin {
      from {
        opacity: 0;
      }
      to {
        opacity: 100;
      }
    }
  }

  @media(min-width: 1500px) {
    margin: 30px 30px;
    font-size: 60px;
  }  
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  margin: 30px 40px 30px 0;

  span {
    margin-top: 18px;
    font-size: 25px;
    font-weight: 600;
    color: #0770ab;
  }

  @media(min-width: 768px) {
    margin: 30px 40px;

    span {
      margin-top: 5px;
      font-size: 25px;
    }
  }

  @media(min-width: 1500px) {
    margin: 50px 60px;

    span {
      margin-top: 14px;
      font-size: 35px;
    }
  }
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  
  @media(min-width: 768px) {
    width: 32px;
    height: 32px;
  }

  @media(min-width: 1500px) {
    width: 44px;
    height: 44px;
  }
`;

const RadioButton = styled.input`
  z-index: 1;
  margin-right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;

  &:hover ~ ${RadioButtonLabel} {
    background: #ffffff;

    &::after {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      margin: 12px;
      border-radius: 50%;
      background: #1CB5E0;
    }
  }

  &:checked + ${RadioButtonLabel} {
    background: #ffffff;

    &::after {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      margin: 12px;
      background: #0a5290;
      border-radius: 50%;
    }
  }

  @media(min-width: 768px) {
    width: 32px;
    height: 32px;
    margin-right: 15px;

    &:hover ~ ${RadioButtonLabel} {
      &::after {
        width: 16px;
        height: 16px;
        margin: 8px;
      }
    }

    &:checked + ${RadioButtonLabel} {
        &::after {
            width: 16px;
            height: 16px;
            margin: 8px;
        }
    }
  }

  @media(min-width: 1500px) {
    width: 44px;
    height: 44px;
    margin-right: 15px;

    &:hover ~ ${RadioButtonLabel} {
      &::after {
        width: 22px;
        height: 22px;
        margin: 11px;
      }
    }

    &:checked + ${RadioButtonLabel} {
        &::after {
            width: 22px;
            height: 22px;
            margin: 11px;
        }
    }
  }
  }
`;

class QuestionForm extends React.Component {
  state = {
    checkedAnswer: ''
  }

  componentDidUpdate() {
    const { answerReducer, quizReducer, getAnswer } = this.props;

    if(answerReducer.length===0) {
        quizReducer.quiz.map((answer,index) => getAnswer('',index));
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
    const { answerReducer } = this.props;

    const answerToChecked = answerReducer ? Object.values(answerReducer).map((answer,index) => {
      return answer.answer_id === index ? answer.answer : null;
    }) : ''

    return answerToChecked;
  }

  render() {
  const { questionId, quizId, quizQuestion, answerReducer, quizReducer, getAnswer } = this.props;
  const { question, answer_a, answer_b, answer_c, answer_d } = quizQuestion;
  const answerToChecked = this.checkedAnswer(quizId);

  if(answerReducer.length===0) {
      quizReducer.quiz.map((answer,index) => getAnswer('', index));
  } 

  return (
      <Container>
        <QuestionText>{question}</QuestionText >
        {
          <FormContainer>
            <Answer><RadioButton type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_a} checked={answerToChecked[questionId] === answer_a} /><RadioButtonLabel /><span>{answer_a}</span></Answer>
            <Answer><RadioButton type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_b} checked={answerToChecked[questionId] === answer_b} /><RadioButtonLabel /><span>{answer_b}</span></Answer>
            <Answer><RadioButton type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_c} checked={answerToChecked[questionId] === answer_c} /><RadioButtonLabel /><span>{answer_c}</span></Answer>
            <Answer><RadioButton type='radio' onClick={(e) => this.handleChangeOption(e, questionId, quizId)} value={answer_d} checked={answerToChecked[questionId] === answer_d} /><RadioButtonLabel /><span>{answer_d}</span></Answer>
          </FormContainer>
        }
      </Container>
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