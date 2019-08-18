import React from 'react';
import PropTypes from 'prop-types';
import BasicLinkStyled from './BasicLinkStyled';

const BasicLink = ({ textLink, ...rest }) => <BasicLinkStyled {...rest}>{textLink}</BasicLinkStyled>;

BasicLink.propTypes = {
    textLink: PropTypes.string
  };

export default BasicLink;