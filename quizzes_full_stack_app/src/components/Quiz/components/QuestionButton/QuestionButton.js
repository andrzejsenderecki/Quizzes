import React from 'react';
import PropTypes from 'prop-types';
import { QuestionButtonStyled, ArrowLeftStyled, ArrowRightStyled } from './QuestionButtonStyled';

const QuestionButton = ({ textButton, arrowLeft, ...rest }) => 
  <QuestionButtonStyled {...rest} >
    {
      arrowLeft ? <ArrowLeftStyled /> : <ArrowRightStyled />
    }
  </QuestionButtonStyled>

QuestionButton.propTypes = {
    textButton: PropTypes.string,
    arrowLeft: PropTypes.bool
  };    

export default QuestionButton;