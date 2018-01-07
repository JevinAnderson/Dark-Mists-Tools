import React from 'react';
import PropTypes from 'prop-types';

import './form-control.scss';
import { join } from '../../utilities/component';

const Select = ({ className, children, ...rest }) =>
  <select className={join('form-control', className)} {...rest}>
    {children}
  </select>;

Select.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Select;
