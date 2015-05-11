'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('plugin option validation', function() {
    describe('given null application', function() {
        it('should return error', function() {
            plugin.register(null, { application: null, environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "application" fails because ["application" must be a string]');
            });
        });
    });

    describe('given empty application', function() {
        it('should return error', function() {
            plugin.register(null, { application: '', environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "application" fails because ["application" is not allowed to be empty]');
            });
        });
    });

    describe('given null environment', function() {
        it('should return error', function() {
            plugin.register(null, { application: 'test', environment: null, dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "environment" fails because ["environment" must be a string]');
            });
        });
    });

    describe('given empty environment', function() {
        it('should return error', function() {
            plugin.register(null, { application: 'test', environment: '', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "environment" fails because ["environment" is not allowed to be empty]');
            });
        });
    });

    describe('given null dataCentre', function() {
        it('should return error', function() {
            plugin.register(null, { application: 'test', environment: 'test', dataCentre: null }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "dataCentre" fails because ["dataCentre" must be a string]');
            });
        });
    });

    describe('given empty dataCentre', function() {
        it('should return error', function() {
            plugin.register(null, { application: 'test', environment: 'test', dataCentre: '' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "dataCentre" fails because ["dataCentre" is not allowed to be empty]');
            });
        });
    });

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
            }, { application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
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
            }, { application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
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
            }, { application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
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
            }, { application: 'test', environment: 'test', dataCentre: 'test' }, function() {});
        });
    });
});
