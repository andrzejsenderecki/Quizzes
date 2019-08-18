import styled from 'styled-components';

const LogoStyled = styled.h1`
  margin: 0;
  font-size: 60px;
  font-weight: 900;
  color: #FFFFFF;

  span {
    font-size: 140px;
    color: #0770ab;
    letter-spacing: -5px;
  }

  @media(min-width: 768px) {
    font-size: 110px;
    
    span {
      font-size: 190px;
    }
  }

  @media(min-width: 1367px) {
    margin-top: 10vh;
  }

  @media(min-width: 1500px) {
    margin: 0;
    font-size: 160px;
      
    span {
      font-size: 240px;
    }
  }
`;

export default LogoStyled;