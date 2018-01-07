import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import './navigation.scss';
import Link from './link';
import { bind, join } from '../../utilities/component';
import Authentication from '../authentication/authentication';
import withUser from '../higher-order-components/with-user';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    bind(this, 'toggle');
  }

  toggle() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { user } = this.props;

    return (
      <div className="navigation">
        <div className="navigation__title">Darkmists Tools</div>
        {this.state.expanded && (
          <div className="navigation__modal-background" onClick={this.toggle} />
        )}
        <div
          className={join(
            'navigation__links',
            this.state.expanded && 'navigation__links--expanded'
          )}
          onClick={this.toggle}
        >
          <Link>Items</Link>
          <Link>Enchanters</Link>
          {user && <Link>Profile</Link>}
          <Authentication />
        </div>
        <div className="navigation__menu" onClick={this.toggle}>
          Menu
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.object
};

export default compose(
  withRouter,
  withUser(),
)(Navigation)
