import styled from 'styled-components';

const BasicButtonStyled = styled.button`
  width: 60%;
  height: 45px;
  margin-top: 10px;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  background: #0770ab;
  border-radius: 7px;
  border: none;
  outline: none;
  
  @media(min-width: 768px) {
    width: 180px;
    height: 40px;
    margin: 0;
    font-size: 17px;
    line-height: 40px;
    margin-let: 30px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        color: #0770ab;
        background: #FFFFFF;
    }
  }

  @media(min-width: 1500px) {
    width: 220px;
    height: 50px;
    font-size: 21px;
    line-height: 48px;
  }  
`;

export default BasicButtonStyled;