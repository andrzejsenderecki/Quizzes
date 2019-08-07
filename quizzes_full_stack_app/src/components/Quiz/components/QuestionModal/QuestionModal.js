import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BasicButton from '../../../BasicButton/BasicButton';
import { textYesButton, textNoButton } from '../../../../constants';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  top: 50%;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 2;
  width: 90vw;
  height: 50vh;
  margin: 0 auto;
  padding: 20px;
  background: #000046;
  transform: translateY(-50%);
  border: 2px solid #0a5290;
  border-radius: 10px;
  
  button {
    width: 100px;
    height: 40px;
    margin: 0 20px;
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    line-height: 37px;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    outline : none;
    cursor: pointer;
  }

  @media(min-width: 626px) {
    width: 400px;
    height: 200px;
  }  
  
  @media(min-width: 1500px) {
    width: 500px;
    height: 400px;

    button {
      width: 150px;
      height: 50px;
      line-height: 25px;
    }
  } 
`;

const ModalText = styled.p`    
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;

  @media(min-width: 768px) {
    font-size: 25px;
  }
  
  @media(min-width: 1500px) {
    font-size: 45px;
  }   
`;

const QuestionModal = ({ onBackButtonEvent, showModal }) =>
  <Container>
    <ModalText>Czy chcesz zakończyć test?</ModalText>
    <BasicButton onClick={onBackButtonEvent} textLink={textYesButton} />
    <BasicButton onClick={showModal} textLink={textNoButton} />
  </Container>;

BasicButton.propTypes = {
    onBackButtonEvent: PropTypes.func,
    showModal: PropTypes.func
  };

export default QuestionModal;