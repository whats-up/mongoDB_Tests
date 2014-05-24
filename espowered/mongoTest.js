var BSON, Db, assert, log, mongo, mongoUri, util;
mongo = require('mongodb');
Db = mongo.Db;
BSON = mongo.BSONPure;
mongoUri = 'mongodb://localhost/mongo_test';
assert = require('power-assert');
util = require('util');
log = function (obj) {
    return console.log(util.inspect(obj, false, null));
};
describe('myModule', function () {
    var coll, db, json;
    db = null;
    coll = null;
    json = null;
    before(function (done) {
        return Db.connect(mongoUri, function (err, DB) {
            db = DB;
            db.dropCollection('testCollection');
            db.close();
            return done();
        });
    });
    beforeEach(function (done) {
        json = {
            name: 'taro',
            blood_type: 'AB',
            'protected': false
        };
        return Db.connect(mongoUri, function (err, DB) {
            db = DB;
            return db.collection('testCollection', function (err, collection) {
                coll = collection;
                return done();
            });
        });
    });
    afterEach(function (done) {
        return db.dropCollection('testCollection', function (err, result) {
            db.close();
            return done();
        });
    });
    it('\u63A5\u7D9A\u30C6\u30B9\u30C8', function (done) {
        assert(assert._expr(assert._capt(coll, 'arguments/0'), {
            content: 'assert(coll)',
            filepath: 'test/mongoTest.js',
            line: 53
        }));
        return done();
    });
    return describe('insert', function () {
        it('\u5358\u4E00\u306Eobject\u3092insert\u3059\u308B', function (done) {
            return coll.insert(json, { w: 1 }, function (err, result) {
                return coll.find().toArray(function (err, items) {
                    assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                        content: 'assert(items.length === 1)',
                        filepath: 'test/mongoTest.js',
                        line: 66
                    }));
                    assert.equal('taro', assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/1/object/object')[0], 'arguments/1/object').name, 'arguments/1'), {
                        content: 'assert.equal(\'taro\', items[0].name)',
                        filepath: 'test/mongoTest.js',
                        line: 67
                    }));
                    return coll.insert(json, { w: 1 }, function (err, result) {
                        assert.ok(assert._expr(assert._capt(err, 'arguments/0'), {
                            content: 'assert.ok(err)',
                            filepath: 'test/mongoTest.js',
                            line: 71
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(err, 'arguments/0/left/object').code, 'arguments/0/left') === 11000, 'arguments/0'), {
                            content: 'assert(err.code === 11000)',
                            filepath: 'test/mongoTest.js',
                            line: 72
                        }));
                        return done();
                    });
                });
            });
        });
        it('_id\u306E\u7121\u3044json\u3092insert\u3059\u308B\u3068_id\u304Cjson\u306B\u8FFD\u52A0\u3055\u308C\u308B', function (done) {
            assert(assert._expr(assert._capt(assert._capt(assert._capt(json, 'arguments/0/left/object')._id, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(json._id === void 0)',
                filepath: 'test/mongoTest.js',
                line: 79
            }));
            return coll.insert(json, { w: 1 }, function (err, result) {
                assert(assert._expr(assert._capt(assert._capt(json, 'arguments/0/object')._id, 'arguments/0'), {
                    content: 'assert(json._id)',
                    filepath: 'test/mongoTest.js',
                    line: 83
                }));
                return done();
            });
        });
        it('_id\u306E\u7121\u3044json\u3092save\u3059\u308B\u3068_id\u304Cjson\u306B\u8FFD\u52A0\u3055\u308C\u308B', function (done) {
            assert(assert._expr(assert._capt(assert._capt(assert._capt(json, 'arguments/0/left/object')._id, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(json._id === void 0)',
                filepath: 'test/mongoTest.js',
                line: 88
            }));
            return coll.save(json, function (err, result) {
                assert(assert._expr(assert._capt(assert._capt(json, 'arguments/0/object')._id, 'arguments/0'), {
                    content: 'assert(json._id)',
                    filepath: 'test/mongoTest.js',
                    line: 90
                }));
                return done();
            });
        });
        it('_id\u306E\u7121\u3044json\u3092upsert\u3059\u308B\u3068_id\u306Fjson\u306B\u306F\u8FFD\u52A0\u3055\u308C\u306A\u3044', function (done) {
            assert(assert._expr(assert._capt(assert._capt(assert._capt(json, 'arguments/0/left/object')._id, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(json._id === void 0)',
                filepath: 'test/mongoTest.js',
                line: 95
            }));
            return coll.update({ name: 'taro' }, json, {
                upsert: true,
                w: 1
            }, function (err, result) {
                assert(assert._expr(assert._capt(assert._capt(assert._capt(json, 'arguments/0/left/object')._id, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(json._id === void 0)',
                    filepath: 'test/mongoTest.js',
                    line: 102
                }));
                return done();
            });
        });
        it('\u914D\u5217\u306B\u683C\u7D0D\u3055\u308C\u305F\u8907\u6570\u306Eobject\u3092insert\u3059\u308B', function (done) {
            var data, i, _i;
            data = [];
            for (i = _i = 1; _i <= 20; i = ++_i) {
                json = {
                    _id: i,
                    name: 'human' + i
                };
                data.push(json);
            }
            assert(assert._expr(assert._capt(assert._capt(assert._capt(data, 'arguments/0/left/object').length, 'arguments/0/left') === 20, 'arguments/0'), {
                content: 'assert(data.length === 20)',
                filepath: 'test/mongoTest.js',
                line: 116
            }));
            return coll.insert(data, { w: 1 }, function (err, result) {
                return coll.count(function (err, count) {
                    assert(assert._expr(assert._capt(count, 'arguments/0'), {
                        content: 'assert(count, 20)',
                        filepath: 'test/mongoTest.js',
                        line: 121
                    }), 20);
                    return done();
                });
            });
        });
        it('\u914D\u5217\u306B\u683C\u7D0D\u3055\u308C\u305F\u8907\u6570\u306Eobject\u3092insert\u3057\u305F\u5F8C\u306B\u3001\u914D\u5217\u306B\u65B0\u3057\u3044object\u3092\u8FFD\u52A0\u3057\u3066\u518D\u5EA6insert\u3059\u308B\u3068\u30A8\u30E9\u30FC', function (done) {
            var data, i, _i;
            data = [];
            for (i = _i = 1; _i <= 20; i = ++_i) {
                json = {
                    _id: i,
                    name: 'human' + i
                };
                data.push(json);
            }
            return coll.insert(data, { w: 1 }, function (err, result) {
                data.push({
                    _id: 100,
                    name: 'hage'
                });
                return coll.insert(data, { w: 1 }, function (err, result) {
                    assert(assert._expr(assert._capt(assert._capt(assert._capt(err, 'arguments/0/left/object').err, 'arguments/0/left') === 'E11000 duplicate key error index: mongo_test.testCollection.$_id_  dup key: { : 1 }', 'arguments/0'), {
                        content: 'assert(err.err === \'E11000 duplicate key error index: mongo_test.testCollection.$_id_  dup key: { : 1 }\')',
                        filepath: 'test/mongoTest.js',
                        line: 150
                    }));
                    return done();
                });
            });
        });
        describe('save', function () {
            return it('save\u306Fdoc\u304C\u5B58\u5728\u3057\u306A\u3051\u308C\u3070insert\n\u5B58\u5728\u3059\u308B\u306A\u3089update\n\u305F\u3060\u3057update\u306E\u5834\u5408\u3001doc\u307E\u308B\u3054\u3068\u305D\u306E\u307E\u307E\u306B\u66F8\u304D\u63DB\u3048\u3089\u308C\u3066\u3057\u307E\u3046\n(\u4E00\u90E8\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u3060\u3051\u66F8\u304D\u63DB\u3048\u305F\u3044\u5834\u5408\u3067\u3082\u3001doc\u306B\u5168\u3066\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u304C\u5B58\u5728\u3057\u3066\u3044\u308B\u5FC5\u8981\u304C\u3042\u308B)', function (done) {
                json = {
                    name: 'taro',
                    blood_type: 'AB',
                    'protected': false,
                    _id: 1
                };
                return coll.save(json, function (err, result) {
                    return coll.findOne({ _id: 1 }, function (err, item) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object')['protected'], 'arguments/0/left') === false, 'arguments/0'), {
                            content: 'assert(item[\'protected\'] === false)',
                            filepath: 'test/mongoTest.js',
                            line: 171
                        }));
                        json['protected'] = true;
                        return coll.save(json, function (err, result) {
                            return coll.findOne({ _id: 1 }, function (err, item) {
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object')['protected'], 'arguments/0/left') === true, 'arguments/0'), {
                                    content: 'assert(item[\'protected\'] === true)',
                                    filepath: 'test/mongoTest.js',
                                    line: 177
                                }));
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(item, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                                    content: 'assert(Object.keys(item).length === 4)',
                                    filepath: 'test/mongoTest.js',
                                    line: 178
                                }));
                                json = {
                                    _id: 1,
                                    name: 'taro'
                                };
                                return coll.save(json, function (err, result) {
                                    return coll.findOne({ _id: 1 }, function (err, item) {
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object')['protected'], 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                                            content: 'assert(item[\'protected\'] === void 0)',
                                            filepath: 'test/mongoTest.js',
                                            line: 187
                                        }));
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(item, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                            content: 'assert(Object.keys(item).length === 2)',
                                            filepath: 'test/mongoTest.js',
                                            line: 188
                                        }));
                                        return done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        describe('update', function () {
            it('\u5B58\u5728\u3057\u306A\u3044document\u3092\u6E21\u3059\u3068\u4F55\u3082\u8FFD\u52A0\u3055\u308C\u306A\u3044\u304C\u30A8\u30E9\u30FC\u306B\u3082\u306A\u3089\u306A\u3044', function (done) {
                json = {
                    name: 'taro',
                    blood_type: 'AB',
                    'protected': false,
                    _id: 1
                };
                return coll.update({ name: 'taro' }, json, { w: 1 }, function (err, result) {
                    return coll.find({}).toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(err, 'arguments/0/left') === null, 'arguments/0'), {
                            content: 'assert(err === null)',
                            filepath: 'test/mongoTest.js',
                            line: 216
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                            content: 'assert(items.length === 0)',
                            filepath: 'test/mongoTest.js',
                            line: 217
                        }));
                        return done();
                    });
                });
            });
            it('document\u306B$set\u7B49\u3092\u4ED8\u3051\u305A\u306B\u305D\u306E\u307E\u307E\u306Ejson\u3092\u6E21\u3059\u3068save\u3068\u540C\u3058\u6319\u52D5\u306B\u306A\u308B', function (done) {
                json = {
                    name: 'taro',
                    blood_type: 'AB',
                    'protected': false,
                    _id: 1
                };
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(json, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                    content: 'assert(Object.keys(json).length === 4)',
                    filepath: 'test/mongoTest.js',
                    line: 229
                }));
                return coll.insert(json, { w: 1 }, function (err, result) {
                    return coll.update({ name: 'taro' }, { 'protected': true }, function (err, result) {
                        return coll.findOne({}, function (err, item) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').blood_type, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert(item.blood_type === void 0)',
                                filepath: 'test/mongoTest.js',
                                line: 244
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(item, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                content: 'assert(Object.keys(item).length === 2)',
                                filepath: 'test/mongoTest.js',
                                line: 245
                            }));
                            return done();
                        });
                    });
                });
            });
            it('document\u3092{$set:\u306B\u57CB\u3081\u8FBC\u3080\u3068\u305D\u306E\u8981\u7D20\u3060\u3051\u304C\u66F8\u304D\u63DB\u3048\u3089\u308C\u308B', function (done) {
                json = {
                    _id: 1,
                    name: 'taro',
                    blood_type: 'AB',
                    'protected': false
                };
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(json, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                    content: 'assert(Object.keys(json).length === 4)',
                    filepath: 'test/mongoTest.js',
                    line: 258
                }));
                return coll.insert(json, { w: 1 }, function (err, result) {
                    return coll.update({ name: 'taro' }, { $set: { 'protected': true } }, function (err, result) {
                        return coll.findOne({}, function (err, item) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').blood_type, 'arguments/0/left') === 'AB', 'arguments/0'), {
                                content: 'assert(item.blood_type === \'AB\')',
                                filepath: 'test/mongoTest.js',
                                line: 270
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(Object, 'arguments/0/left/object/callee/object').keys(assert._capt(item, 'arguments/0/left/object/arguments/0')), 'arguments/0/left/object').length, 'arguments/0/left') === 4, 'arguments/0'), {
                                content: 'assert(Object.keys(item).length === 4)',
                                filepath: 'test/mongoTest.js',
                                line: 271
                            }));
                            return done();
                        });
                    });
                });
            });
            it('\u8907\u6570\u4EF6\u306Eupdate\u3057\u305F\u3064\u3082\u308A\u304C\u6700\u521D\u306E1\u4EF6\u3057\u304Bupdate\u3067\u304D\u306A\u3044', function (done) {
                var data, i, _i;
                data = [];
                for (i = _i = 1; _i <= 20; i = ++_i) {
                    json = {
                        _id: i,
                        name: 'human' + i,
                        type: 'human'
                    };
                    data.push(json);
                }
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.update({ type: 'human' }, { $set: { type: 'robot' } }, function (err, result) {
                        return coll.find({}).toArray(function (err, items) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object')['type'], 'arguments/0/left') === 'robot', 'arguments/0'), {
                                content: 'assert(items[0][\'type\'] === \'robot\')',
                                filepath: 'test/mongoTest.js',
                                line: 299
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[1], 'arguments/0/left/object')['type'], 'arguments/0/left') !== 'robot', 'arguments/0'), {
                                content: 'assert(items[1][\'type\'] !== \'robot\')',
                                filepath: 'test/mongoTest.js',
                                line: 300
                            }));
                            return done();
                        });
                    });
                });
            });
            return it('options\u306B{multi: true}\u3092\u6E21\u305B\u3070\u5168\u4EF6upload\u3067\u304D\u308B', function (done) {
                var data, i, _i;
                data = [];
                for (i = _i = 1; _i <= 20; i = ++_i) {
                    json = {
                        _id: i,
                        name: 'human' + i,
                        type: 'human'
                    };
                    data.push(json);
                }
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.update({ type: 'human' }, { $set: { type: 'robot' } }, { multi: true }, function (err, result) {
                        return coll.find({}).toArray(function (err, items) {
                            var item, _j, _len;
                            for (_j = 0, _len = items.length; _j < _len; _j++) {
                                item = items[_j];
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object')['type'], 'arguments/0/left') === 'robot', 'arguments/0'), {
                                    content: 'assert(item[\'type\'] === \'robot\')',
                                    filepath: 'test/mongoTest.js',
                                    line: 333
                                }));
                            }
                            return done();
                        });
                    });
                });
            });
        });
        describe('upsert', function () {
            it('upsert1', function (done) {
                json = {
                    name: 'taro',
                    update_at: null,
                    'protected': false
                };
                return coll.update({ name: 'taro' }, json, {
                    upsert: true,
                    w: 1
                }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/mongoTest.js',
                            line: 363
                        }));
                        json['protected'] = true;
                        return coll.update({ name: 'taro' }, json, {
                            upsert: true,
                            w: 1
                        }, function (err, result) {
                            return coll.find().toArray(function (err, items) {
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                                    content: 'assert(items.length === 1)',
                                    filepath: 'test/mongoTest.js',
                                    line: 376
                                }));
                                json['name'] = 'jiro';
                                return coll.update({ name: 'jiro' }, json, {
                                    upsert: true,
                                    w: 1
                                }, function (err, result) {
                                    return coll.find().toArray(function (err, items) {
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                            content: 'assert(items.length === 2)',
                                            filepath: 'test/mongoTest.js',
                                            line: 390
                                        }));
                                        return done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
            return it('upsert2', function (done) {
                json = {
                    name: 'taro',
                    update_at: null,
                    'protected': false,
                    _id: 1
                };
                return coll.update({ name: 'taro' }, json, {
                    upsert: true,
                    w: 1
                }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/mongoTest.js',
                            line: 417
                        }));
                        json['protected'] = true;
                        return coll.update({ name: 'taro' }, json, {
                            upsert: true,
                            w: 1
                        }, function (err, result) {
                            return coll.find().toArray(function (err, items) {
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                                    content: 'assert(items.length === 1)',
                                    filepath: 'test/mongoTest.js',
                                    line: 430
                                }));
                                json['name'] = 'jiro';
                                return coll.update({ name: 'jiro' }, json, {
                                    upsert: true,
                                    w: 1
                                }, function (err, result) {
                                    return coll.find().toArray(function (err, items) {
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                                            content: 'assert(items.length === 1)',
                                            filepath: 'test/mongoTest.js',
                                            line: 443
                                        }));
                                        return done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        describe('insert or null', function () {
            return it('insert or null -1');
        });
        return describe('distinkt', function () {
            return it('insert or null -1');
        });
    });
});
module.exports = {
    upsert003: function () {
        var json;
        json = {
            name: 'taro',
            update_at: null,
            'protected': false,
            _id: 1
        };
        return collection.update({ name: 'taro' }, json, {
            upsert: true,
            w: 1
        }, function (err, result) {
            return collection.find().toArray(function (err, items) {
                log('insert:');
                log(items);
                json['protected'] = true;
                return collection.save(json, function (err, result) {
                    return collection.find().toArray(function (err, items) {
                        log('save:');
                        log(items);
                        db.dropCollection('testCollection');
                        return db.close();
                    });
                });
            });
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbW9uZ29UZXN0LmpzIl0sIm5hbWVzIjpbIkJTT04iLCJEYiIsImFzc2VydCIsImxvZyIsIm1vbmdvIiwibW9uZ29VcmkiLCJ1dGlsIiwicmVxdWlyZSIsIkJTT05QdXJlIiwib2JqIiwiY29uc29sZSIsImluc3BlY3QiLCJkZXNjcmliZSIsImNvbGwiLCJkYiIsImpzb24iLCJiZWZvcmUiLCJkb25lIiwiY29ubmVjdCIsImVyciIsIkRCIiwiZHJvcENvbGxlY3Rpb24iLCJjbG9zZSIsImJlZm9yZUVhY2giLCJuYW1lIiwiYmxvb2RfdHlwZSIsImNvbGxlY3Rpb24iLCJhZnRlckVhY2giLCJyZXN1bHQiLCJpdCIsIl9leHByIiwiX2NhcHQiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwiaW5zZXJ0IiwidyIsImZpbmQiLCJ0b0FycmF5IiwiaXRlbXMiLCJsZW5ndGgiLCJlcXVhbCIsIm9rIiwiY29kZSIsIl9pZCIsInNhdmUiLCJ1cGRhdGUiLCJ1cHNlcnQiLCJkYXRhIiwiaSIsIl9pIiwicHVzaCIsImNvdW50IiwiZmluZE9uZSIsIml0ZW0iLCJPYmplY3QiLCJrZXlzIiwiJHNldCIsInR5cGUiLCJtdWx0aSIsIl9qIiwiX2xlbiIsInVwZGF0ZV9hdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ1cHNlcnQwMDMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLElBQUosRUFBVUMsRUFBVixFQUFjQyxNQUFkLEVBQXNCQyxHQUF0QixFQUEyQkMsS0FBM0IsRUFBa0NDLFFBQWxDLEVBQTRDQyxJQUE1QztBQUVBRixLQUFBLEdBQVFHLE9BQUEsQ0FBUSxTQUFSLENBQVIsQ0FGQTtBQUlBTixFQUFBLEdBQUtHLEtBQUEsQ0FBTUgsRUFBWCxDQUpBO0FBTUFELElBQUEsR0FBT0ksS0FBQSxDQUFNSSxRQUFiLENBTkE7QUFRQUgsUUFBQSxHQUFXLGdDQUFYLENBUkE7QUFVQUgsTUFBQSxHQUFTSyxPQUFBLENBQVEsY0FBUixDQUFULENBVkE7QUFZQUQsSUFB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InNvdXJjZXNDb250ZW50IjpbInZhciBCU09OLCBEYiwgYXNzZXJ0LCBsb2csIG1vbmdvLCBtb25nb1VyaSwgdXRpbDtcblxubW9uZ28gPSByZXF1aXJlKFwibW9uZ29kYlwiKTtcblxuRGIgPSBtb25nby5EYjtcblxuQlNPTiA9IG1vbmdvLkJTT05QdXJlO1xuXG5tb25nb1VyaSA9IFwibW9uZ29kYjovL2xvY2FsaG9zdC9tb25nb190ZXN0XCI7XG5cbmFzc2VydCA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydCcpO1xuXG51dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5sb2cgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChvYmosIGZhbHNlLCBudWxsKSk7XG59O1xuXG5kZXNjcmliZShcIm15TW9kdWxlXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgY29sbCwgZGIsIGpzb247XG4gIGRiID0gbnVsbDtcbiAgY29sbCA9IG51bGw7XG4gIGpzb24gPSBudWxsO1xuICBiZWZvcmUoZnVuY3Rpb24oZG9uZSkge1xuICAgIHJldHVybiBEYi5jb25uZWN0KG1vbmdvVXJpLCBmdW5jdGlvbihlcnIsIERCKSB7XG4gICAgICBkYiA9IERCO1xuICAgICAgZGIuZHJvcENvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJyk7XG4gICAgICBkYi5jbG9zZSgpO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgIGpzb24gPSB7XG4gICAgICBuYW1lOiAndGFybycsXG4gICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiBEYi5jb25uZWN0KG1vbmdvVXJpLCBmdW5jdGlvbihlcnIsIERCKSB7XG4gICAgICBkYiA9IERCO1xuICAgICAgcmV0dXJuIGRiLmNvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJywgZnVuY3Rpb24oZXJyLCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGwgPSBjb2xsZWN0aW9uO1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhZnRlckVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgIHJldHVybiBkYi5kcm9wQ29sbGVjdGlvbigndGVzdENvbGxlY3Rpb24nLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgZGIuY2xvc2UoKTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuICBpdCgn5o6l57aa44OG44K544OIJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGFzc2VydChjb2xsKTtcbiAgICByZXR1cm4gZG9uZSgpO1xuICB9KTtcbiAgcmV0dXJuIGRlc2NyaWJlKFwiaW5zZXJ0XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLypcbiAgICBpbnNlcnQoZG9jc1ssIG9wdGlvbnNdWywgY2FsbGJhY2tdKVxuICAgICAqL1xuICAgIGl0KFwi5Y2Y5LiA44Gub2JqZWN044KSaW5zZXJ044GZ44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoJ3Rhcm8nLCBpdGVtc1swXS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoanNvbiwge1xuICAgICAgICAgICAgdzogMVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICBhc3NlcnQub2soZXJyKTtcbiAgICAgICAgICAgIGFzc2VydChlcnIuY29kZSA9PT0gMTEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJpbnNlcnTjgZnjgovjgahfaWTjgYxqc29u44Gr6L+95Yqg44GV44KM44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCk7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJzYXZl44GZ44KL44GoX2lk44GManNvbuOBq+i/veWKoOOBleOCjOOCi1wiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICBhc3NlcnQoanNvbi5faWQgPT09IHZvaWQgMCk7XG4gICAgICByZXR1cm4gY29sbC5zYXZlKGpzb24sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCk7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJ1cHNlcnTjgZnjgovjgahfaWTjga9qc29u44Gr44Gv6L+95Yqg44GV44KM44Gq44GEXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgfSwganNvbiwge1xuICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KFwi6YWN5YiX44Gr5qC857SN44GV44KM44Gf6KSH5pWw44Gub2JqZWN044KSaW5zZXJ044GZ44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIHZhciBkYXRhLCBpLCBfaTtcbiAgICAgIGRhdGEgPSBbXTtcbiAgICAgIGZvciAoaSA9IF9pID0gMTsgX2kgPD0gMjA7IGkgPSArK19pKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgX2lkOiBpLFxuICAgICAgICAgIG5hbWU6ICdodW1hbicgKyBpXG4gICAgICAgIH07XG4gICAgICAgIGRhdGEucHVzaChqc29uKTtcbiAgICAgIH1cbiAgICAgIGFzc2VydChkYXRhLmxlbmd0aCA9PT0gMjApO1xuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwuY291bnQoZnVuY3Rpb24oZXJyLCBjb3VudCkge1xuICAgICAgICAgIGFzc2VydChjb3VudCwgMjApO1xuICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoXCLphY3liJfjgavmoLzntI3jgZXjgozjgZ/opIfmlbDjga5vYmplY3TjgpJpbnNlcnTjgZfjgZ/lvozjgavjgIHphY3liJfjgavmlrDjgZfjgYRvYmplY3TjgpLov73liqDjgZfjgablho3luqZpbnNlcnTjgZnjgovjgajjgqjjg6njg7xcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgdmFyIGRhdGEsIGksIF9pO1xuICAgICAgZGF0YSA9IFtdO1xuICAgICAgZm9yIChpID0gX2kgPSAxOyBfaSA8PSAyMDsgaSA9ICsrX2kpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBfaWQ6IGksXG4gICAgICAgICAgbmFtZTogJ2h1bWFuJyArIGlcbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5wdXNoKGpzb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBfaWQ6IDEwMCxcbiAgICAgICAgICBuYW1lOiAnaGFnZSdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuXG4gICAgICAgICAgLypcbiAgICAgICAgICBkYXRhWzBd44GvaW5zZXJ05riI44G/44Gq5omA44Gn5YaN5bqmaW5zZXJ044GZ44KL44Go44Ko44Op44O844Gr44Gq44KLXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXNzZXJ0KGVyci5lcnIgPT09ICdFMTEwMDAgZHVwbGljYXRlIGtleSBlcnJvciBpbmRleDogbW9uZ29fdGVzdC50ZXN0Q29sbGVjdGlvbi4kX2lkXyAgZHVwIGtleTogeyA6IDEgfScpO1xuICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgIHNhdmUoW2RvY11bLCBvcHRpb25zXSwgW2NhbGxiYWNrXSlcbiAgICAgKi9cbiAgICBkZXNjcmliZShcInNhdmVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXQoXCJzYXZl44GvZG9j44GM5a2Y5Zyo44GX44Gq44GR44KM44GwaW5zZXJ0XFxu5a2Y5Zyo44GZ44KL44Gq44KJdXBkYXRlXFxu44Gf44Gg44GXdXBkYXRl44Gu5aC05ZCI44CBZG9j44G+44KL44GU44Go44Gd44Gu44G+44G+44Gr5pu444GN5o+b44GI44KJ44KM44Gm44GX44G+44GGXFxuKOS4gOmDqOOBruODl+ODreODkeODhuOCo+OBoOOBkeabuOOBjeaPm+OBiOOBn+OBhOWgtOWQiOOBp+OCguOAgWRvY+OBq+WFqOOBpuOBruODl+ODreODkeODhuOCo+OBjOWtmOWcqOOBl+OBpuOBhOOCi+W/heimgeOBjOOBguOCiylcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgIF9pZDogMVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29sbC5zYXZlKGpzb24sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7XG4gICAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgIGFzc2VydChpdGVtWydwcm90ZWN0ZWQnXSA9PT0gZmFsc2UpO1xuICAgICAgICAgICAganNvblsncHJvdGVjdGVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuc2F2ZShqc29uLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1bJ3Byb3RlY3RlZCddID09PSB0cnVlKTtcbiAgICAgICAgICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSA0KTtcbiAgICAgICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgICAgICAgX2lkOiAxLFxuICAgICAgICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5zYXZlKGpzb24sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAxXG4gICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1bJ3Byb3RlY3RlZCddID09PSB2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwidXBkYXRlXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvKlxuICAgICAgdXBkYXRlKHNlbGVjdG9yLCBkb2N1bWVudFssIG9wdGlvbnNdWywgY2FsbGJhY2tdKVxuICAgICAgICovXG4gICAgICBpdChcIuWtmOWcqOOBl+OBquOBhGRvY3VtZW5044KS5rih44GZ44Go5L2V44KC6L+95Yqg44GV44KM44Gq44GE44GM44Ko44Op44O844Gr44KC44Gq44KJ44Gq44GEXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgYmxvb2RfdHlwZTogJ0FCJyxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZSxcbiAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKHt9KS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgIGFzc2VydChlcnIgPT09IG51bGwpO1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMCk7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgaXQoXCJkb2N1bWVudOOBqyRzZXTnrYnjgpLku5jjgZHjgZrjgavjgZ3jga7jgb7jgb7jga5qc29u44KS5rih44GZ44Goc2F2ZeOBqOWQjOOBmOaMmeWLleOBq+OBquOCi1wiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIGJsb29kX3R5cGU6ICdBQicsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgX2lkOiAxXG4gICAgICAgIH07XG4gICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhqc29uKS5sZW5ndGggPT09IDQpO1xuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoanNvbiwge1xuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcblxuICAgICAgICAgIC8qXG4gICAgICAgICAgZG9jdW1lbnTjgat7cHJvdGVjdGVkOnRydWV944KS6Kit5a6a44GZ44KL44Go5LuW44Gu6KaB57Sg44GM5raI44GI44Gm44GX44G+44GGXG4gICAgICAgICAgKF9pZOOBr+iHquWLleOBp+S7mOS4juOBleOCjOOCiylcbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJwcm90ZWN0ZWRcIjogdHJ1ZVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHt9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW0uYmxvb2RfdHlwZSA9PT0gdm9pZCAwKTtcbiAgICAgICAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMik7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGl0KFwiZG9jdW1lbnTjgpJ7JHNldDrjgavln4vjgoHovrzjgoDjgajjgZ3jga7opoHntKDjgaDjgZHjgYzmm7jjgY3mj5vjgYjjgonjgozjgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIF9pZDogMSxcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgYmxvb2RfdHlwZTogJ0FCJyxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoanNvbikubGVuZ3RoID09PSA0KTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGpzb24sIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgXCJwcm90ZWN0ZWRcIjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHt9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW0uYmxvb2RfdHlwZSA9PT0gJ0FCJyk7XG4gICAgICAgICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPT09IDQpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdChcIuikh+aVsOS7tuOBrnVwZGF0ZeOBl+OBn+OBpOOCguOCiuOBjOacgOWIneOBrjHku7bjgZfjgYt1cGRhdGXjgafjgY3jgarjgYRcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICB2YXIgZGF0YSwgaSwgX2k7XG4gICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgZm9yIChpID0gX2kgPSAxOyBfaSA8PSAyMDsgaSA9ICsrX2kpIHtcbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgX2lkOiBpLFxuICAgICAgICAgICAgbmFtZTogJ2h1bWFuJyArIGksXG4gICAgICAgICAgICB0eXBlOiAnaHVtYW4nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBkYXRhLnB1c2goanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgIHR5cGU6ICdodW1hbidcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdyb2JvdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCh7fSkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtc1swXVsndHlwZSddID09PSAncm9ib3QnKTtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzFdWyd0eXBlJ10gIT09ICdyb2JvdCcpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaXQoXCJvcHRpb25z44Gre211bHRpOiB0cnVlfeOCkua4oeOBm+OBsOWFqOS7tnVwbG9hZOOBp+OBjeOCi1wiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHZhciBkYXRhLCBpLCBfaTtcbiAgICAgICAgZGF0YSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSBfaSA9IDE7IF9pIDw9IDIwOyBpID0gKytfaSkge1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBfaWQ6IGksXG4gICAgICAgICAgICBuYW1lOiAnaHVtYW4nICsgaSxcbiAgICAgICAgICAgIHR5cGU6ICdodW1hbidcbiAgICAgICAgICB9O1xuICAgICAgICAgIGRhdGEucHVzaChqc29uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoZGF0YSwge1xuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgdHlwZTogJ2h1bWFuJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3JvYm90J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoe30pLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICB2YXIgaXRlbSwgX2osIF9sZW47XG4gICAgICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuID0gaXRlbXMubGVuZ3RoOyBfaiA8IF9sZW47IF9qKyspIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNbX2pdO1xuICAgICAgICAgICAgICAgIGFzc2VydChpdGVtWyd0eXBlJ10gPT09ICdyb2JvdCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcInVwc2VydFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgLypcbiAgICAgIHVwZGF0ZShzZWxlY3RvciwgZG9jdW1lbnQsIHt1cHNlcnQ6dHJ1ZX0gKGFuZCBvdGhlciBvcHRpb25zKVssIGNhbGxiYWNrXSlcbiAgICAgICAqL1xuICAgICAgaXQoXCJ1cHNlcnQxXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgdXBkYXRlX2F0OiBudWxsLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgLypcbiAgICAgICAgY29sbGVjdGlvbuOBr+epuuOBquOBruOBp+acgOWIneOBrnVwc2VydOOBr2luc2VydOOBq+OBquOCi1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICDlgKTjgpLmm7jjgY3mj5vjgYjjgaZ1cHNlcnTjgZnjgovjgajjgZnjgafjgavlrZjlnKjjgZnjgovjga7jgad1cGRhdGXjgavjgarjgotcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAganNvblsncHJvdGVjdGVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICAgICAgdzogMVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICDjgrvjg6zjgq/jgr/jgafjgYLjgotbJ25hbWUnXeOCkuabuOOBjeaPm+OBiOOCi+OBqOaWsOimj+OCquODluOCuOOCp+OCr+ODiOOBqOiqjeitmOOBleOCjOOBpmluc2VydOOBq+OBquOCi1xuICAgICAgICAgICAgICAgIChfaWTjgYzoqK3lrprjgZXjgozjgabjgYTjgarjgYTloLTlkIgpXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAganNvblsnbmFtZSddID0gJ2ppcm8nO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICB3OiAxXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpdChcInVwc2VydDJcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICB1cGRhdGVfYXQ6IG51bGwsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgX2lkOiAxXG4gICAgICAgIH07XG5cbiAgICAgICAgLypcbiAgICAgICAgY29sbGVjdGlvbuOBr+epuuOBquOBruOBp+acgOWIneOBrnVwc2VydOOBr2luc2VydOOBq+OBquOCi1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICDlgKTjgpLmm7jjgY3mj5vjgYjjgaZ1cHNlcnTjgZnjgovjgajjgZnjgafjgavlrZjlnKjjgZnjgovjga7jgad1cGRhdGXjgavjgarjgotcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAganNvblsncHJvdGVjdGVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICAgICAgdzogMVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICDjgrvjg6zjgq/jgr/jgafjgYLjgotbJ25hbWUnXeOCkuabuOOBjeaPm+OBiOOBpuOCglsnX2lkJ13jgYzlkIzjgZjjgarjga7jgad1cGRhdGXjgavjgarjgotcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBqc29uWyduYW1lJ10gPSAnamlybyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdqaXJvJ1xuICAgICAgICAgICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHc6IDFcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwiaW5zZXJ0IG9yIG51bGxcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXQoJ2luc2VydCBvciBudWxsIC0xJyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlc2NyaWJlKFwiZGlzdGlua3RcIiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXQoJ2luc2VydCBvciBudWxsIC0xJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB1cHNlcnQwMDM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBqc29uO1xuICAgIGpzb24gPSB7XG4gICAgICBuYW1lOiAndGFybycsXG4gICAgICB1cGRhdGVfYXQ6IG51bGwsXG4gICAgICBcInByb3RlY3RlZFwiOiBmYWxzZSxcbiAgICAgIF9pZDogMVxuICAgIH07XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24udXBkYXRlKHtcbiAgICAgIG5hbWU6ICd0YXJvJ1xuICAgIH0sIGpzb24sIHtcbiAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgIHc6IDFcbiAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICBsb2coXCJpbnNlcnQ6XCIpO1xuICAgICAgICBsb2coaXRlbXMpO1xuICAgICAgICBqc29uWydwcm90ZWN0ZWQnXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLnNhdmUoanNvbiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBsb2coJ3NhdmU6Jyk7XG4gICAgICAgICAgICBsb2coaXRlbXMpO1xuICAgICAgICAgICAgZGIuZHJvcENvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJyk7XG4gICAgICAgICAgICByZXR1cm4gZGIuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcbiJdfQ==
