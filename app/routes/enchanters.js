import React from 'react';

import FormulaSearch from '../components/enchanters/formula-search';
import FormulaList from '../components/enchanters/formula-list';

const Enchanters = props => (
  <div className="enchanters-route">
    <FormulaSearch />
    <FormulaList />
  </div>
);

export default Enchanters;
