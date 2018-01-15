import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { join } from '../../utilities/component';

const ListGroupItem = ({ children, className, ...rest }) => (
  <div className={join('list-group-item-text', className)} {...rest}>
    {children}
  </div>
);

ListGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

ListGroupItem.defaultProps = {};

export default ListGroupItem;
