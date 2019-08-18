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
    margin: 20px 0;
  }

  @media(min-width: 768px) {
    flex-direction: row;
    
    a {
      margin: 30px 10px;
    }
  }
`;

export const SubtitleAStyled = styled.p`
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  color: #0770ab;

  span {
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    font-size: 45px;
  }

  @media(min-width: 1500px) {
    font-size: 60px;
  }
`;

export const SubtitleBStyled = styled.p`
  margin: 10px 0 30px 0;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  color: #0770ab;

  span {
    color: #FFFFFF;
  }

  @media(min-width: 768px) {
    margin-bottom: 20px;
  }

  @media(min-width: 1500px) {
    font-size: 40px;
  }
`;

export default ContainerStyled;