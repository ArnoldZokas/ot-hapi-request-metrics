'use strict';

var joi    = require('joi'),
    os     = require('os'),
    Statsd = require('statsd-client');

var hostname = os.hostname().replace(/\./g, '_'),
    statsd;

exports.register = function(plugin, options, next) {
    var pluginOptionValidationResult = joi.validate(options, require('./schema').plugin);
    if(pluginOptionValidationResult.error) {
        return next(pluginOptionValidationResult.error);
    }

    statsd = new Statsd({ host: options.host });

    plugin.ext('onPreResponse', function(req, reply) {
        var routeConfig = req.route.settings.plugins['ot-hapi-request-metrics'] || {};

        var routeOptionValidationResult = joi.validate(routeConfig, require('./schema').route);
        if(routeOptionValidationResult.error) {
            req.server.log('error', routeOptionValidationResult.error);
            return reply.continue();
        }

        var referrer   = req.headers['ot-referringservice'] || 'unknown',
            endpoint   = routeConfig.endpoint || 'unknown',
            version    = routeConfig.version ? '-v' + routeConfig.version : '',
            statusCode = req.response.statusCode || req.response.output.payload.statusCode,
            status     = (statusCode >= 200 && statusCode <= 399) ? 'success' : 'failure';

        var metricPath = options.application + '.' + options.environment + '.' + options.dataCentre + '.' + hostname + '.http-request-in.' + referrer + '.' + endpoint + version + '.' + status + '.' + req.method + '.' + statusCode;

        statsd.increment(metricPath);
        statsd.timing(metricPath, new Date() - req.info.received);

        return reply.continue();
    });

    next();
};
