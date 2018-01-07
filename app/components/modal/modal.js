import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import { bind } from '../../utilities/component';
import { isFunction } from '../../utilities/type-comparison';
import ModalBackdrop from './modal-backdrop';
import ModalContent from './modal-content';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    bind(this, 'escapeListener');
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escapeListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeListener);
  }

  escapeListener(event) {
    if (!this.props.open) return;

    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode == 27) {
      if (isFunction(this.props.close)) {
        this.props.close();
      }
    }
  }

  render() {
    return (
      <div className="modal">
        {this.props.backdrop && <ModalBackdrop {...this.props} />}
        <ModalContent {...this.props}>{this.props.children}</ModalContent>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.any,
  backdrop: PropTypes.bool,
  focus: PropTypes.bool,
  keyboard: PropTypes.bool,
  open: PropTypes.bool,
  close: PropTypes.func
};

Modal.defaultProps = {
  backdrop: true,
  keyboard: true,
  focus: true
};

export default Modal;
