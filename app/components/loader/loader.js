import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './loader.scss';
import { join } from '../../utilities/component';
import Background from './background';
import Spinner from './spinner';

class Loader extends PureComponent {
  render() {
    const { loading } = this.props;
    const className = join('loader', loading ? 'loader--loading' : 'loader--idling');

    return (
      <div className={className}>
        {loading && <Background />}
        {loading && <Spinner />}
      </div>
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.bool
};

export default Loader;
