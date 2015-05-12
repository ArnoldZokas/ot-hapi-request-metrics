'use strict';

var expect = require('expect.js'),
    os     = require('os'),
    rewire = require('rewire');

var plugin = rewire('../src/plugin.js');

describe('onPreResponse', function() {
    it('it should write metrics to statsd', function(done) {
        plugin.register({
            ext: function(_, handler) {
                plugin.__set__('statsd', {
                    increment: function(name) {
                        expect(name).to.equal('test-application.test-environment.test-dataCentre.' + os.hostname().replace(/\./g, '_') + '.http-request-in.test-service.test-endpoint-vtest-version.success.get.200');
                    },
                    timing: function(name, value) {
                        expect(name).to.equal('test-application.test-environment.test-dataCentre.' + os.hostname().replace(/\./g, '_') + '.http-request-in.test-service.test-endpoint-vtest-version.success.get.200');
                        expect(value).to.be.greaterThan(0);
                    }
                });

                handler({
                    headers: {
                        'ot-referringservice': 'test-service'
                    },
                    info: {
                        received: new Date()
                    },
                    method: 'get',
                    response: {
                        statusCode: 200
                    },
                    route: {
                        settings: {
                            plugins: {
                                'ot-hapi-request-metrics': {
                                    endpoint: 'test-endpoint',
                                    version: 'test-version'
                                }
                            }
                        }
                    }
                }, {
                    continue: function() {
                        done();
                    }
                });
            }
        }, { host: 'test-host', application: 'test-application', environment: 'test-environment', dataCentre: 'test-dataCentre' }, function() {});
    });
});
