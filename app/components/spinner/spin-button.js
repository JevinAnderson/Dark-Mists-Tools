import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withSpinnerControls from './with-spinner-controls';

class SpinButton extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillReceiveProps(nextProps) {}
  // shouldComponentUpdate(nextProps, nextState) { return true; }
  // componentWillUpdate(nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}
  onClick(event) {
    event.preventDefault();

    const { spin, halt, bubble } = this.props;

    spin(bubble);

    setTimeout(() => {
      halt(bubble);
    }, 5000);
  }
  render() {
    return (
      <button onClick={this.onClick}>Spin</button>
    );
  }
}

SpinButton.propTypes = {
  bubble: PropTypes.bool
};

SpinButton.defaultProps = {};

export default withSpinnerControls()(SpinButton);
