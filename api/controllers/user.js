const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_signup = (req, res) => {
    User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if(user) {
                return res.status(409).json({
                    message: 'Email exit'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({ error: err});
                    } else {
                        const newUser = new User({
                            _id : new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        });
                        newUser
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({ error: err});
                            });
                    }
                });
            }
        });
};

exports.user_login = (req, res) => {
    User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: "Auth fail"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Auth fail"
                    });
                }
                if(result) {
                    const token = jwt.sign(
                        {
                            _id: user[0]._id,
                            email: user[0].email
                        },
                        "covid19",
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth fail"
                });
            });
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
};

exports.user_delete = (req, res) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User deleted"
        });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });    
};