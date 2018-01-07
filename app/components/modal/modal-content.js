import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './modal-content.scss';
import { bind, join } from '../../utilities/component';

class ModalContent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      opening: props.open,
      closing: !props.open
    };

    bind(this, 'startTransition', 'endTransition');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.transition(nextProps);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  transition() {
    this.setState({ visible: true }, this.startTransition);
  }

  startTransition() {
    this.timeout = setTimeout(() => {
      this.setState({ transitioning: true }, this.endTransition);
    }, 1);
  }

  endTransition() {
    this.timeout = setTimeout(() => {
      this.setState({
        open: this.props.open,
        visible: false,
        transitioning: false
      });
    }, 200);
  }

  className() {
    return join(
      'modal__content',
      this.state.open && 'modal__content--open',
      !this.state.open && 'modal__content--closed ',
      this.state.visible && 'modal__content--visible',
      this.state.transitioning && 'modal__content--transitioning'
    );
  }

  render() {
    return (
      <div className={this.className()}>
        {this.props.children}
      </div>
    );
  }
}

ModalContent.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any
};

ModalContent.defaultProps = {};

export default ModalContent;
