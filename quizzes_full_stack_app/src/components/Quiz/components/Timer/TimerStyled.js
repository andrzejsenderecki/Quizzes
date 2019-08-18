import styled from 'styled-components';

export const TimerStyled = styled.p`
  margin-left: 40px;
  font-size: 50px;
  font-weight: 600;
  color: #FFFFFF;

  @media(min-width: 768px) {
    font-size: 80px;
    margin: 0;
  }  

  @media(min-width: 1500px) {
    font-size: 140px;
  }  
`;

export default TimerStyled;