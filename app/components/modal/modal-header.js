import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = ({ children }) =>
  <div className="modal__header">
    {children}
  </div>;

ModalHeader.propTypes = {
  children: PropTypes.any
};

export default ModalHeader;
