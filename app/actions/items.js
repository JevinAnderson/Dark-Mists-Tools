import { set } from '../utilities/actions';
import { SET_ITEMS } from '../constants/items';

export const setItems = items => set(SET_ITEMS, items);
