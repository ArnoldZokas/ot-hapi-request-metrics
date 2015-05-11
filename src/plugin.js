'use strict';

var joi = require('joi');

exports.register = function(plugin, options, next) {
    var validation = joi.validate(options, require('./schema').plugin);
    if(validation.error) {
        return next(validation.error);
    }

    plugin.ext('onPreResponse', function(req, reply) {
        var routeConfig = req.route.settings.plugins['ot-hapi-request-metrics'] || {};

        var validation = joi.validate(routeConfig, require('./schema').route);
        if(validation.error) {
            return req.server.log('error', validation.error);
        }

        reply.continue();
    });

    next();
};
