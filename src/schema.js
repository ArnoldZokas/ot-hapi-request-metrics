'use strict';

var joi = require('joi');

module.exports = {
    plugin: {
        host: joi.string().required(),
        application: joi.string().required(),
        environment: joi.string().required(),
        dataCentre: joi.string().required()
    },
    route: {
        endpoint: joi.string().required(),
        version: joi.string().required()
    }
};
