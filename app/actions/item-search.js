import { set } from '../utilities/actions';
import { SET_KEYWORD } from '../constants/item-search';

export const setKeyword = keyword => set(SET_KEYWORD, keyword);
