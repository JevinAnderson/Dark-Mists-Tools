import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utilities/component';
import Select from './select';
import InputGroup from './input-group';
import InputGroupAddon from './input-group-addon';

const LabeledInput = ({ label, className, children, ...rest }) =>
  <InputGroup className={className}>
    <InputGroupAddon>
      {label}
    </InputGroupAddon>
    <Select {...rest}>
      {children}
    </Select>
  </InputGroup>;

LabeledInput.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.string
};

LabeledInput.defaultProps = {
  type: 'text'
};

export default LabeledInput;
