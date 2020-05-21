const mongoose = require('mongoose');

const regionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ayeyarwady: { type: String, required: true},
    bago: { type: String, required: true},
    chin: { type: String, required: true},
    kachin: { type: String, required: true},
    kayah: { type: String, required: true},
    kayin: { type: String, required: true},
    magway: { type: String, required: true},
    mandalay: { type: String, required: true},
    mon: { type: String, required: true},
    rakhine: { type: String, required: true},
    shan: { type: String, required: true},
    sagaing: { type: String, required: true},
    tanintharyi: { type: String, required: true},
    yangon: { type: String, required: true},
    naypyidaw: { type: String, required: true},
}, { collection: 'regions'});

module.exports = mongoose.model('Regions', regionsSchema);