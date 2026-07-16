const mongoose = require('mongoose');

async function conenctToMongodb(){
    return mongoose.connect(process.env.MONGO_URL);
};

module.exports = {conenctToMongodb}; 