import React from 'react';
import PropTypes from 'prop-types';

import './panel.scss';
import { join } from '../../utilities/component';

const Panel = ({ children, className }) =>
  <div className={join('panel', className)}>
    {children}
  </div>;

Panel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};
export default Panel;
