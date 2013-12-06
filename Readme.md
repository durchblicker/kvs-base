# KVS

KVS or   *K*ey *V*alue *S*tore is an abstract KeyValueStore system. The *kvs* group of node modules, are intended to present a unified interface to key value stores of every persuasion. This allows for substituting them without changing anything but the initializing parameters.

*KVS-filter* modules are modules that are used to modify the requests to the KVS system. They can transform the *key* or the *value* or both in some way. However they need to take either be transparent and keep to the KVS-system definition (i.e.: values are buffers, etc...) or be used close to the consumer of the API.

## Install
    npm install kvs-base

## Conventions
 * a valid store is an object and has 4 methods:
	* `function get(name, callback) { … }`
	* `function set(name, callback) { … }`
	* `function remove(name, callback) { … }`
	* `function list(name, callback) { … }`
 * all values are `Buffer` objects
 * the `list` method lists all keys that start with `name` (the first argument)
 * the `list` method returns an object in the form `{ count:<integer>, values:[<array of strings>] }`
 * not finding a value is not an error, the value is simply null

## Modules
### Backends
 * [kvs-file]((http://npmjs.org/package/kvs-base)-file)
 * [kvs-memcache]((http://npmjs.org/package/kvs-base)-memcache)
 * [kvs-awss3]((http://npmjs.org/package/kvs-base)-awss3)

### Utilities
 * [kvs-stagger]((http://npmjs.org/package/kvs-base)-stagger)
 * [kvs-segmentname]((http://npmjs.org/package/kvs-base)-segmentname)
 * [kvs-json]((http://npmjs.org/package/kvs-base)-json)
 * [kvs-string]((http://npmjs.org/package/kvs-base)-string)

## Use
### KVS Stores
    var kvs=require('kvs-base');
    var store = kvs('kvs-<module>', { <options> });
    store.set('name',  'this is a string', function(err) {…});
    store.get('name', function(err, value) {
      // attention! value will be a string (or null if not found)
    });
    store.remove('name', function(err) { … });
    store.list('name', function(err, value) { … });

### KVS Utilities / Filters
    var kvs=require('kvs-base');
    var store = kvs('kvs-<module>', { <options> });
    kvs.util('kvs-<filter>', store, { … });

### KVS Staggering
    var kvs=require('kvs-base');
    var s1 = kvs('kvs-<module>', { <options> });
    var s2 = kvs('kvs-<module>', { <options> });
  	var s3 = kvs('kvs-<module>', { <options> });
  	var store = kvs.util('kvs-stagger', [ s1, s2, s3 ], { writeDepth:1, removeDepth:3, percolate:false });

## License (MIT)
**Copyright (c) 2013 [Philipp Dunkel](mailto:pip@pipobscure.com)**

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
