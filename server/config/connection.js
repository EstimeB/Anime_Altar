// importing mongoose
const mongoose = require('mongoose');

//  mongoose wraps around the local connection to mongoDB 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aAlterDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
//  exporting the connection
  module.exports = mongoose.connection;
  