import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const filtered = ({ keywords, keywordsSearchType }, { value }) => {
  if (!keywords.length) return false;

  if (keywordsSearchType === 'any') {
    if (keywords.every(keyword => value.indexOf(keyword.toLowerCase()) === -1)) {
      return true;
    }
  } else {
    if (keywords.some(keyword => value.indexOf(keyword.toLowerCase()) === -1)) {
      return true;
    }
  }

  return false;
};

const FormulaList = props => {
  console.log(props);
  return (
    <Panel className="enchanters__formula-list">
      {formulas.map(formula => <Formula key={formula.name} filtered={filtered(props, formula)} {...formula} />)}
    </Panel>
  );
};

FormulaList.propTypes = {
  keywords: PropTypes.array,
  keywordsSearchType: PropTypes.string
};

FormulaList.defaultProps = {
  keywords: [],
  keywordsSearchType: 'any'
};

const mapStateToProps = ({ formula_search }) => formula_search;

export default connect(mapStateToProps)(FormulaList);
