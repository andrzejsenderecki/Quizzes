import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Time = styled.p`
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

class Timer extends React.Component {
  state = {
      startTime: this.props.startTime,
  }

  componentDidMount() {
    const { quiz_id, history } = this.props;
    const resultPath = `/result/quiz/${quiz_id}`;

    const quizTime = setInterval(() => {
      const { startTime } = this.state;

      this.setState({
        startTime: startTime-1
      });

      if(startTime === 0) {
        history.replace({pathname: resultPath});
        clearInterval(quizTime);
      }
    }, 1000);
  }

  render() {
      const { startTime } = this.state;

      return (
        <Time>{startTime}</Time>
      )
  }
}

Timer.propTypes = {
    quiz_id: PropTypes.string,
    startTime: PropTypes.number
  };   

export default Timer;