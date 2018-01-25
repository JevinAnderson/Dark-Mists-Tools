import { combineReducers } from 'redux';

import items from './items';
import item_search from './item-search';
import formula_search from './formula-search';
import loader from './loader';
import user from './user';

export default combineReducers({ items, item_search, loader, user, formula_search });
