const mongoose = require('mongoose');
const Myanmar = require('../models/myanmar');

exports.myanmar_get = (req, res) => {
    Myanmar.find({}, { '_id': 0})
        .select('totalCases death recovered newCases')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};

exports.myanmar_post = (req, res) => {
    const myanmar = new Myanmar({
        _id: new mongoose.Types.ObjectId,
        totalCases: req.body.totalCases,
        death: req.body.death,
        recovered: req.body.recovered,
        newCases: req.body.newCases
    });
    myanmar
        .save()
        .then(result => {
            res.status(201).json({
                message: "Myanmar covid created",
                result: {
                    totalCases: result.totalCases,
                    death: result.death,
                    recovered: result.recovered,
                    newCases: result.newCases
                }
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.myanmar_patch = (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Myanmar.updateOne({ _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Myanmar covid updated",
                ok: result.ok
            });
        })
        .catch(err => {
            res.status(500).json( { error: err });
        });
};

exports.myanmar_delete = (req, res) => {
    const id = req.params.id;
    Myanmar.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Myanmar covid deleted",
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