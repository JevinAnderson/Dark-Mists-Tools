const firebase = require('firebase');
const path = require('path');
const fs = require('fs');

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAv3C21gFPUqwE6hK1flhfK6_t-UM8dUe4',
  authDomain: 'dark-mists-tools.firebaseapp.com',
  databaseURL: 'https://dark-mists-tools.firebaseio.com',
  projectId: 'dark-mists-tools',
  storageBucket: 'dark-mists-tools.appspot.com',
  messagingSenderId: '644570721333'
});

const ref = firebase.database().ref('items');
ref
  .once('value')
  .then(printValues)
  .catch(console.log)
  .then(process.exit);

function printValues(snapshot) {
  const snapshotValue = snapshot.val() || {};
  const items = Object.entries(snapshotValue).map(([key, value]) => ({
    id: key,
    ...value
  }));

  const json = JSON.stringify(items, null, 2);
  fs.writeFileSync(path.join(__dirname, 'items.json'), json, 'utf-8');
  console.log(items);
  return items;
}
