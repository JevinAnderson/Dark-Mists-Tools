import React from 'react';
import PropTypes from 'prop-types';

import './formula-list.scss';
import Panel from '../panel/panel';
import FORMULAS from '../../constants/formulas.json';
import Formula from './formula';

const formulas = Object.keys(FORMULAS)
  .sort()
  .map(name => ({
    name,
    ...FORMULAS[name]
  }));

const FormulaList = props => {
  return (
    <Panel className="enchanters__formula-list">
      {formulas.map(formula => <Formula key={formula.name} {...formula} />)}
    </Panel>
  );
};

FormulaList.propTypes = {};

FormulaList.defaultProps = {};

export default FormulaList;
