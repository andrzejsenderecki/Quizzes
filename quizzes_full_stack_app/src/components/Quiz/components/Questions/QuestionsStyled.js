import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;
`;

export const BottomPanelContainerStyled = styled.div`
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

export const QuizCategoryStyled = styled.h1`
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

export const QuestionCountStyled = styled.p`
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

export default ContainerStyled;