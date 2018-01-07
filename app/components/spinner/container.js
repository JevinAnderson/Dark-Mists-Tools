import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './spinner';

const Container = ({ children, width, height, backgroundColor }) => {
  const style = {
    position: 'relative',
    display: 'inline-block',
    height: height || '250px',
    width: width || '250px',
    backgroundColor: backgroundColor || 'blue'
  };

  return (
    <div style={style}>
      <Spinner>{children}</Spinner>
    </div>
  );
};

Container.propTypes = {};

Container.defaultProps = {};

export default Container;
