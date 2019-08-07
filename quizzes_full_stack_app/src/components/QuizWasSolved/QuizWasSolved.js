import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BasicLink from '../BasicLink/BasicLink';
import Logo from '../Logo/Logo';
import { textHomeLink } from '../../constants';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  
  a {
    margin-top: 40px;
  }

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const MessageText = styled.h1`
  margin: 40px 0 0 0;
  font-size: 40px;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;

  @media(min-width: 768px) {
    font-size: 40px;
  }
`;

const QuizWasSolved = () => {
  return (
    <Container>
      <Logo />
      <MessageText>Ten quiz był już rozwiązany</MessageText>
      <ButtonContainer>
        <BasicLink textLink={textHomeLink} to={`/`} />
      </ButtonContainer>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(QuizWasSolved);