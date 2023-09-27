('use strict');
const recordSchema = require('../model/records');


// function to save records into database
module.exports.addRecord = (data) => {
    return new Promise((resolve, reject) => {
        recordSchema(data).save().then(record => {
            resolve(record)
        }).catch((err) => reject(err));
    });
}


// function to get all records from database
module.exports.allRecords = (data) => {
    return new Promise((resolve, reject) => {
        recordSchema.find({}).then(record => {
            resolve(record)
        }).catch((err) => reject(err));
    });
}