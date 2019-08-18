import React from 'react';
import PropTypes from 'prop-types';
import TimerStyled from './TimerStyled';

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
        <TimerStyled>{startTime}</TimerStyled>
      )
  }
}

Timer.propTypes = {
    quiz_id: PropTypes.string,
    startTime: PropTypes.number
  };   

export default Timer;