import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  width: 60px;
  height: 40px;
  margin: 0 20px;
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  line-height: 47px;
  text-decoration: none;
  background: #0770ab;
  border-radius: 5px;
  border: none;
  outline : none;

  @media(min-width: 768px) {
    margin: 30px 10px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #FFFFFF;
      &:first-child > div {
          border-right: 10px solid #0770ab;
      }
      &:last-child > div {
          border-left: 10px solid #0770ab;
      }
    }
  }

  @media(min-width: 1500px) {
    width: 90px;
    height: 60px;
    margin: 30px 20px;

    &:hover {
      &:first-child > div {
          border-right: 18px solid #0770ab;
      }
      &:last-child > div {
          border-left: 18px solid #0770ab;
      }
    }
  }  
`;

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  margin-left: 25px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 10px solid #FFFFFF;
  transition: 0.2s;

  @media(min-width: 1500px) {
    margin-left: 33px;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: 18px solid #FFFFFF;
  }  
`;

const ArrowRight = styled.div`
  width: 0;
  height: 0;
  margin-left: 25px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 10px solid #FFFFFF;
  transition: 0.2s;

  @media(min-width: 1500px) {
    margin-left: 33px;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 18px solid #FFFFFF;
  } 
`;

const QuestionButton = ({ textButton, arrowLeft, ...rest }) => 
  <Button {...rest} >
    {
      arrowLeft ? <ArrowLeft /> : <ArrowRight />
    }
  </Button>

QuestionButton.propTypes = {
    textButton: PropTypes.string,
    arrowLeft: PropTypes.bool
  };    

export default QuestionButton;