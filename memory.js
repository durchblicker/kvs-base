/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = Memory;
module.exports.kvt = 'store';

function Memory() {
  this.data = {};
}

Memory.prototype.get = function(name, cb) {
  name = String(name);
  setImmediate(cb.bind(null, null, this.data[name]));
};
Memory.prototype.set = function(name, value, cb) {
  name = String(name);
  value = Buffer.isBuffer(value) ? value : new Buffer(String(value));
  this.data[name]=value;
  setImmediate(cb.bind(null, null));
};
Memory.prototype.list = function(name, cb) {
  var d = Object.keys(this.data).filter(function(item) { return item.indexOf(name)===0; });
  setImmediate(cb.bind(null, null, { count:d.length, values:d }));
};
Memory.prototype.remove = function(name, cb) {
  delete this.data[name];
  setImmediate(cb.bind(null, null));
};
