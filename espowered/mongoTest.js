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
describe('mongo Tests', function () {
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
    it('test connection', function (done) {
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
                    assert(assert._expr(assert._capt(assert._capt(assert._capt(err, 'arguments/0/left/object').code, 'arguments/0/left') === 11000, 'arguments/0'), {
                        content: 'assert(err.code === 11000)',
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
        describe('$setOnInsert', function () {
            it('$setOnInsert \u306E\u90E8\u5206\u306Fupdate\u3055\u308C\u306A\u3044', function (done) {
                return coll.update({ name: 'taro' }, { $setOnInsert: { status: 'null' } }, { upsert: true }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/mongoTest.js',
                            line: 469
                        }));
                        return coll.update({ name: 'jiro' }, { $setOnInsert: { status: 'null' } }, { upsert: true }, function (err, result) {
                            return coll.find().toArray(function (err, items) {
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                    content: 'assert(items.length === 2)',
                                    filepath: 'test/mongoTest.js',
                                    line: 480
                                }));
                                return coll.update({ name: 'jiro' }, { $setOnInsert: { status: 'insert' } }, { upsert: true }, function (err, result) {
                                    return coll.find().toArray(function (err, items) {
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                            content: 'assert(items.length === 2)',
                                            filepath: 'test/mongoTest.js',
                                            line: 491
                                        }));
                                        return coll.findOne({ name: 'jiro' }, function (err, item) {
                                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').status, 'arguments/0/left') === 'null', 'arguments/0'), {
                                                content: 'assert(item.status === \'null\')',
                                                filepath: 'test/mongoTest.js',
                                                line: 495
                                            }));
                                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').status, 'arguments/0/left') !== 'insert', 'arguments/0'), {
                                                content: 'assert(item.status !== \'insert\')',
                                                filepath: 'test/mongoTest.js',
                                                line: 496
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
            return it('$set \u306E\u90E8\u5206\u306Fupdate\u3055\u308C\u308B', function (done) {
                return coll.update({ name: 'taro' }, { $setOnInsert: { status: 'null' } }, { upsert: true }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/mongoTest.js',
                            line: 517
                        }));
                        return coll.update({ name: 'jiro' }, { $setOnInsert: { status: 'null' } }, { upsert: true }, function (err, result) {
                            return coll.find().toArray(function (err, items) {
                                assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                    content: 'assert(items.length === 2)',
                                    filepath: 'test/mongoTest.js',
                                    line: 528
                                }));
                                return coll.update({ name: 'jiro' }, {
                                    $setOnInsert: { status: 'insert' },
                                    $set: { status: 'update' }
                                }, { upsert: true }, function (err, result) {
                                    return coll.find().toArray(function (err, items) {
                                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                            content: 'assert(items.length === 2)',
                                            filepath: 'test/mongoTest.js',
                                            line: 542
                                        }));
                                        return coll.findOne({ name: 'jiro' }, function (err, item) {
                                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').status, 'arguments/0/left') !== 'null', 'arguments/0'), {
                                                content: 'assert(item.status !== \'null\')',
                                                filepath: 'test/mongoTest.js',
                                                line: 546
                                            }));
                                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').status, 'arguments/0/left') === 'update', 'arguments/0'), {
                                                content: 'assert(item.status === \'update\')',
                                                filepath: 'test/mongoTest.js',
                                                line: 547
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
        });
        describe('distinct', function () {
            return it('\u91CD\u8907\u884C\u3092\u9664\u5916\u3057\u3066\u30C7\u30FC\u30BF\u3092\u53D6\u5F97', function (done) {
                var data;
                data = [
                    {
                        name: 'taro',
                        place: 'tokyo',
                        text: '\u3053\u3093\u306B\u3061\u306F\u3053\u3093\u306B\u3061\u306F\uFF01'
                    },
                    {
                        name: 'taro',
                        place: 'tokyo',
                        text: '\u3053\u3093\u3070\u3093\u306F\u3053\u3093\u3070\u3093\u306F\uFF01'
                    },
                    {
                        name: 'jiro',
                        place: 'osaka',
                        text: '\u307E\u3044\u3069\u307E\u3044\u3069'
                    },
                    {
                        name: 'hanako',
                        place: 'tokyo',
                        text: 'hey!guys!'
                    }
                ];
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.distinct('name', function (err, docs) {
                        assert(assert._expr(assert._capt(assert._capt(err, 'arguments/0/left') === null, 'arguments/0'), {
                            content: 'assert(err === null)',
                            filepath: 'test/mongoTest.js',
                            line: 588
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object').length, 'arguments/0/left') === 3, 'arguments/0'), {
                            content: 'assert(docs.length === 3)',
                            filepath: 'test/mongoTest.js',
                            line: 589
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[0], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[0], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[0] === ["taro","jiro","hanako"].sort()[0])',
                            filepath: 'test/mongoTest.js',
                            line: 590
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[1], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[1], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[1] === ["taro","jiro","hanako"].sort()[1])',
                            filepath: 'test/mongoTest.js',
                            line: 591
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[2], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[2], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[2] === ["taro","jiro","hanako"].sort()[2])',
                            filepath: 'test/mongoTest.js',
                            line: 592
                        }));
                        return coll.distinct('name', { place: 'tokyo' }, function (err, docs) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                content: 'assert(docs.length === 2)',
                                filepath: 'test/mongoTest.js',
                                line: 596
                            }));
                            return done();
                        });
                    });
                });
            });
        });
        describe('count', function () {
            return it('\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3\u306E\u8981\u7D20\u6570\u3092\u53D6\u5F97', function (done) {
                var data;
                data = [
                    { name: 'taro' },
                    { name: 'jiro' },
                    { name: 'andy' },
                    { name: 'bob' },
                    { name: 'jon' }
                ];
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.count(function (err, count1) {
                        assert(assert._expr(assert._capt(assert._capt(count1, 'arguments/0/left') === 5, 'arguments/0'), {
                            content: 'assert(count1 === 5)',
                            filepath: 'test/mongoTest.js',
                            line: 627
                        }));
                        return coll.count({ name: 'taro' }, function (err, count2) {
                            assert(assert._expr(assert._capt(assert._capt(count2, 'arguments/0/left') === 1, 'arguments/0'), {
                                content: 'assert(count2 === 1)',
                                filepath: 'test/mongoTest.js',
                                line: 631
                            }));
                            return done();
                        });
                    });
                });
            });
        });
        return describe('findAndModify', function () {
            it('\u8981\u7D20\u3092\u4FEE\u6B63\u3057\u3066\u53D6\u5F97\u3059\u308B', function (done) {
                var data;
                data = [
                    { name: 'taro' },
                    { name: 'jiro' },
                    { name: 'andy' },
                    { name: 'bob' },
                    { name: 'jon' }
                ];
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.findAndModify({ name: 'taro' }, [[
                            'name',
                            1
                        ]], { $set: { age: 18 } }, function (err, doc) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(doc, 'arguments/0/left/object').name, 'arguments/0/left') === 'taro', 'arguments/0'), {
                            content: 'assert(doc.name === \'taro\')',
                            filepath: 'test/mongoTest.js',
                            line: 668
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(doc, 'arguments/0/left/object').age, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(doc.age === void 0)',
                            filepath: 'test/mongoTest.js',
                            line: 669
                        }));
                        return done();
                    });
                });
            });
            return it('{new:true}\u3092\u8A2D\u5B9A\u3059\u308B\u3068$set\u5F8C\u306E\u8981\u7D20\u3092\u53D6\u5F97\u3059\u308B', function (done) {
                var data;
                data = [
                    { name: 'taro' },
                    { name: 'jiro' },
                    { name: 'andy' },
                    { name: 'bob' },
                    { name: 'jon' }
                ];
                return coll.insert(data, { w: 1 }, function (err, result) {
                    return coll.findAndModify({ name: 'taro' }, [[
                            'name',
                            1
                        ]], { $set: { age: 18 } }, { 'new': true }, function (err, doc) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(doc, 'arguments/0/left/object').name, 'arguments/0/left') === 'taro', 'arguments/0'), {
                            content: 'assert(doc.name === \'taro\')',
                            filepath: 'test/mongoTest.js',
                            line: 701
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(doc, 'arguments/0/left/object').age, 'arguments/0/left') === 18, 'arguments/0'), {
                            content: 'assert(doc.age === 18)',
                            filepath: 'test/mongoTest.js',
                            line: 702
                        }));
                        return done();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbW9uZ29UZXN0LmpzIl0sIm5hbWVzIjpbIkJTT04iLCJEYiIsImFzc2VydCIsImxvZyIsIm1vbmdvIiwibW9uZ29VcmkiLCJ1dGlsIiwicmVxdWlyZSIsIkJTT05QdXJlIiwib2JqIiwiY29uc29sZSIsImluc3BlY3QiLCJkZXNjcmliZSIsImNvbGwiLCJkYiIsImpzb24iLCJiZWZvcmUiLCJkb25lIiwiY29ubmVjdCIsImVyciIsIkRCIiwiZHJvcENvbGxlY3Rpb24iLCJjbG9zZSIsImJlZm9yZUVhY2giLCJuYW1lIiwiYmxvb2RfdHlwZSIsImNvbGxlY3Rpb24iLCJhZnRlckVhY2giLCJyZXN1bHQiLCJpdCIsIl9leHByIiwiX2NhcHQiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwiaW5zZXJ0IiwidyIsImZpbmQiLCJ0b0FycmF5IiwiaXRlbXMiLCJsZW5ndGgiLCJlcXVhbCIsIm9rIiwiY29kZSIsIl9pZCIsInNhdmUiLCJ1cGRhdGUiLCJ1cHNlcnQiLCJkYXRhIiwiaSIsIl9pIiwicHVzaCIsImNvdW50IiwiZmluZE9uZSIsIml0ZW0iLCJPYmplY3QiLCJrZXlzIiwiJHNldCIsInR5cGUiLCJtdWx0aSIsIl9qIiwiX2xlbiIsInVwZGF0ZV9hdCIsIiRzZXRPbkluc2VydCIsInN0YXR1cyIsInBsYWNlIiwidGV4dCIsImRpc3RpbmN0IiwiZG9jcyIsInNvcnQiLCJjb3VudDEiLCJjb3VudDIiLCJmaW5kQW5kTW9kaWZ5IiwiYWdlIiwiZG9jIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxJQUFKLEVBQVVDLEVBQVYsRUFBY0MsTUFBZCxFQUFzQkMsR0FBdEIsRUFBMkJDLEtBQTNCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsSUFBNUM7QUFFQUYsS0FBQSxHQUFRRyxPQUFBLENBQVEsU0FBUixDQUFSLENBRkE7QUFJQU4sRUFBQSxHQUFLRyxLQUFBLENBQU1ILEVBQVgsQ0FKQTtBQU1BRCxJQUFBLEdBQU9JLEtBQUEsQ0FBTUksUUFBYixDQU5B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UCxDQXJDaUM7QUFBQSxDQUFuQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCU09OLCBEYiwgYXNzZXJ0LCBsb2csIG1vbmdvLCBtb25nb1VyaSwgdXRpbDtcblxubW9uZ28gPSByZXF1aXJlKFwibW9uZ29kYlwiKTtcblxuRGIgPSBtb25nby5EYjtcblxuQlNPTiA9IG1vbmdvLkJTT05QdXJlO1xuXG5tb25nb1VyaSA9IFwibW9uZ29kYjovL2xvY2FsaG9zdC9tb25nb190ZXN0XCI7XG5cbmFzc2VydCA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydCcpO1xuXG51dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5sb2cgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChvYmosIGZhbHNlLCBudWxsKSk7XG59O1xuXG5kZXNjcmliZShcIm1vbmdvIFRlc3RzXCIsIGZ1bmN0aW9uKCkge1xuICB2YXIgY29sbCwgZGIsIGpzb247XG4gIGRiID0gbnVsbDtcbiAgY29sbCA9IG51bGw7XG4gIGpzb24gPSBudWxsO1xuICBiZWZvcmUoZnVuY3Rpb24oZG9uZSkge1xuICAgIHJldHVybiBEYi5jb25uZWN0KG1vbmdvVXJpLCBmdW5jdGlvbihlcnIsIERCKSB7XG4gICAgICBkYiA9IERCO1xuICAgICAgZGIuZHJvcENvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJyk7XG4gICAgICBkYi5jbG9zZSgpO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgIGpzb24gPSB7XG4gICAgICBuYW1lOiAndGFybycsXG4gICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiBEYi5jb25uZWN0KG1vbmdvVXJpLCBmdW5jdGlvbihlcnIsIERCKSB7XG4gICAgICBkYiA9IERCO1xuICAgICAgcmV0dXJuIGRiLmNvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJywgZnVuY3Rpb24oZXJyLCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGwgPSBjb2xsZWN0aW9uO1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhZnRlckVhY2goZnVuY3Rpb24oZG9uZSkge1xuICAgIHJldHVybiBkYi5kcm9wQ29sbGVjdGlvbigndGVzdENvbGxlY3Rpb24nLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgZGIuY2xvc2UoKTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuICBpdCgndGVzdCBjb25uZWN0aW9uJywgZnVuY3Rpb24oZG9uZSkge1xuICAgIGFzc2VydChjb2xsKTtcbiAgICByZXR1cm4gZG9uZSgpO1xuICB9KTtcbiAgcmV0dXJuIGRlc2NyaWJlKFwiaW5zZXJ0XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLypcbiAgICBpbnNlcnQoZG9jc1ssIG9wdGlvbnNdWywgY2FsbGJhY2tdKVxuICAgICAqL1xuICAgIGl0KFwi5Y2Y5LiA44Gub2JqZWN044KSaW5zZXJ044GZ44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoJ3Rhcm8nLCBpdGVtc1swXS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoanNvbiwge1xuICAgICAgICAgICAgdzogMVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICBhc3NlcnQub2soZXJyKTtcbiAgICAgICAgICAgIGFzc2VydChlcnIuY29kZSA9PT0gMTEwMDApO1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJpbnNlcnTjgZnjgovjgahfaWTjgYxqc29u44Gr6L+95Yqg44GV44KM44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCk7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJzYXZl44GZ44KL44GoX2lk44GManNvbuOBq+i/veWKoOOBleOCjOOCi1wiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICBhc3NlcnQoanNvbi5faWQgPT09IHZvaWQgMCk7XG4gICAgICByZXR1cm4gY29sbC5zYXZlKGpzb24sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCk7XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIl9pZOOBrueEoeOBhGpzb27jgpJ1cHNlcnTjgZnjgovjgahfaWTjga9qc29u44Gr44Gv6L+95Yqg44GV44KM44Gq44GEXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgfSwganNvbiwge1xuICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgIHc6IDFcbiAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KFwi6YWN5YiX44Gr5qC857SN44GV44KM44Gf6KSH5pWw44Gub2JqZWN044KSaW5zZXJ044GZ44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIHZhciBkYXRhLCBpLCBfaTtcbiAgICAgIGRhdGEgPSBbXTtcbiAgICAgIGZvciAoaSA9IF9pID0gMTsgX2kgPD0gMjA7IGkgPSArK19pKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgX2lkOiBpLFxuICAgICAgICAgIG5hbWU6ICdodW1hbicgKyBpXG4gICAgICAgIH07XG4gICAgICAgIGRhdGEucHVzaChqc29uKTtcbiAgICAgIH1cbiAgICAgIGFzc2VydChkYXRhLmxlbmd0aCA9PT0gMjApO1xuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwuY291bnQoZnVuY3Rpb24oZXJyLCBjb3VudCkge1xuICAgICAgICAgIGFzc2VydChjb3VudCwgMjApO1xuICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoXCLphY3liJfjgavmoLzntI3jgZXjgozjgZ/opIfmlbDjga5vYmplY3TjgpJpbnNlcnTjgZfjgZ/lvozjgavjgIHphY3liJfjgavmlrDjgZfjgYRvYmplY3TjgpLov73liqDjgZfjgablho3luqZpbnNlcnTjgZnjgovjgajjgqjjg6njg7xcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgdmFyIGRhdGEsIGksIF9pO1xuICAgICAgZGF0YSA9IFtdO1xuICAgICAgZm9yIChpID0gX2kgPSAxOyBfaSA8PSAyMDsgaSA9ICsrX2kpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBfaWQ6IGksXG4gICAgICAgICAgbmFtZTogJ2h1bWFuJyArIGlcbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5wdXNoKGpzb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICBfaWQ6IDEwMCxcbiAgICAgICAgICBuYW1lOiAnaGFnZSdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuXG4gICAgICAgICAgLypcbiAgICAgICAgICBkYXRhWzBd44GvaW5zZXJ05riI44G/44Gq5omA44Gn5YaN5bqmaW5zZXJ044GZ44KL44Go44Ko44Op44O844Gr44Gq44KLXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXNzZXJ0KGVyci5jb2RlID09PSAxMTAwMCk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgc2F2ZShbZG9jXVssIG9wdGlvbnNdLCBbY2FsbGJhY2tdKVxuICAgICAqL1xuICAgIGRlc2NyaWJlKFwic2F2ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpdChcInNhdmXjga9kb2PjgYzlrZjlnKjjgZfjgarjgZHjgozjgbBpbnNlcnRcXG7lrZjlnKjjgZnjgovjgarjgol1cGRhdGVcXG7jgZ/jgaDjgZd1cGRhdGXjga7loLTlkIjjgIFkb2Pjgb7jgovjgZTjgajjgZ3jga7jgb7jgb7jgavmm7jjgY3mj5vjgYjjgonjgozjgabjgZfjgb7jgYZcXG4o5LiA6YOo44Gu44OX44Ot44OR44OG44Kj44Gg44GR5pu444GN5o+b44GI44Gf44GE5aC05ZCI44Gn44KC44CBZG9j44Gr5YWo44Gm44Gu44OX44Ot44OR44OG44Kj44GM5a2Y5Zyo44GX44Gm44GE44KL5b+F6KaB44GM44GC44KLKVwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIGJsb29kX3R5cGU6ICdBQicsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgX2lkOiAxXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjb2xsLnNhdmUoanNvbiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHtcbiAgICAgICAgICAgIF9pZDogMVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1bJ3Byb3RlY3RlZCddID09PSBmYWxzZSk7XG4gICAgICAgICAgICBqc29uWydwcm90ZWN0ZWQnXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5zYXZlKGpzb24sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIF9pZDogMVxuICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbVsncHJvdGVjdGVkJ10gPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPT09IDQpO1xuICAgICAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICAgICAgICBfaWQ6IDEsXG4gICAgICAgICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLnNhdmUoanNvbiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbVsncHJvdGVjdGVkJ10gPT09IHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCJ1cGRhdGVcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICB1cGRhdGUoc2VsZWN0b3IsIGRvY3VtZW50Wywgb3B0aW9uc11bLCBjYWxsYmFja10pXG4gICAgICAgKi9cbiAgICAgIGl0KFwi5a2Y5Zyo44GX44Gq44GEZG9jdW1lbnTjgpLmuKHjgZnjgajkvZXjgoLov73liqDjgZXjgozjgarjgYTjgYzjgqjjg6njg7zjgavjgoLjgarjgonjgarjgYRcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgIF9pZDogMVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoe30pLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgYXNzZXJ0KGVyciA9PT0gbnVsbCk7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdChcImRvY3VtZW5044GrJHNldOetieOCkuS7mOOBkeOBmuOBq+OBneOBruOBvuOBvuOBrmpzb27jgpLmuKHjgZnjgahzYXZl44Go5ZCM44GY5oyZ5YuV44Gr44Gq44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgYmxvb2RfdHlwZTogJ0FCJyxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZSxcbiAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGpzb24pLmxlbmd0aCA9PT0gNCk7XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuXG4gICAgICAgICAgLypcbiAgICAgICAgICBkb2N1bWVudOOBq3twcm90ZWN0ZWQ6dHJ1ZX3jgpLoqK3lrprjgZnjgovjgajku5bjga7opoHntKDjgYzmtojjgYjjgabjgZfjgb7jgYZcbiAgICAgICAgICAoX2lk44Gv6Ieq5YuV44Gn5LuY5LiO44GV44KM44KLKVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBcInByb3RlY3RlZFwiOiB0cnVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmRPbmUoe30sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbS5ibG9vZF90eXBlID09PSB2b2lkIDApO1xuICAgICAgICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgaXQoXCJkb2N1bWVudOOCknskc2V0OuOBq+Wfi+OCgei+vOOCgOOBqOOBneOBruimgee0oOOBoOOBkeOBjOabuOOBjeaPm+OBiOOCieOCjOOCi1wiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgX2lkOiAxLFxuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhqc29uKS5sZW5ndGggPT09IDQpO1xuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoanNvbiwge1xuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICBcInByb3RlY3RlZFwiOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmRPbmUoe30sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbS5ibG9vZF90eXBlID09PSAnQUInKTtcbiAgICAgICAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gNCk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGl0KFwi6KSH5pWw5Lu244GudXBkYXRl44GX44Gf44Gk44KC44KK44GM5pyA5Yid44GuMeS7tuOBl+OBi3VwZGF0ZeOBp+OBjeOBquOBhFwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHZhciBkYXRhLCBpLCBfaTtcbiAgICAgICAgZGF0YSA9IFtdO1xuICAgICAgICBmb3IgKGkgPSBfaSA9IDE7IF9pIDw9IDIwOyBpID0gKytfaSkge1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBfaWQ6IGksXG4gICAgICAgICAgICBuYW1lOiAnaHVtYW4nICsgaSxcbiAgICAgICAgICAgIHR5cGU6ICdodW1hbidcbiAgICAgICAgICB9O1xuICAgICAgICAgIGRhdGEucHVzaChqc29uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoZGF0YSwge1xuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgdHlwZTogJ2h1bWFuJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3JvYm90J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKHt9KS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzBdWyd0eXBlJ10gPT09ICdyb2JvdCcpO1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbXNbMV1bJ3R5cGUnXSAhPT0gJ3JvYm90Jyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBpdChcIm9wdGlvbnPjgat7bXVsdGk6IHRydWV944KS5rih44Gb44Gw5YWo5Lu2dXBsb2Fk44Gn44GN44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgdmFyIGRhdGEsIGksIF9pO1xuICAgICAgICBkYXRhID0gW107XG4gICAgICAgIGZvciAoaSA9IF9pID0gMTsgX2kgPD0gMjA7IGkgPSArK19pKSB7XG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIF9pZDogaSxcbiAgICAgICAgICAgIG5hbWU6ICdodW1hbicgKyBpLFxuICAgICAgICAgICAgdHlwZTogJ2h1bWFuJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgZGF0YS5wdXNoKGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICB0eXBlOiAnaHVtYW4nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICB0eXBlOiAncm9ib3QnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCh7fSkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIHZhciBpdGVtLCBfaiwgX2xlbjtcbiAgICAgICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4gPSBpdGVtcy5sZW5ndGg7IF9qIDwgX2xlbjsgX2orKykge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtc1tfal07XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1bJ3R5cGUnXSA9PT0gJ3JvYm90Jyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwidXBzZXJ0XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvKlxuICAgICAgdXBkYXRlKHNlbGVjdG9yLCBkb2N1bWVudCwge3Vwc2VydDp0cnVlfSAoYW5kIG90aGVyIG9wdGlvbnMpWywgY2FsbGJhY2tdKVxuICAgICAgICovXG4gICAgICBpdChcInVwc2VydDFcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICB1cGRhdGVfYXQ6IG51bGwsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAvKlxuICAgICAgICBjb2xsZWN0aW9u44Gv56m644Gq44Gu44Gn5pyA5Yid44GudXBzZXJ044GvaW5zZXJ044Gr44Gq44KLXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIOWApOOCkuabuOOBjeaPm+OBiOOBpnVwc2VydOOBmeOCi+OBqOOBmeOBp+OBq+WtmOWcqOOBmeOCi+OBruOBp3VwZGF0ZeOBq+OBquOCi1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBqc29uWydwcm90ZWN0ZWQnXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgICAgICB3OiAxXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIOOCu+ODrOOCr+OCv+OBp+OBguOCi1snbmFtZSdd44KS5pu444GN5o+b44GI44KL44Go5paw6KaP44Kq44OW44K444Kn44Kv44OI44Go6KqN6K2Y44GV44KM44GmaW5zZXJ044Gr44Gq44KLXG4gICAgICAgICAgICAgICAgKF9pZOOBjOioreWumuOBleOCjOOBpuOBhOOBquOBhOWgtOWQiClcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBqc29uWyduYW1lJ10gPSAnamlybyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdqaXJvJ1xuICAgICAgICAgICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICAgICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHc6IDFcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KFwidXBzZXJ0MlwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIHVwZGF0ZV9hdDogbnVsbCxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZSxcbiAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgfTtcblxuICAgICAgICAvKlxuICAgICAgICBjb2xsZWN0aW9u44Gv56m644Gq44Gu44Gn5pyA5Yid44GudXBzZXJ044GvaW5zZXJ044Gr44Gq44KLXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgIHc6IDFcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIOWApOOCkuabuOOBjeaPm+OBiOOBpnVwc2VydOOBmeOCi+OBqOOBmeOBp+OBq+WtmOWcqOOBmeOCi+OBruOBp3VwZGF0ZeOBq+OBquOCi1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBqc29uWydwcm90ZWN0ZWQnXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgICAgICB3OiAxXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIOOCu+ODrOOCr+OCv+OBp+OBguOCi1snbmFtZSdd44KS5pu444GN5o+b44GI44Gm44KCWydfaWQnXeOBjOWQjOOBmOOBquOBruOBp3VwZGF0ZeOBq+OBquOCi1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGpzb25bJ25hbWUnXSA9ICdqaXJvJztcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgdzogMVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCIkc2V0T25JbnNlcnRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICB1cGRhdGUoc2VsZWN0b3IsIGRvY3VtZW50KCRzZXRPbkluc2VydCksIHt1cHNlcnQ6dHJ1ZX0gKGFuZCBvdGhlciBvcHRpb25zKVssIGNhbGxiYWNrXSlcbiAgICAgICAqL1xuICAgICAgaXQoJyRzZXRPbkluc2VydCDjga7pg6jliIbjga91cGRhdGXjgZXjgozjgarjgYQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgIHN0YXR1czogJ251bGwnXG4gICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgdXBzZXJ0OiB0cnVlXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG4gICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgJHNldE9uSW5zZXJ0OiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnbnVsbCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgJHNldE9uSW5zZXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2luc2VydCdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtLnN0YXR1cyA9PT0gJ251bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbS5zdGF0dXMgIT09ICdpbnNlcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KCckc2V0IOOBrumDqOWIhuOBr3VwZGF0ZeOBleOCjOOCiycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwge1xuICAgICAgICAgICRzZXRPbkluc2VydDoge1xuICAgICAgICAgICAgc3RhdHVzOiAnbnVsbCdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIG5hbWU6ICdqaXJvJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdudWxsJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHVwc2VydDogdHJ1ZVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnaW5zZXJ0J1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAndXBkYXRlJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIHVwc2VydDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW0uc3RhdHVzICE9PSAnbnVsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtLnN0YXR1cyA9PT0gJ3VwZGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCJkaXN0aW5jdFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgLypcbiAgICAgIGRpc3RpbmN0KGtleVssIHF1ZXJ5XVssIG9wdGlvbnNdLCBjYWxsYmFjaylcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGl0KCfph43opIfooYzjgpLpmaTlpJbjgZfjgabjg4fjg7zjgr/jgpLlj5blvpcnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBkYXRhID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICAgIHBsYWNlOiAndG9reW8nLFxuICAgICAgICAgICAgdGV4dDogJ+OBk+OCk+OBq+OBoeOBr+OBk+OCk+OBq+OBoeOBr++8gSdcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgICBwbGFjZTogJ3Rva3lvJyxcbiAgICAgICAgICAgIHRleHQ6ICfjgZPjgpPjgbDjgpPjga/jgZPjgpPjgbDjgpPjga/vvIEnXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ppcm8nLFxuICAgICAgICAgICAgcGxhY2U6ICdvc2FrYScsXG4gICAgICAgICAgICB0ZXh0OiAn44G+44GE44Gp44G+44GE44GpJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdoYW5ha28nLFxuICAgICAgICAgICAgcGxhY2U6ICd0b2t5bycsXG4gICAgICAgICAgICB0ZXh0OiAnaGV5IWd1eXMhJ1xuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZGlzdGluY3QoJ25hbWUnLCBmdW5jdGlvbihlcnIsIGRvY3MpIHtcbiAgICAgICAgICAgIGFzc2VydChlcnIgPT09IG51bGwpO1xuICAgICAgICAgICAgYXNzZXJ0KGRvY3MubGVuZ3RoID09PSAzKTtcbiAgICAgICAgICAgIGFzc2VydChkb2NzLnNvcnQoKVswXSA9PT0gW1widGFyb1wiLCBcImppcm9cIiwgXCJoYW5ha29cIl0uc29ydCgpWzBdKTtcbiAgICAgICAgICAgIGFzc2VydChkb2NzLnNvcnQoKVsxXSA9PT0gW1widGFyb1wiLCBcImppcm9cIiwgXCJoYW5ha29cIl0uc29ydCgpWzFdKTtcbiAgICAgICAgICAgIGFzc2VydChkb2NzLnNvcnQoKVsyXSA9PT0gW1widGFyb1wiLCBcImppcm9cIiwgXCJoYW5ha29cIl0uc29ydCgpWzJdKTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmRpc3RpbmN0KCduYW1lJywge1xuICAgICAgICAgICAgICBwbGFjZTogJ3Rva3lvJ1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBkb2NzKSB7XG4gICAgICAgICAgICAgIGFzc2VydChkb2NzLmxlbmd0aCA9PT0gMik7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcImNvdW50XCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvKlxuICAgICAgY291bnQoW3F1ZXJ5XVssIG9wdGlvbnNdLCBjYWxsYmFjaylcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIGl0KCfjgrPjg6zjgq/jgrfjg6fjg7Pjga7opoHntKDmlbDjgpLlj5blvpcnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBkYXRhID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdqaXJvJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdhbmR5J1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdib2InXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2pvbidcbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmNvdW50KGZ1bmN0aW9uKGVyciwgY291bnQxKSB7XG4gICAgICAgICAgICBhc3NlcnQoY291bnQxID09PSA1KTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmNvdW50KHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGNvdW50Mikge1xuICAgICAgICAgICAgICBhc3NlcnQoY291bnQyID09PSAxKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkZXNjcmliZShcImZpbmRBbmRNb2RpZnlcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICBbZmluZEFuZE1vZGlmeShxdWVyeSwgc29ydCwgZG9jWywgb3B0aW9uc10sIGNhbGxiYWNrKV0oaHR0cDovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvYXBpLWdlbmVyYXRlZC9jb2xsZWN0aW9uLmh0bWwjZmluZGFuZG1vZGlmeSlcbiAgICAgICAqL1xuICAgICAgaXQoJ+imgee0oOOCkuS/ruato+OBl+OBpuWPluW+l+OBmeOCiycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGRhdGEgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2FuZHknXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JvYidcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnam9uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZEFuZE1vZGlmeSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCBbWyduYW1lJywgMV1dLCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIGFnZTogMThcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIGRvYykge1xuICAgICAgICAgICAgYXNzZXJ0KGRvYy5uYW1lID09PSAndGFybycpO1xuICAgICAgICAgICAgYXNzZXJ0KGRvYy5hZ2UgPT09IHZvaWQgMCk7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KCd7bmV3OnRydWV944KS6Kit5a6a44GZ44KL44GoJHNldOW+jOOBruimgee0oOOCkuWPluW+l+OBmeOCiycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGRhdGEgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2FuZHknXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JvYidcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnam9uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZEFuZE1vZGlmeSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCBbWyduYW1lJywgMV1dLCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIGFnZTogMThcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBcIm5ld1wiOiB0cnVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBkb2MpIHtcbiAgICAgICAgICAgIGFzc2VydChkb2MubmFtZSA9PT0gJ3Rhcm8nKTtcbiAgICAgICAgICAgIGFzc2VydChkb2MuYWdlID09PSAxOCk7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19
