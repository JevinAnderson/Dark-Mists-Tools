import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Panel from '../panel/panel';
import * as ItemSearchActions from '../../actions/item-search';
import Input from '../form-controls/input';
import Select from '../form-controls/select';
import Button from '../buttons/default';
import PrimaryButton from '../buttons/primary';
import DangerButton from '../buttons/danger';
import ModalEditor from './modal-editor';
import LabeledSelect from '../form-controls/labeled-select';
import Materials from '../../constants/materials';
import throttle from 'lodash/throttle';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [...props.keywords]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keywords !== this.props.keywords) {
      this.setState({
        keywords: [...nextProps.keywords]
      });
    }
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
  }, 1000);

  updateKeywordsSearchType = ({ target: { value } }) => {
    this.props.setKeywordsSearchType(value);
  };

  updatePulsing = ({ target: { value } }) => {
    this.props.setPulsing(value);
  };

  updateMaterial = ({ target: { value } }) => {
    this.props.setMaterial(value);
  };

  render = () => (
    <Panel className="items__advanced-search">
      <Panel>
        <Button onClick={this.props.toggleAdvancedSearch}>Simple Search</Button>
      </Panel>
      <Panel>
        {this.state.keywords.map((keyword, index) => (
          <Input key={index} data-keyword-index={index} onChange={this.updateKeywords} value={keyword} />
        ))}
        <div className="items__advanced-search__keyword-search-type-select">
          <Select value={this.props.keywordsSearchType} onChange={this.updateKeywordsSearchType}>
            <option value="all">Must have ALL Keywords</option>
            <option value="any">May contain any Keyword</option>
          </Select>
        </div>
        <DangerButton onClick={this.removeKeyword}>Remove Keyword</DangerButton>
        <PrimaryButton onClick={this.addKeyword}>Add Keyword</PrimaryButton>
      </Panel>
      <Panel>
        <LabeledSelect label="Include Pulsing Items" value={this.props.pulsing} onChange={this.updatePulsing}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </LabeledSelect>
        <LabeledSelect label="Filter by material" value={this.props.material} onChange={this.updateMaterial}>
          <option value="any" className="value">
            Any material
          </option>
          {Materials.map((material, index) => (
            <option key={material} value={index}>
              {material}
            </option>
          ))}
        </LabeledSelect>
      </Panel>
    </Panel>
  );
}

AdvancedSearch.propTypes = {
  keywords: PropTypes.array,
  keywordsSearchType: PropTypes.string,
  setKeywordsSearchType: PropTypes.func,
  setKeywords: PropTypes.func,
  toggleAdvancedSearch: PropTypes.func
};

AdvancedSearch.defaultProps = {
  keywords: [''],
  keywordsSearchType: 'any',
  pulsing: 'yes',
  material: 'any'
};

const mapStateToProps = ({ item_search }) => item_search;

export default connect(
  mapStateToProps,
  ItemSearchActions
)(AdvancedSearch);
