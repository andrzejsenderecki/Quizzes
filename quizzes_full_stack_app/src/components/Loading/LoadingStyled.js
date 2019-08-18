import styled from 'styled-components';

const LoadingStyled = styled.div`
  width: 50px;
  height: 50px;
  margin: 30px 0;
  border-radius: 50%;
  border: 10px solid transparent;
  border-top: 10px solid #FFFFFF;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingStyled;