import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  a {
      margin: 40px;
  }
`;

export const HeaderStyled = styled.h1`
  margin: 20px;
  font-size: 60px;
  color: #FFFFFF;
  font-weight: 700; 
  text-align: center;

  span {
    color: #0770ab;
  }

  @media(min-width: 1500px) {
    margin: 60px 0 40px 0;
    font-size: 80px;
  }  
`;

export const ResultItemStyled = styled.p`
  margin: 15px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  color: #0770ab;

  span {
    font-size: 35px;
    font-weight: 600;
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    font-size: 20px;

    span {
      font-size: 30px;
    }
  }  

  @media(min-width: 1500px) {
    font-size: 30px;

    span {
      font-size: 40px;
    }
  }  
`;

export const ResultTextStyled = styled.p`
  margin: 30px 15px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: #FFFFFF;

  @media(min-width: 1500px) {
    font-size: 60px;
  }
`;