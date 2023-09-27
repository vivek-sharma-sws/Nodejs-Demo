const mongoose = require('mongoose');
const MasterEnum = require('../config/index');


const connectDB = async () => {
  const conn = await mongoose.connect(MasterEnum.SERVER_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  
};

module.exports = connectDB;