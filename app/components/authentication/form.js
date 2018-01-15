import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bind } from '../../utilities/component';

import Button from '../buttons/default';
import Modal from '../modal/modal';
import ModalBody from '../modal/modal-body';
import ModalFooter from '../modal/modal-footer';
import ModalHeader from '../modal/modal-header';

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      returning: true
    };

    bind(this, 'onClick', 'toggle');
  }

  onClick(event) {
    const { returning } = this.state;
    const { login, signUp } = this.props;
    const email = this.email.value;
    const password = this.password.value;

    if (returning) {
      login(email, password);
    } else {
      signUp(email, password);
    }
  }

  toggle(event) {
    event.preventDefault();

    this.setState(prevState => ({
      returning: !prevState.returning
    }));
  }

  render() {
    const { close, open } = this.props;
    const { returning } = this.state;
    const { onClick, toggle } = this;

    return (
      <Modal open={open} close={close}>
        <ModalHeader>{returning ? 'Sign In' : 'Sign Up'}</ModalHeader>
        <ModalBody>
          <form>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              ref={input => {
                this.email = input;
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              ref={input => {
                this.password = input;
              }}
            />
            <br />
            <br />
            <a href="#" onClick={toggle}>
              {returning ? "Don't have an account? Sign up." : 'Already have an account? Sign in.'}
            </a>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClick}>{returning ? 'Sign In' : 'Sign Up'}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Form.propTypes = {
  close: PropTypes.func,
  login: PropTypes.func,
  open: PropTypes.bool,
  signUp: PropTypes.func
};

export default Form;
