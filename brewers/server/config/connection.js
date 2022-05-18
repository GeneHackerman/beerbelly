const mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {  // REPLACE TH API
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {  // API MUST BE REPLACED
>>>>>>> d8bf34e12baa0eaa8b9ce0438e51ba20c0be9d00
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
module.exports = mongoose.connection;
