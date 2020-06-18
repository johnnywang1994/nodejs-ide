const path = require('path')
const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();

app.use(history());
app.set('port', process.env.PORT || 8080);
app.use('/', express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.end('Error 404, Page not found...');
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port: ' + app.get('port'));
});

