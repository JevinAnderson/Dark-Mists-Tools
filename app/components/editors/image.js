import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './image.scss';
import { bind } from '../../utilities/component';
import { ListenerBuilder } from '../../utilities/key-codes';
import Input from '../form-controls/input';
import Button from '../buttons/primary';
import ListGroupItem from '../list-group/list-group-item';
import ListGroupItemText from '../list-group/list-group-item-text';
import ListGroupItemHeading from '../list-group/list-group-item-heading';

class Image extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.mapPropsToState(props);

    bind(this, 'start', 'onChange', 'save');

    this.onKeyDown = ListenerBuilder()
      .listenForEscapeKey()
      .listenForEnterKey()
      .setHandler(this.save)
      .createListener();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value === nextProps.value) return;

    const state = this.mapPropsToState(nextProps);
    this.setState(state);
  }

  mapPropsToState({ value = '' }) {
    return { value };
  }

  start() {
    this.setState({ editing: true });
  }

  stop() {
    this.setState({ editing: false });
  }

  onChange({ target: { value } }) {
    this.setState({ value });
  }

  save() {
    const {
      props: { update, value: initial },
      state: { value }
    } = this;

    if (value && value !== initial) {
      update(value);
    }

    this.stop();
  }

  render() {
    return (
      <div className="editors__image">
        {this.state.editing ? (
          <ListGroupItem className="editors__image__edit-container">
            <Input value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown} />
            <Button onClick={this.save}>Save</Button>
          </ListGroupItem>
        ) : (
          <ListGroupItem className="editors__image__display-container" onClick={this.start}>
            {this.props.placeholder && <ListGroupItemHeading>{this.props.placeholder}</ListGroupItemHeading>}
            <img src={this.props.value} alt={this.props.alt} className="editors__image__display-image" />
          </ListGroupItem>
        )}
      </div>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  update: PropTypes.func
};

export default Image;
