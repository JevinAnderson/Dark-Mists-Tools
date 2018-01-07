import withSpinnerControls from './with-spinner-controls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './container';
import SpinButton from './spin-button';
import Spinner from './spinner';

class Content extends Component {
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

    this.props.spin(true);
    setTimeout(() => {
      this.props.halt(true);
    }, 5000);
  }
  render() {
    return (
      <div className="Component Class">
        Spinning: {this.props.spinning}
        <button onClick={this.onClick}>Spin</button>
        <Container height="600px" width="600px" backgroundColor="red">
          <SpinButton />
        </Container>
        <Container height="600px" width="600px" backgroundColor="red">
          <SpinButton bubble />
          <Container>
            <SpinButton bubble />
          </Container>
        </Container>
      </div>
    );
  }
}

Content.propTypes = {
  spinning: PropTypes.bool,
  spin: PropTypes.func,
  halt: PropTypes.func
};

Content.defaultProps = {};

// export default Content;

export default withSpinnerControls()(Content);
