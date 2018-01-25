import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './formula-search.scss';
import Panel from '../panel/panel';
import * as FormulaSearchActions from '../../actions/formula-search';
import Input from '../form-controls/input';
import Select from '../form-controls/select';
import Button from '../buttons/default';
import PrimaryButton from '../buttons/primary';
import DangerButton from '../buttons/danger';
import throttle from 'lodash/throttle';

class FormulaSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [...props.keywords]
    };
  }

  addKeyword = () => {
    this.setStateKeywords([...this.props.keywords, '']);
  };

  removeKeyword = () => {
    const keywords = [...this.props.keywords];
    keywords.pop();

    this.setStateKeywords(keywords);
  };

  updateKeywords = ({ target }) => {
    const index = parseInt(target.getAttribute('data-keyword-index'), 10);
    const keyword = target.value;
    const keywords = [...this.props.keywords];
    keywords.splice(index, 1, keyword);

    this.setStateKeywords(keywords);
  };

  setStateKeywords = keywords => {
    this.setState({ keywords }, this.setPropKeywords);
  };

  setPropKeywords = throttle(() => {
    this.props.setKeywords(this.state.keywords);
  }, 500);

  updateKeywordsSearchType = ({ target: { value } }) => {
    this.props.setKeywordsSearchType(value);
  };

  render = () => (
    <Panel className="enchanters__formula-search">
      {this.state.keywords.map((keyword, index) => (
        <Input key={index} data-keyword-index={index} onChange={this.updateKeywords} value={keyword} />
      ))}
      <div>
        <Select value={this.props.keywordsSearchType} onChange={this.updateKeywordsSearchType}>
          <option value="all">Must have ALL Keywords</option>
          <option value="any">May contain any Keyword</option>
        </Select>
      </div>
      <DangerButton onClick={this.removeKeyword}>Remove Keyword</DangerButton>
      <PrimaryButton onClick={this.addKeyword}>Add Keyword</PrimaryButton>
    </Panel>
  );
}

FormulaSearch.defaultProps = {
  keywords: [''],
  keywordsSearchType: 'any'
};

const mapStateToProps = ({ formula_search }) => formula_search;

export default connect(mapStateToProps, FormulaSearchActions)(FormulaSearch);
