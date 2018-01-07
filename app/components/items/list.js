import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Panel from '../panel/panel';
import Item from './item';

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  isItemVisible(item) {
    const { keyword } = this.props;

    return (
      !keyword || item.tag.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    );
  }

  render() {
    const { items = [], user, editItem, removeItem } = this.props;

    return (
      <Panel className="items__list">
        {items.map(item =>
          <Item
            key={item.id}
            user={user}
            item={item}
            editItem={editItem}
            removeItem={removeItem}
            filtered={this.isItemVisible(item)}
          />
        )}
      </Panel>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  keyword: PropTypes.string,
  user: PropTypes.object,
  editItem: PropTypes.func,
  removeItem: PropTypes.func
};

const mapStateToProps = ({ items, item_search: { keyword }, user }, ownProps) => ({
  items,
  keyword,
  user,
  ...ownProps
});

export default connect(mapStateToProps)(List);
