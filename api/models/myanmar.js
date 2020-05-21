const mongoose = require('mongoose');

const myanmarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    totalCases: { type: String, required: true},
    death: { type: String, required: true},
    recovered: { type: String, required: true},
    newCases: { type: String, required: true}
}, { collection: 'myanmar'});

module.exports = mongoose.model('Myanmar', myanmarSchema);