import React from 'react';
import PropTypes from 'prop-types';
import BasicButton from '../../../BasicButton/BasicButton';
import { ContainerStyled, ModalTextStyled } from './QuestionModalStyled';
import { textYesButton, textNoButton } from '../../../../constants';

const QuestionModal = ({ onBackButtonEvent, showModal }) =>
  <ContainerStyled>
    <ModalTextStyled>Czy chcesz zakończyć test?</ModalTextStyled>
    <BasicButton onClick={onBackButtonEvent} textLink={textYesButton} />
    <BasicButton onClick={showModal} textLink={textNoButton} />
  </ContainerStyled>;

BasicButton.propTypes = {
    onBackButtonEvent: PropTypes.func,
    showModal: PropTypes.func
  };

export default QuestionModal;