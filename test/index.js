/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

var Lab = require('lab');
var kvs = require('../');

Lab.test('create store', function(done) {
  var store = kvs('memory');
  Lab.expect(store).to.be.an('object');
  Lab.expect(store.get).to.be.a('function');
  Lab.expect(store.set).to.be.a('function');
  Lab.expect(store.remove).to.be.a('function');
  Lab.expect(store.list).to.be.a('function');

  done();
});

Lab.test('attach utility', function(done) {
  var store = kvs('memory');
  store = kvs.util('kvs-string', store);
  Lab.expect(store).to.be.an('object');
  Lab.expect(store.get).to.be.a('function');
  Lab.expect(store.set).to.be.a('function');
  Lab.expect(store.remove).to.be.a('function');
  Lab.expect(store.list).to.be.a('function');

  done();
});

Lab.experiment('basic memory store', function() {
  var store = kvs('memory');
  var value = new Buffer('test value');

  Lab.test('set', function(done) {
    store.set('test', value, function(err) {
      Lab.expect(!err).to.equal(true);
      done();
    });
  });

  Lab.test('get', function(done) {
    store.get('test', function(err, val) {
      Lab.expect(!err).to.equal(true);
      Lab.expect(val).to.eql(value);
      done();
    });
  });

  Lab.test('list', function(done) {
    store.list('test', function(err, val) {
      Lab.expect(!err).to.equal(true);
      Lab.expect(val).to.eql({ count:1, values:['test' ]});
      done();
    });
  });

  Lab.test('remove', function(done) {
    store.remove('test', function(err) {
      Lab.expect(!err).to.equal(true);
      store.list('test', function(err, val) {
        Lab.expect(!err).to.equal(true);
        Lab.expect(val).to.eql({ count:0, values:[]});
        done();
      });
    });
  });
});
