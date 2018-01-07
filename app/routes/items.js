import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './items.scss';
import { bind } from '../utilities/component';
import { setItems } from '../actions/items';
import List from '../components/items/list';
import Search from '../components/items/search';

class Items extends Component {
  constructor(props) {
    super(props);

    bind(this, 'createItem', 'editItem', 'onSnapshot', 'removeItem');
  }

  componentDidMount() {
    const ref = firebase.database().ref('items');

    ref.on('value', this.onSnapshot, this);
  }

  createItem(item) {
    const ref = firebase.database().ref('items');
    const itemRef = ref.push();

    itemRef.set(item);
  }

  editItem(item) {
    const ref = firebase.database().ref(`items/${item.id}`);

    ref.set(item);
  }

  removeItem(id) {
    const ref = firebase.database().ref(`items/${id}`);

    ref.remove();
  }

  firebaseToClient(value) {
    return Object.keys(value).map(id => ({ id, ...value[id] }));
  }

  onSnapshot(snapshot) {
    const value = snapshot.val();
    const items = this.firebaseToClient(value);

    this.props.setItems(items);
  }

  render() {
    return (
      <div className="items-route">
        <Search createItem={this.createItem} />
        <List editItem={this.editItem} removeItem={this.removeItem} />
      </div>
    );
  }
}

Items.propTypes = {
  setItems: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps, { setItems })(Items);
