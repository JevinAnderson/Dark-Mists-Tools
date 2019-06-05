import React from 'react';
import PropTypes from 'prop-types';

import Input from './input';
import InputGroup from './input-group';
import InputGroupAddon from './input-group-addon';

const LabeledInput = ({ label, className, ...rest }) => (
  <InputGroup className={className}>
    <InputGroupAddon>{label}</InputGroupAddon>
    <Input {...rest} />
  </InputGroup>
);

LabeledInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

LabeledInput.defaultProps = {
  type: 'text'
};

export default LabeledInput;
