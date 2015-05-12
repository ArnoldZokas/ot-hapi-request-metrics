'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('route option validation', function() {
    describe('given null endpoint', function() {
        it('should return error', function() {
            plugin.register({
                ext: function(_, handler) {
                    handler({
                        route: {
                            settings: {
                                plugins: {
                                    'ot-hapi-request-metrics': {
                                        endpoint: null,
                                        version: '1'
                                    }
                                }
                            }
                        },
                        server: {
                            log: function(tag, err) {
                                expect(tag).to.equal('error');
                                expect(err.toString()).to.equal('ValidationError: child "endpoint" fails because ["endpoint" must be a string]');
                            }
                        }
                    }, null);
                }
            }, { host: 'test', application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
        });
    });

    describe('given empty endpoint', function() {
        it('should return error', function() {
            plugin.register({
                ext: function(_, handler) {
                    handler({
                        route: {
                            settings: {
                                plugins: {
                                    'ot-hapi-request-metrics': {
                                        endpoint: '',
                                        version: '1'
                                    }
                                }
                            }
                        },
                        server: {
                            log: function(tag, err) {
                                expect(tag).to.equal('error');
                                expect(err.toString()).to.equal('ValidationError: child "endpoint" fails because ["endpoint" is not allowed to be empty]');
                            }
                        }
                    }, null);
                }
            }, { host: 'test', application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
        });
    });

    describe('given null version', function() {
        it('should return error', function() {
            plugin.register({
                ext: function(_, handler) {
                    handler({
                        route: {
                            settings: {
                                plugins: {
                                    'ot-hapi-request-metrics': {
                                        endpoint: 'test',
                                        version: null
                                    }
                                }
                            }
                        },
                        server: {
                            log: function(tag, err) {
                                expect(tag).to.equal('error');
                                expect(err.toString()).to.equal('ValidationError: child "version" fails because ["version" must be a string]');
                            }
                        }
                    }, null);
                }
            }, { host: 'test', application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
        });
    });

    describe('given empty version', function() {
        it('should return error', function() {
            plugin.register({
                ext: function(_, handler) {
                    handler({
                        route: {
                            settings: {
                                plugins: {
                                    'ot-hapi-request-metrics': {
                                        endpoint: 'test',
                                        version: ''
                                    }
                                }
                            }
                        },
                        server: {
                            log: function(tag, err) {
                                expect(tag).to.equal('error');
                                expect(err.toString()).to.equal('ValidationError: child "version" fails because ["version" is not allowed to be empty]');
                            }
                        }
                    }, null);
                }
            }, { host: 'test', application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
        });
    });
});
