'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('plugin option validation', function() {
    describe('given null host', function() {
        it('should return error', function() {
            plugin.register(null, { host: null, application: null, environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "host" fails because ["host" must be a string]');
            });
        });
    });

    describe('given empty host', function() {
        it('should return error', function() {
            plugin.register(null, { host: '', application: 'test', environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "host" fails because ["host" is not allowed to be empty]');
            });
        });
    });

    describe('given null application', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: null, environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "application" fails because ["application" must be a string]');
            });
        });
    });

    describe('given empty application', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: '', environment: 'test', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "application" fails because ["application" is not allowed to be empty]');
            });
        });
    });

    describe('given null environment', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: 'test', environment: null, dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "environment" fails because ["environment" must be a string]');
            });
        });
    });

    describe('given empty environment', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: 'test', environment: '', dataCentre: 'test' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "environment" fails because ["environment" is not allowed to be empty]');
            });
        });
    });

    describe('given null dataCentre', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: 'test', environment: 'test', dataCentre: null }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "dataCentre" fails because ["dataCentre" must be a string]');
            });
        });
    });

    describe('given empty dataCentre', function() {
        it('should return error', function() {
            plugin.register(null, { host: 'test', application: 'test', environment: 'test', dataCentre: '' }, function(err) {
                expect(err.toString()).to.equal('ValidationError: child "dataCentre" fails because ["dataCentre" is not allowed to be empty]');
            });
        });
    });
});
