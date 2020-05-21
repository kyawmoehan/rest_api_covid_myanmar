const mongoose = require('mongoose');
const Regions = require('../models/regions');

exports.regions_get = (req, res) => {
    Regions.find({}, {'_id': 0, '__v': 0})
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};

exports.regions_post = (req, res) => {
    const regions = new Regions({
        _id: new mongoose.Types.ObjectId,
        ayeyarwady: req.body.ayeyarwady,
        bago: req.body.bago,
        chin: req.body.chin,
        kachin: req.body.kachin,
        kayah: req.body.kayah,
        kayin: req.body.kayin,
        magway: req.body.magway,
        mandalay: req.body.mandalay,
        mon: req.body.mon,
        rakhine: req.body.rakhine,
        shan: req.body.shan,
        sagaing: req.body.sagaing,
        tanintharyi: req.body.tanintharyi,
        yangon: req.body.yangon,
        naypyidaw: req.body.naypyidaw
    });
    regions
        .save()
        .then(result => {
            res.status(201).json({
                message: "Regions covid created",
                result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};

exports.regions_patch = (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Regions.updateOne({ _id: id }, { $set:updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Regions covid updated",
                ok: result.ok
            });
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};

exports.regions_delete = (req, res) => {
    const id = req.params.id;
    Regions.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Regions covid deleted",
                result: {
                    ok: result.ok,
                    deletedCount: result.deletedCount
                }
            });
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};