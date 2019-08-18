import React from 'react';
import PropTypes from 'prop-types';
import BasicButtonStyled from './BasicButtonStyled';

const BasicButton = ({ textLink, ...rest }) => <BasicButtonStyled {...rest}>{textLink}</BasicButtonStyled>;

BasicButton.propTypes = {
    textLink: PropTypes.string
  };

export default BasicButton;