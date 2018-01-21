import { set } from '../utilities/actions';
import { SET_ITEMS } from '../constants/items';

const API_ROOT = process.env.NODE_ENV === 'production'  || true ? 'http://api.dm.jevinanderson.com' : 'http://127.0.0.1:2008';

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const toJson = results => results.json();
const sanitizeItem = ({ date_posted, ...rest }) => ({ ...rest });

export const setItems = items => set(SET_ITEMS, items);
export const fetchItems = () => dispatch => {
  fetch(`${API_ROOT}/items`)
    .then(toJson)
    .then(items => dispatch(setItems(items)))
    .catch(console.error);
};

export const createItem = item =>
  fetch(`${API_ROOT}/items`, {
    headers: JSON_HEADERS,
    method: 'post',
    body: JSON.stringify(sanitizeItem(item))
  });

export const editItem = item => dispatch => {
  fetch(`${API_ROOT}/items/${item.id}`, {
    headers: JSON_HEADERS,
    method: 'put',
    body: JSON.stringify(sanitizeItem(item))
  })
    .then(() => dispatch(fetchItems()))
    .catch(console.error);
};

export const removeItem = id => dispatch => {
  fetch(`${API_ROOT}/items/${id}`, {
    headers: JSON_HEADERS,
    method: 'delete'
  })
    .then(() => dispatch(fetchItems()))
    .catch(console.error);
};
