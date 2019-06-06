const express = require('express');
const morgan = require('morgan');
const open = require('open');

const app = express();

app.use(morgan('dev'));
app.use(express.static('./docs'));

const port = 12345;
app.listen(12345, error => {
  if (error) {
    console.log('Application startup error', error);
    process.exit(-1);
  }

  const url = `http://127.0.0.1:${port}`;

  console.log(`Application started. Go to ${url} in your browser.`);
  open(url);
});
