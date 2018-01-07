import * as Constants from '../constants/item-search';
import { merge } from '../utilities/component';

const initialState = {
  keyword: ''
};

const SETTERS = {
  [Constants.SET_KEYWORD]: 'keyword'
};

export default function itemSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  const key = SETTERS[type];
  if (key) {
    return merge(state, { [key]: payload });
  }

  switch (type) {
    default:
      return state;
  }
}
