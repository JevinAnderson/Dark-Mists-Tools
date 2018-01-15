import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './list-group-item-heading.scss';
import { join } from '../../utilities/component';

const ListGroupItemHeading = ({ children, className, ...rest }) => (
  <div className={join('list-group-item-heading', className)} {...rest}>
    {children}
  </div>
);

ListGroupItemHeading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

ListGroupItemHeading.defaultProps = {};

export default ListGroupItemHeading;
