import styled from 'styled-components';

export const ContainerStyled = styled.div`
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

export const FormContainerStyled = styled.form`
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

export const QuestionTextStyled = styled.p`
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

export const AnswerStyled = styled.div`
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
    margin-bottom: 20px;
  }

  @media(min-width: 768px) {
    margin: 30px 40px;
  }

  @media(min-width: 1500px) {
    margin: 50px 60px;

    span {
      font-size: 35px;
    }
  }
`;

export const RadioButtonLabelStyled = styled.label`
  position: absolute;
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

export const RadioButtonStyled = styled.input`
  z-index: 1;
  margin-right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;

  &:hover ~ ${RadioButtonLabelStyled} {
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

  &:checked + ${RadioButtonLabelStyled} {
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
    margin-right: 10px;

    &:hover ~ ${RadioButtonLabelStyled} {
      &::after {
        width: 16px;
        height: 16px;
        margin: 8px;
      }
    }

    &:checked + ${RadioButtonLabelStyled} {
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

    &:hover ~ ${RadioButtonLabelStyled} {
      &::after {
        width: 22px;
        height: 22px;
        margin: 11px;
      }
    }

    &:checked + ${RadioButtonLabelStyled} {
      &::after {
        width: 22px;
        height: 22px;
        margin: 11px;
      }
    }
  }
`;

export default ContainerStyled;