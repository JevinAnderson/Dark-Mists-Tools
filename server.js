const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('./docs'))

app.listen(12345, error => {
  if (error) {
    console.log('Application startup error', error);
    process.exit(-1);
  }

  console.log('Application started. Go to http://127.0.0.1:12345 in your browser.');
});
