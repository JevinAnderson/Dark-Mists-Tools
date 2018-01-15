import React from 'react';
import PropTypes from 'prop-types';

import './input-group-addon.scss';
import { join } from '../../utilities/component';

const InputGroupAddon = ({ className, children, ...rest }) => (
  <span className={join('input-group-addon', className)} {...rest}>
    {children}
  </span>
);

InputGroupAddon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default InputGroupAddon;
