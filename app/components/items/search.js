import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './search.scss';
import Panel from '../panel/panel';
import { setKeyword } from '../../actions/item-search';
import { bind } from '../../utilities/component';
import Input from '../form-controls/input';
import Button from '../buttons/default';
import PrimaryButton from '../buttons/primary';
import ModalEditor from './modal-editor';

const UPDATE_KEYS = ['keyword'];

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = this.mapPropsToState(props);
    this.state.item = {};

    bind(
      this,
      'edit',
      'stopEditing',
      'updateItem',
      'saveItem',
      'onKeyPress',
      'update',
      'updateKeyword'
    );
  }

  componentWillReceiveProps(nextProps) {
    if (UPDATE_KEYS.some(key => nextProps[key] !== this.props[key])) {
      const state = this.mapPropsToState(nextProps);

      this.setState(state);
    }
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      this.update();
    }
  }

  edit() {
    this.setState({ editing: true });
  }

  stopEditing() {
    this.setState({ editing: false });
  }

  updateItem(item) {
    this.setState({ item });
  }

  saveItem(item) {
    this.setState({
      editing: false,
      item: {}
    });

    this.props.createItem(item);
  }

  mapPropsToState({ keyword }) {
    return { keyword };
  }

  updateKeyword({ target: { value: keyword } }) {
    this.setState({ keyword });
  }

  update() {
    if (this.props.keyword !== this.state.keyword) {
      this.props.setKeyword(this.state.keyword);
    }
  }

  render() {
    return (
      <Panel className="items__search">
        <Input
          type="text"
          className="items__search__keyword-input"
          value={this.state.keyword}
          onChange={this.updateKeyword}
          placeholder="Search"
          onKeyPress={this.onKeyPress}
        />{' '}
        <Button onClick={this.update}>Submit</Button>{' '}
        {this.props.user && (
          <PrimaryButton onClick={this.edit}>Create Item</PrimaryButton>
        )}
        {this.state.editing && (
          <ModalEditor
            header="Create Item"
            item={this.state.item}
            open={this.state.editing}
            close={this.stopEditing}
            updateItem={this.saveItem}
          />
        )}
      </Panel>
    );
  }
}

Search.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.func,
  createItem: PropTypes.func
};

Search.defaultProps = {};

const mapStateToProps = ({ user, item_search }, ownProps) => ({
  user,
  ...item_search,
  ...ownProps
});

export default connect(mapStateToProps, { setKeyword })(Search);
