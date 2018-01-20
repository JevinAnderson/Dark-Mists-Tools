import React from 'react';
import PropTypes from 'prop-types';

import ListGroup from '../list-group/list-group';
import ListGroupItem from '../list-group/list-group-item';
import ListGroupItemHeading from '../list-group/list-group-item-heading';
import ListGroupItemText from '../list-group/list-group-item-text';

const style = filtered => ({
  display: filtered ? 'hidden' : undefined
});

const Formula = ({ name, value, materials, count, filtered }) => (
  <ListGroup className="enchanters__formula" style={style(filtered)}>
    <ListGroupItem>
      <ListGroupItemHeading>{name}</ListGroupItemHeading>
    </ListGroupItem>
    <ListGroupItem>
      <ListGroupItemHeading>Affects</ListGroupItemHeading>
      <ListGroupItemText>{value}</ListGroupItemText>
    </ListGroupItem>
    <ListGroupItem>
      <ListGroupItemHeading>Count</ListGroupItemHeading>
      <ListGroupItemText>{count}</ListGroupItemText>
    </ListGroupItem>
    {materials && (
      <ListGroupItem>
        <ListGroupItemHeading>Materials</ListGroupItemHeading>
        <ListGroupItemText>{materials}</ListGroupItemText>
      </ListGroupItem>
    )}
  </ListGroup>
);

Formula.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  count: PropTypes.number,
  materials: PropTypes.any
};

Formula.defaultProps = {};

export default Formula;
