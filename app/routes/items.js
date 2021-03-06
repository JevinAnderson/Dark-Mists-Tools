import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './items.scss';
import { bind } from '../utilities/component';
import * as itemActions from '../actions/items';
import List from '../components/items/list';
import Search from '../components/items/search';
import { editItem, removeItem } from '../actions/items';

let needsToFetchOnMount = true;

class Items extends Component {
  componentDidMount() {
    if (needsToFetchOnMount) {
      this.props.fetchItems();
      needsToFetchOnMount = false;
    }
  }

  render() {
    const { createItem, editItem, removeItem } = this.props;

    return (
      <div className="items-route">
        <Search createItem={createItem} />
        <List editItem={editItem} removeItem={removeItem} />
      </div>
    );
  }
}

Items.propTypes = {
  fetchItems: PropTypes.func,
  createItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(
  mapStateToProps,
  itemActions
)(Items);
