import React from 'react';
import { connect } from 'react-redux';
import { ContainerStyled, ButtonContainerStyled, MessageTextStyled } from './QuizWasSolvedStyled';
import BasicLink from '../BasicLink/BasicLink';
import Logo from '../Logo/Logo';
import { textHomeLink } from '../../constants';

const QuizWasSolved = () => {
  return (
    <ContainerStyled>
      <Logo />
      <MessageTextStyled>Ten quiz był już rozwiązany</MessageTextStyled>
      <ButtonContainerStyled>
        <BasicLink textLink={textHomeLink} to={`/`} />
      </ButtonContainerStyled>
    </ContainerStyled>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(QuizWasSolved);