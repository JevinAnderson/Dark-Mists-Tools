import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './spinner.scss';
import { bind } from '../../utilities/component';
import Publisher from '../../utilities/publisher';

class Spinner extends PureComponent {
  constructor(props) {
    super(props);

    this.publisher = new Publisher();

    this.spinning = !!props.spinning;
    this.state = {
      spinning: this.spinning
    };

    bind(this, 'getStatus', 'halt', 'spin');
  }

  getChildContext() {
    return {
      spinner_context_get_status: this.getStatus,
      spinner_context_subscribe: this.publisher.subscribe,
      spinner_context_parent: this,
      spinner_context_halt: this.halt,
      spinner_context_spin: this.spin
    };
  }

  getStatus() {
    return !!this.spinning;
  }

  halt(bubble) {
    this.spinning = false;
    this.setState({ spinning: false });

    this.bubbleToParent(bubble, 'halt');

    this.publisher.publish();
  }

  spin(bubble) {
    this.spinning = true;
    this.setState({ spinning: true });

    this.bubbleToParent(bubble, 'spin');

    this.publisher.publish();
  }

  bubbleToParent(bubble, method) {
    if (bubble && this.context.spinner_context_parent && this.context.spinner_context_parent[method]) {
      this.context.spinner_context_parent[method](bubble);
    }
  }

  render() {
    const {
      props: { children },
      state: { spinning }
    } = this;

    return (
      <div>
        {children}
        {spinning && <div className="spinner__background" />}
        {spinning && <div className="spinner__spinner" />}
      </div>
    );
  }
}

Spinner.propTypes = {
  children: PropTypes.any,
  spinning: PropTypes.bool
};

Spinner.contextTypes = {
  spinner_context_parent: PropTypes.any
};

Spinner.childContextTypes = {
  spinner_context_get_status: PropTypes.func,
  spinner_context_subscribe: PropTypes.func,
  spinner_context_parent: PropTypes.any,
  spinner_context_halt: PropTypes.func,
  spinner_context_spin: PropTypes.func
};

export default Spinner;
