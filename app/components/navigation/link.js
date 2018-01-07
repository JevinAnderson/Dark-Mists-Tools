import React from 'react';
import { NavLink } from 'react-router-dom';

import { join } from '../../utilities/component';

const toFromChildren = children =>
  '/' + `${children}`.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');

const Link = ({ children, className, to, isActive }) => (
  <NavLink
    exact
    className={join('navigation__link', className)}
    activeClassName="navigation__link--active"
    to={to || toFromChildren(children)}
    isActive={isActive}
  >
    {children}
  </NavLink>
);

export default Link;
