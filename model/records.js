('use strict');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    fromEmail: String,
    toEmail: String,
    latLng:{
        type:[Number],
        index: '2dsphere',
    },
    DueDate: Date,
    status: {
        type: String,
        enum: ["INCOMPLETED", "LOWRISK", "NEEDREVIEW"],
        default: "INCOMPLETED"
    },
    active: {
        type: Boolean,
        default: true
    },
    delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('records', Schema);