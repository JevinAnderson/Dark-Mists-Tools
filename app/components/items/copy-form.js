import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import get from 'lodash/get';

import { createItem } from '../../actions/items';
import { bind, merge } from '../../utilities/component';
import { escapeHtml, revertEscapeHtml } from '../../utilities/sanitize';
import { capitalizeFirstLetter } from '../../utilities/strings';
import MATERIALS from '../../constants/materials';
import PULSING_INDICATORS from '../../constants/pulsing-indicators';
import LabeledInput from '../form-controls/labeled-input';
import LabeledSelect from '../form-controls/labeled-select';
import InputGroup from '../form-controls/input-group';
import deriveProps from '../higher-order-components/derive-props';

class CopyForm extends Component {
  state = {
    items: []
  };

  doesTagPulse(tag) {
    return PULSING_INDICATORS.some(indicator => tag.indexOf(indicator) !== -1) ? 1 : 0;
  }

  materialFromTag(tag) {
    let material = (tag.match(/Material is (.*)\./g) || [''])[0].replace('Material is ', '').replace('.', '');
    material = capitalizeFirstLetter(material);
    const materialValue = MATERIALS.indexOf(material);

    return materialValue === -1 ? 0 : materialValue;
  }

  updateItems = throttle(value => {
    const tags = value.split('\n\n').filter(tag => /^Object/.test(tag));
    const items = tags.map(this.tagToItem);
    console.log('updateItems items', items);

    this.setState({ items });
  }, 1000);

  tagToItem = tag => ({
    tag: escapeHtml(tag),
    author: 'Quenton',
    material: this.materialFromTag(tag),
    pulsing: this.doesTagPulse(tag),
    area: this.refs.area.value
  });

  onChange = ({ target: { value } }) => {
    this.updateItems(value);
  };

  post = event => {
    this.state.items.forEach(createItem);
  };
  render = () => (
    <div className="Component Class">
      <input type="text" ref="area" />
      <textarea ref="tag" onChange={this.onChange} />
      <button onClick={this.post}>Post!</button>
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </div>
  );
}

CopyForm.propTypes = {};

CopyForm.defaultProps = {};

export default CopyForm;
