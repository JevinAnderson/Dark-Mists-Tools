import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './list-group-item.scss';
import { join } from '../../utilities/component';

const ListGroupItem = ({ children, className, ...rest }) =>
  <div className={join('list-group-item', className)} {...rest}>
    {children}
  </div>;

ListGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

ListGroupItem.defaultProps = {};

export default ListGroupItem;
