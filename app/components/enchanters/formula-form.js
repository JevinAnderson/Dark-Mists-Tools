import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bind, join } from '../../utilities/component';
import LabeledSelect from '../form-controls/labeled-select';
import LabeledInput from '../form-controls/labeled-input';
import Primary from '../buttons/primary';

const PartSelect = props => {
  const options = [];

  for (var i = 1; i <= 5; i++) {
    const key = `${i}`;
    options.push(
      <option key={key} value={i}>
        {key}
      </option>
    );
  }

  return (
    <LabeledSelect
      label="# of materials"
      className="enchanters__formula-form__part-select"
      {...props}
    >
      {options}
    </LabeledSelect>
  );
};

class FormulaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      affects: '',
      parts: 5
    };

    bind(this, 'updateName', 'updateAffects', 'updateParts', 'save');
  }

  updateName({ target: { value: name } }) {
    this.setState({ name });
  }

  updateAffects({ target: { value: affects } }) {
    this.setState({ affects });
  }

  updateParts({ target: { value } }) {
    const parts = Number(value);

    this.setState({ parts });
  }

  save() {
    let error;
    const { name, affects } = this.state;

    if (!name || !name.trim()) {
      error = 'A name is required for a formula.';
    }

    if (!affects || !affects.trim()) {
      error = join(error && 'Affects are required for a formula.');
    }

    this.setState({ error });

    if (error) return;

    this.persist();
  }

  persist() {
    let { name, affects, parts } = this.state;
    name = name.trim();
    affects = affects.trim();

    firebase.database().ref(`formulas/${name}`).set({ name, affects, parts }).then(this.logResults).catch(this.logError);
  }

  logResults(...args) {
    console.log('%cResults', 'color: blue', ...args);
  }

  logError(...args) {
    console.log('%cError: ', 'color: red', ...args);
  }

  render() {
    const { name, affects, parts, error } = this.state;
    const { updateName, updateAffects, updateParts } = this;

    return (
      <div className="enchanters__formula-form">
        <LabeledInput label="Name" value={name} onChange={updateName} />
        <LabeledInput
          label="Affects"
          value={affects}
          onChange={updateAffects}
        />
        <PartSelect value={parts} onChange={updateParts} />
        {error && <span className="error">{error}</span>}
        <Primary onClick={this.save}>Save</Primary>
      </div>
    );
  }
}

FormulaForm.propTypes = {};

FormulaForm.defaultProps = {};

export default FormulaForm;
