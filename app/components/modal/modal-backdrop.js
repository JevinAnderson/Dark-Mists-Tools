import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './modal-backdrop.scss';
import { bind, join } from '../../utilities/component';

class ModalBackdrop extends PureComponent {
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
      'modal__backdrop',
      this.state.open && 'modal__backdrop--open',
      !this.state.open && 'modal__backdrop--closed ',
      this.state.visible && 'modal__backdrop--visible',
      this.state.transitioning && 'modal__backdrop--transitioning'
    );
  }

  render() {
    return <div className={this.className()} onClick={this.props.close} />;
  }
}

ModalBackdrop.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func
};

ModalBackdrop.defaultProps = {};

export default ModalBackdrop;
