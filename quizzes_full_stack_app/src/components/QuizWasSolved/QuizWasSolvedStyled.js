import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

export const ButtonContainerStyled = styled.div`
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

export const MessageTextStyled = styled.h1`
  margin: 40px 0 0 0;
  font-size: 40px;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;

  @media(min-width: 768px) {
    font-size: 40px;
  }
`;

export default ContainerStyled;