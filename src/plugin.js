'use strict';

var joi = require('joi');

exports.register = function(plugin, options, next) {
    var validation = joi.validate(options, require('./schema'));
    if(validation.error) {
        return next(validation.error);
    }

    next();
};
