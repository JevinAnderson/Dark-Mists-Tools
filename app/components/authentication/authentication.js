import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import './authentication.scss';
import { setUser } from '../../actions/user';
import { bind } from '../../utilities/component';
import withLoaderControls from '../higher-order-components/with-loader-controls';

import Form from './form';

class Authentication extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    bind(
      this,
      'close',
      'error',
      'login',
      'onAuthStateChanged',
      'onClick',
      'open',
      'signUp'
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  close() {
    this.setState({ open: false });
    this.props.stopLoading();
  }

  error(error) {
    this.setState({ error });
    this.props.stopLoading();
  }

  login(email, password) {
    if (email && password) {
      this.props.startLoading();

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.close)
        .catch(this.error);
    }
  }

  logout() {
    this.props.startLoading();

    firebase
      .auth()
      .signOut()
      .then(this.close)
      .catch(this.error);
  }

  onAuthStateChanged(user) {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      user = { displayName, email, photoURL, uid };
    }

    this.props.setUser(user);
  }

  open() {
    this.setState({ open: true });
  }

  onClick(event) {
    const { props: { user } } = this;

    if (user) {
      this.logout();
    } else {
      this.open();
    }
  }

  signUp(email, password) {
    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.close)
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  render() {
    const { props: { user }, state: { open } } = this;

    return (
      <div className="authentication">
        <a className="navigation__link" onClick={this.onClick}>
          {user ? 'Sign Out' : 'Sign In'}
        </a>
        <Form
          close={this.close}
          login={this.login}
          open={open}
          signUp={this.signUp}
        />
      </div>
    );
  }
}

Authentication.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  setUser: PropTypes.func,
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func
};

const mapStateToProps = ({ user }) => ({ user });

export default compose(
  withLoaderControls(),
  connect(mapStateToProps, { setUser })
)(Authentication);
