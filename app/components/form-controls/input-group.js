import React from 'react';
import PropTypes from 'prop-types';

import './input-group.scss';
import { join } from '../../utilities/component';

const InputGroup = ({ className, children, ...rest }) => (
  <div className={join('input-group', className)} {...rest}>
    {children}
  </div>
);

InputGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default InputGroup;
