import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = ({ children }) =>
  <div className="modal__body">
    {children}
  </div>;

ModalBody.propTypes = {
  children: PropTypes.any
};

export default ModalBody;
