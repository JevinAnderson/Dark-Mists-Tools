import React from 'react';
import PropTypes from 'prop-types';

import './form-control.scss';
import { join } from '../../utilities/component';

const Textarea = ({ className, ...rest }) => <textarea className={join('form-control', className)} {...rest} />;

Textarea.propTypes = {
  className: PropTypes.string
};

export default Textarea;
