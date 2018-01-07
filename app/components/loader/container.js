import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from './loader';

const mapStateToProps = ({ loader: { loading } }) => ({ loading });

export default connect(mapStateToProps)(Loader);
