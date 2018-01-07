import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './spinner';
import Content from './content';

class SpinnerTest extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillReceiveProps(nextProps) {}
  // shouldComponentUpdate(nextProps, nextState) { return true; }
  // componentWillUpdate(nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}
  render() {
    return (
      <div className="Component Class">
        <Spinner>
          <Content />
        </Spinner>
      </div>
    );
  }
}

SpinnerTest.propTypes = {};

SpinnerTest.defaultProps = {};

export default SpinnerTest;
