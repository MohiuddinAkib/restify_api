const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//init app
const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () =>
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  )
);

const db = mongoose.connect;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  console.log(`Server started on port ${config.PORT}`);
});
