import React from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utilities/component';
import './button.scss';

const Button = ({ children, className, ...rest }) =>
  <button
    type="submit"
    className={join('btn', 'btn-primary', className)}
    {...rest}
  >
    {children}
  </button>;

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

Button.defaultProps = {};

export default Button;
