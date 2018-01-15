import React from 'react';
import PropTypes from 'prop-types';

import './form-control.scss';
import { join } from '../../utilities/component';

const Input = ({ className, ...rest }) => <input type="text" className={join('form-control', className)} {...rest} />;

Input.propTypes = {
  className: PropTypes.string
};

export default Input;
