import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bind } from '../../utilities/component';

const withSpinnerControls = () => WrappedComponent => {
  class SpinnerControls extends PureComponent {
    constructor(props, context) {
      super(props, context);

      this.state = this.contextToState(context);

      bind(this, 'update');

      this.unsubscribe = this.context.spinner_context_subscribe(this.update);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    contextToState(context) {
      return {
        spinning: context.spinner_context_get_status(),
        spin: context.spinner_context_spin,
        halt: context.spinner_context_halt
      };
    }

    update() {
      const state = this.contextToState(this.context);

      this.setState(state);
    }

    render() {
      const props = {
        ...this.props,
        ...this.state
      };

      return <WrappedComponent {...props} />;
    }
  }

  SpinnerControls.contextTypes = {
    spinner_context_get_status: PropTypes.func,
    spinner_context_subscribe: PropTypes.func,
    spinner_context_halt: PropTypes.func,
    spinner_context_spin: PropTypes.func
  };

  return SpinnerControls;
};

export default withSpinnerControls;
