import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './list-group.scss';
import { join } from '../../utilities/component';

const ListGroup = ({ children, className, ...rest }) =>
  <div className={join('list-group', className)} {...rest}>
    {children}
  </div>;

ListGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

ListGroup.defaultProps = {};

export default ListGroup;
