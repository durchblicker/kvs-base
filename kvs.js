/*
** © 2013 by Philipp Dunkel <pip@pipobscure.com>. Licensed under MIT-License.
*/
/*jshint node:true, browser:false*/
'use strict';

module.exports = exports = create;
exports.util = util;

var modules = { 'memory':require('./memory.js') };

Object.keys(require('./package.json').peerDependencies).forEach(function(mod) {
  if (mod.indexOf('kvs-') !== 0) return;
  try {
    modules[mod] = require(mod);
  } catch(ex) {}
});

function create(mod, opts) {
  if(!modules[mod]) throw(new Error(mod+' is not availabe/installed'));
  if(modules[mod].kvt !== 'store') throw(new Error(mod+' is not a store'));
  return new modules[mod](opts);
}

function util(mod, one, opts) {
  if(!modules[mod]) throw(new Error(mod+' is not availabe/installed'));
  if(modules[mod].kvt !== 'utility') throw(new Error(mod+' is not a utility'));
  return new modules[mod](one, opts);
}
