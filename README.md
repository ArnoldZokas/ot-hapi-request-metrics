# ot-hapi-request-metrics
> StatsD request metrics plugin for Hapi

[![Build Status](https://semaphoreci.com/api/v1/projects/2806c7f3-3e5b-4a33-a500-6dd385e08088/419236/badge.svg)](https://semaphoreci.com/ArnoldZokas/ot-hapi-request-metrics)[![Dependency Status](https://david-dm.org/ArnoldZokas/ot-hapi-request-metrics.svg)](https://david-dm.org/ArnoldZokas/ot-hapi-request-metrics) [![NPM version](https://badge.fury.io/js/ot-hapi-request-metrics.svg)](http://badge.fury.io/js/ot-hapi-request-metrics)

[![NPM](https://nodei.co/npm/ot-hapi-request-metrics.png?downloads=true&stars=true)](https://nodei.co/npm/ot-hapi-request-metrics)

## Usage
### 1) Install NPM Package
```
$ npm i ot-hapi-request-metrics --save
```
### 2) Register Plugin
```
var server = new (require('hapi').Server)();
server.connection({ port: 3000 });

server.register([
    {
        register: require('ot-hapi-request-metrics'),
        options: {
            application: 'partner',
            environment: 'prod',
            dataCentre: 'sc'
        }
    }
], function(err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.start();
});
```
### 3) Configure Routes
```
server.route(
    {
        method: 'GET',
        path: '/path/to/resource',
        handler: function(req, reply) {
            reply().code(200);
        },
        config: {
            plugins: {
                'ot-hapi-request-metrics': {
                    endpoint: 'get-resource',
                    version: '1'
                }
            }
        }
    }
);

```
### 4) Configure Dashboards
This plugin increments a counter and sets timing on every request. The path of counter and timing are generated based on information collected from plugin configuration, route configuration and request context, e.g.:

`statsd.counters.partner.prod.sc.sc-partner-01.http-request-in.legacy_api_bridge.get_details-v1.success.get.200`

## Configuration
### Global Configuration
- **application** - application name (ideally, this should match discovery service type)
- **environment** - environment (prod, qa or dev)
- **dataCentre** - ln, sc, pp-sf, etc.

### Route Configuration
- **endpoint** - name of the endpoint
- **version** - version of the endpoint

## Release History
- **v0.0.1** (2015-05-08)
    - initial release
