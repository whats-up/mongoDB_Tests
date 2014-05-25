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
        describe('insert or null', function () {
            return it('insert or null -1');
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
                            line: 486
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object').length, 'arguments/0/left') === 3, 'arguments/0'), {
                            content: 'assert(docs.length === 3)',
                            filepath: 'test/mongoTest.js',
                            line: 487
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[0], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[0], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[0] === ["taro","jiro","hanako"].sort()[0])',
                            filepath: 'test/mongoTest.js',
                            line: 488
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[1], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[1], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[1] === ["taro","jiro","hanako"].sort()[1])',
                            filepath: 'test/mongoTest.js',
                            line: 489
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object/callee/object').sort(), 'arguments/0/left/object')[2], 'arguments/0/left') === assert._capt(assert._capt([
                            'taro',
                            'jiro',
                            'hanako'
                        ].sort(), 'arguments/0/right/object')[2], 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(docs.sort()[2] === ["taro","jiro","hanako"].sort()[2])',
                            filepath: 'test/mongoTest.js',
                            line: 490
                        }));
                        return coll.distinct('name', { place: 'tokyo' }, function (err, docs) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(docs, 'arguments/0/left/object').length, 'arguments/0/left') === 2, 'arguments/0'), {
                                content: 'assert(docs.length === 2)',
                                filepath: 'test/mongoTest.js',
                                line: 494
                            }));
                            return done();
                        });
                    });
                });
            });
        });
        return describe('count', function () {
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
                            line: 525
                        }));
                        return coll.count({ name: 'taro' }, function (err, count2) {
                            assert(assert._expr(assert._capt(assert._capt(count2, 'arguments/0/left') === 1, 'arguments/0'), {
                                content: 'assert(count2 === 1)',
                                filepath: 'test/mongoTest.js',
                                line: 529
                            }));
                            return done();
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbW9uZ29UZXN0LmpzIl0sIm5hbWVzIjpbIkJTT04iLCJEYiIsImFzc2VydCIsImxvZyIsIm1vbmdvIiwibW9uZ29VcmkiLCJ1dGlsIiwicmVxdWlyZSIsIkJTT05QdXJlIiwib2JqIiwiY29uc29sZSIsImluc3BlY3QiLCJkZXNjcmliZSIsImNvbGwiLCJkYiIsImpzb24iLCJiZWZvcmUiLCJkb25lIiwiY29ubmVjdCIsImVyciIsIkRCIiwiZHJvcENvbGxlY3Rpb24iLCJjbG9zZSIsImJlZm9yZUVhY2giLCJuYW1lIiwiYmxvb2RfdHlwZSIsImNvbGxlY3Rpb24iLCJhZnRlckVhY2giLCJyZXN1bHQiLCJpdCIsIl9leHByIiwiX2NhcHQiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwiaW5zZXJ0IiwidyIsImZpbmQiLCJ0b0FycmF5IiwiaXRlbXMiLCJsZW5ndGgiLCJlcXVhbCIsIm9rIiwiY29kZSIsIl9pZCIsInNhdmUiLCJ1cGRhdGUiLCJ1cHNlcnQiLCJkYXRhIiwiaSIsIl9pIiwicHVzaCIsImNvdW50IiwiZmluZE9uZSIsIml0ZW0iLCJPYmplY3QiLCJrZXlzIiwiJHNldCIsInR5cGUiLCJtdWx0aSIsIl9qIiwiX2xlbiIsInVwZGF0ZV9hdCIsInBsYWNlIiwidGV4dCIsImRpc3RpbmN0IiwiZG9jcyIsInNvcnQiLCJjb3VudDEiLCJjb3VudDIiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLElBQUosRUFBVUMsRUFBVixFQUFjQyxNQUFkLEVBQXNCQyxHQUF0QixFQUEyQkMsS0FBM0IsRUFBa0NDLFFBQWxDLEVBQTRDQyxJQUE1QztBQUVBRixLQUFBLEdBQVFHLE9BQUEsQ0FBUSxTQUFSLENBQVIsQ0FGQTtBQUlBTixFQUFBLEdBQUtHLEtBQUEsQ0FBTUgsRUFBWCxDQUpBO0FBTUFELElBQUEsR0FBT0ksS0FBQSxDQUFNSSxRQUFiLENBTkE7QUFRQUgsUUFBQSxHQUFXLGdDQUFYLENBUkE7QUFVQUgsTUFBQSxHQUFTSyxPQUFBLENB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QUZzQztBQUFBLHFCQUFqQyxDQUFQLENBRHVCO0FBQUEsaUJBRmxCLENBQVAsQ0Fmd0M7QUFBQSxhQUFuQyxDQUFQLENBTGtDO0FBQUEsU0FBN0IsQ0FBUCxDQTdibUM7QUFBQSxLQUE5QixDQUFQLENBckM4QjtBQUFBLENBQWhDIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJTT04sIERiLCBhc3NlcnQsIGxvZywgbW9uZ28sIG1vbmdvVXJpLCB1dGlsO1xuXG5tb25nbyA9IHJlcXVpcmUoXCJtb25nb2RiXCIpO1xuXG5EYiA9IG1vbmdvLkRiO1xuXG5CU09OID0gbW9uZ28uQlNPTlB1cmU7XG5cbm1vbmdvVXJpID0gXCJtb25nb2RiOi8vbG9jYWxob3N0L21vbmdvX3Rlc3RcIjtcblxuYXNzZXJ0ID0gcmVxdWlyZSgncG93ZXItYXNzZXJ0Jyk7XG5cbnV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbmxvZyA9IGZ1bmN0aW9uKG9iaikge1xuICByZXR1cm4gY29uc29sZS5sb2codXRpbC5pbnNwZWN0KG9iaiwgZmFsc2UsIG51bGwpKTtcbn07XG5cbmRlc2NyaWJlKFwibXlNb2R1bGVcIiwgZnVuY3Rpb24oKSB7XG4gIHZhciBjb2xsLCBkYiwganNvbjtcbiAgZGIgPSBudWxsO1xuICBjb2xsID0gbnVsbDtcbiAganNvbiA9IG51bGw7XG4gIGJlZm9yZShmdW5jdGlvbihkb25lKSB7XG4gICAgcmV0dXJuIERiLmNvbm5lY3QobW9uZ29VcmksIGZ1bmN0aW9uKGVyciwgREIpIHtcbiAgICAgIGRiID0gREI7XG4gICAgICBkYi5kcm9wQ29sbGVjdGlvbigndGVzdENvbGxlY3Rpb24nKTtcbiAgICAgIGRiLmNsb3NlKCk7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbihkb25lKSB7XG4gICAganNvbiA9IHtcbiAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgIGJsb29kX3R5cGU6ICdBQicsXG4gICAgICBcInByb3RlY3RlZFwiOiBmYWxzZVxuICAgIH07XG4gICAgcmV0dXJuIERiLmNvbm5lY3QobW9uZ29VcmksIGZ1bmN0aW9uKGVyciwgREIpIHtcbiAgICAgIGRiID0gREI7XG4gICAgICByZXR1cm4gZGIuY29sbGVjdGlvbigndGVzdENvbGxlY3Rpb24nLCBmdW5jdGlvbihlcnIsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbCA9IGNvbGxlY3Rpb247XG4gICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGFmdGVyRWFjaChmdW5jdGlvbihkb25lKSB7XG4gICAgcmV0dXJuIGRiLmRyb3BDb2xsZWN0aW9uKCd0ZXN0Q29sbGVjdGlvbicsIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICBkYi5jbG9zZSgpO1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG4gIGl0KCd0ZXN0IGNvbm5lY3Rpb24nLCBmdW5jdGlvbihkb25lKSB7XG4gICAgYXNzZXJ0KGNvbGwpO1xuICAgIHJldHVybiBkb25lKCk7XG4gIH0pO1xuICByZXR1cm4gZGVzY3JpYmUoXCJpbnNlcnRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvKlxuICAgIGluc2VydChkb2NzWywgb3B0aW9uc11bLCBjYWxsYmFja10pXG4gICAgICovXG4gICAgaXQoXCLljZjkuIDjga5vYmplY3TjgpJpbnNlcnTjgZnjgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGpzb24sIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICAgIGFzc2VydC5lcXVhbCgndGFybycsIGl0ZW1zWzBdLm5hbWUpO1xuICAgICAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgICAgICB3OiAxXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIGFzc2VydC5vayhlcnIpO1xuICAgICAgICAgICAgYXNzZXJ0KGVyci5jb2RlID09PSAxMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KFwiX2lk44Gu54Sh44GEanNvbuOCkmluc2VydOOBmeOCi+OBqF9pZOOBjGpzb27jgavov73liqDjgZXjgozjgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgYXNzZXJ0KGpzb24uX2lkID09PSB2b2lkIDApO1xuICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGpzb24sIHtcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgYXNzZXJ0KGpzb24uX2lkKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KFwiX2lk44Gu54Sh44GEanNvbuOCknNhdmXjgZnjgovjgahfaWTjgYxqc29u44Gr6L+95Yqg44GV44KM44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgIGFzc2VydChqc29uLl9pZCA9PT0gdm9pZCAwKTtcbiAgICAgIHJldHVybiBjb2xsLnNhdmUoanNvbiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgYXNzZXJ0KGpzb24uX2lkKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KFwiX2lk44Gu54Sh44GEanNvbuOCknVwc2VydOOBmeOCi+OBqF9pZOOBr2pzb27jgavjga/ov73liqDjgZXjgozjgarjgYRcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgYXNzZXJ0KGpzb24uX2lkID09PSB2b2lkIDApO1xuICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICB9LCBqc29uLCB7XG4gICAgICAgIHVwc2VydDogdHJ1ZSxcbiAgICAgICAgdzogMVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgYXNzZXJ0KGpzb24uX2lkID09PSB2b2lkIDApO1xuICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoXCLphY3liJfjgavmoLzntI3jgZXjgozjgZ/opIfmlbDjga5vYmplY3TjgpJpbnNlcnTjgZnjgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgdmFyIGRhdGEsIGksIF9pO1xuICAgICAgZGF0YSA9IFtdO1xuICAgICAgZm9yIChpID0gX2kgPSAxOyBfaSA8PSAyMDsgaSA9ICsrX2kpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBfaWQ6IGksXG4gICAgICAgICAgbmFtZTogJ2h1bWFuJyArIGlcbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5wdXNoKGpzb24pO1xuICAgICAgfVxuICAgICAgYXNzZXJ0KGRhdGEubGVuZ3RoID09PSAyMCk7XG4gICAgICByZXR1cm4gY29sbC5pbnNlcnQoZGF0YSwge1xuICAgICAgICB3OiAxXG4gICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gY29sbC5jb3VudChmdW5jdGlvbihlcnIsIGNvdW50KSB7XG4gICAgICAgICAgYXNzZXJ0KGNvdW50LCAyMCk7XG4gICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdChcIumFjeWIl+OBq+agvOe0jeOBleOCjOOBn+ikh+aVsOOBrm9iamVjdOOCkmluc2VydOOBl+OBn+W+jOOBq+OAgemFjeWIl+OBq+aWsOOBl+OBhG9iamVjdOOCkui/veWKoOOBl+OBpuWGjeW6pmluc2VydOOBmeOCi+OBqOOCqOODqeODvFwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICB2YXIgZGF0YSwgaSwgX2k7XG4gICAgICBkYXRhID0gW107XG4gICAgICBmb3IgKGkgPSBfaSA9IDE7IF9pIDw9IDIwOyBpID0gKytfaSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIF9pZDogaSxcbiAgICAgICAgICBuYW1lOiAnaHVtYW4nICsgaVxuICAgICAgICB9O1xuICAgICAgICBkYXRhLnB1c2goanNvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sbC5pbnNlcnQoZGF0YSwge1xuICAgICAgICB3OiAxXG4gICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIF9pZDogMTAwLFxuICAgICAgICAgIG5hbWU6ICdoYWdlJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG5cbiAgICAgICAgICAvKlxuICAgICAgICAgIGRhdGFbMF3jga9pbnNlcnTmuIjjgb/jgarmiYDjgaflho3luqZpbnNlcnTjgZnjgovjgajjgqjjg6njg7zjgavjgarjgotcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhc3NlcnQoZXJyLmNvZGUgPT09IDExMDAwKTtcbiAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICBzYXZlKFtkb2NdWywgb3B0aW9uc10sIFtjYWxsYmFja10pXG4gICAgICovXG4gICAgZGVzY3JpYmUoXCJzYXZlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0KFwic2F2ZeOBr2RvY+OBjOWtmOWcqOOBl+OBquOBkeOCjOOBsGluc2VydFxcbuWtmOWcqOOBmeOCi+OBquOCiXVwZGF0ZVxcbuOBn+OBoOOBl3VwZGF0ZeOBruWgtOWQiOOAgWRvY+OBvuOCi+OBlOOBqOOBneOBruOBvuOBvuOBq+abuOOBjeaPm+OBiOOCieOCjOOBpuOBl+OBvuOBhlxcbijkuIDpg6jjga7jg5fjg63jg5Hjg4bjgqPjgaDjgZHmm7jjgY3mj5vjgYjjgZ/jgYTloLTlkIjjgafjgoLjgIFkb2Pjgavlhajjgabjga7jg5fjg63jg5Hjg4bjgqPjgYzlrZjlnKjjgZfjgabjgYTjgovlv4XopoHjgYzjgYLjgospXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgYmxvb2RfdHlwZTogJ0FCJyxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZSxcbiAgICAgICAgICBfaWQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNvbGwuc2F2ZShqc29uLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmZpbmRPbmUoe1xuICAgICAgICAgICAgX2lkOiAxXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbVsncHJvdGVjdGVkJ10gPT09IGZhbHNlKTtcbiAgICAgICAgICAgIGpzb25bJ3Byb3RlY3RlZCddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLnNhdmUoanNvbiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgX2lkOiAxXG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgaXRlbSkge1xuICAgICAgICAgICAgICAgIGFzc2VydChpdGVtWydwcm90ZWN0ZWQnXSA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gNCk7XG4gICAgICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgICAgICAgIF9pZDogMSxcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuc2F2ZShqc29uLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogMVxuICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtWydwcm90ZWN0ZWQnXSA9PT0gdm9pZCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcInVwZGF0ZVwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgLypcbiAgICAgIHVwZGF0ZShzZWxlY3RvciwgZG9jdW1lbnRbLCBvcHRpb25zXVssIGNhbGxiYWNrXSlcbiAgICAgICAqL1xuICAgICAgaXQoXCLlrZjlnKjjgZfjgarjgYRkb2N1bWVudOOCkua4oeOBmeOBqOS9leOCgui/veWKoOOBleOCjOOBquOBhOOBjOOCqOODqeODvOOBq+OCguOBquOCieOBquOBhFwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIGJsb29kX3R5cGU6ICdBQicsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2UsXG4gICAgICAgICAgX2lkOiAxXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCh7fSkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoZXJyID09PSBudWxsKTtcbiAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDApO1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGl0KFwiZG9jdW1lbnTjgaskc2V0562J44KS5LuY44GR44Ga44Gr44Gd44Gu44G+44G+44GuanNvbuOCkua4oeOBmeOBqHNhdmXjgajlkIzjgZjmjJnli5XjgavjgarjgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICBqc29uID0ge1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICBibG9vZF90eXBlOiAnQUInLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgIF9pZDogMVxuICAgICAgICB9O1xuICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoanNvbikubGVuZ3RoID09PSA0KTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGpzb24sIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG5cbiAgICAgICAgICAvKlxuICAgICAgICAgIGRvY3VtZW5044Gre3Byb3RlY3RlZDp0cnVlfeOCkuioreWumuOBmeOCi+OBqOS7luOBruimgee0oOOBjOa2iOOBiOOBpuOBl+OBvuOBhlxuICAgICAgICAgIChfaWTjga/oh6rli5Xjgafku5jkuI7jgZXjgozjgospXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwicHJvdGVjdGVkXCI6IHRydWVcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7fSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtLmJsb29kX3R5cGUgPT09IHZvaWQgMCk7XG4gICAgICAgICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdChcImRvY3VtZW5044KSeyRzZXQ644Gr5Z+L44KB6L6844KA44Go44Gd44Gu6KaB57Sg44Gg44GR44GM5pu444GN5o+b44GI44KJ44KM44KLXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBfaWQ6IDEsXG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIGJsb29kX3R5cGU6ICdBQicsXG4gICAgICAgICAgXCJwcm90ZWN0ZWRcIjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGpzb24pLmxlbmd0aCA9PT0gNCk7XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChqc29uLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIFwicHJvdGVjdGVkXCI6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7fSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtLmJsb29kX3R5cGUgPT09ICdBQicpO1xuICAgICAgICAgICAgICBhc3NlcnQoT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSA0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgaXQoXCLopIfmlbDku7bjga51cGRhdGXjgZfjgZ/jgaTjgoLjgorjgYzmnIDliJ3jga4x5Lu244GX44GLdXBkYXRl44Gn44GN44Gq44GEXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgdmFyIGRhdGEsIGksIF9pO1xuICAgICAgICBkYXRhID0gW107XG4gICAgICAgIGZvciAoaSA9IF9pID0gMTsgX2kgPD0gMjA7IGkgPSArK19pKSB7XG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIF9pZDogaSxcbiAgICAgICAgICAgIG5hbWU6ICdodW1hbicgKyBpLFxuICAgICAgICAgICAgdHlwZTogJ2h1bWFuJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgZGF0YS5wdXNoKGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICB0eXBlOiAnaHVtYW4nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICB0eXBlOiAncm9ib3QnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoe30pLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbXNbMF1bJ3R5cGUnXSA9PT0gJ3JvYm90Jyk7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtc1sxXVsndHlwZSddICE9PSAncm9ib3QnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KFwib3B0aW9uc+OBq3ttdWx0aTogdHJ1ZX3jgpLmuKHjgZvjgbDlhajku7Z1cGxvYWTjgafjgY3jgotcIiwgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICB2YXIgZGF0YSwgaSwgX2k7XG4gICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgZm9yIChpID0gX2kgPSAxOyBfaSA8PSAyMDsgaSA9ICsrX2kpIHtcbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgX2lkOiBpLFxuICAgICAgICAgICAgbmFtZTogJ2h1bWFuJyArIGksXG4gICAgICAgICAgICB0eXBlOiAnaHVtYW4nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBkYXRhLnB1c2goanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICAgIHR5cGU6ICdodW1hbidcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdyb2JvdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKHt9KS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgdmFyIGl0ZW0sIF9qLCBfbGVuO1xuICAgICAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbiA9IGl0ZW1zLmxlbmd0aDsgX2ogPCBfbGVuOyBfaisrKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1zW19qXTtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbVsndHlwZSddID09PSAncm9ib3QnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoXCJ1cHNlcnRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICB1cGRhdGUoc2VsZWN0b3IsIGRvY3VtZW50LCB7dXBzZXJ0OnRydWV9IChhbmQgb3RoZXIgb3B0aW9ucylbLCBjYWxsYmFja10pXG4gICAgICAgKi9cbiAgICAgIGl0KFwidXBzZXJ0MVwiLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgIHVwZGF0ZV9hdDogbnVsbCxcbiAgICAgICAgICBcInByb3RlY3RlZFwiOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qXG4gICAgICAgIGNvbGxlY3Rpb27jga/nqbrjgarjga7jgafmnIDliJ3jga51cHNlcnTjga9pbnNlcnTjgavjgarjgotcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAg5YCk44KS5pu444GN5o+b44GI44GmdXBzZXJ044GZ44KL44Go44GZ44Gn44Gr5a2Y5Zyo44GZ44KL44Gu44GndXBkYXRl44Gr44Gq44KLXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGpzb25bJ3Byb3RlY3RlZCddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgICAgIHc6IDFcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAg44K744Os44Kv44K/44Gn44GC44KLWyduYW1lJ13jgpLmm7jjgY3mj5vjgYjjgovjgajmlrDopo/jgqrjg5bjgrjjgqfjgq/jg4jjgajoqo3orZjjgZXjgozjgaZpbnNlcnTjgavjgarjgotcbiAgICAgICAgICAgICAgICAoX2lk44GM6Kit5a6a44GV44KM44Gm44GE44Gq44GE5aC05ZCIKVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGpzb25bJ25hbWUnXSA9ICdqaXJvJztcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgICAgICAgICAgdXBzZXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgdzogMVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaXQoXCJ1cHNlcnQyXCIsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAganNvbiA9IHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgdXBkYXRlX2F0OiBudWxsLFxuICAgICAgICAgIFwicHJvdGVjdGVkXCI6IGZhbHNlLFxuICAgICAgICAgIF9pZDogMVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qXG4gICAgICAgIGNvbGxlY3Rpb27jga/nqbrjgarjga7jgafmnIDliJ3jga51cHNlcnTjga9pbnNlcnTjgavjgarjgotcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIGpzb24sIHtcbiAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAg5YCk44KS5pu444GN5o+b44GI44GmdXBzZXJ044GZ44KL44Go44GZ44Gn44Gr5a2Y5Zyo44GZ44KL44Gu44GndXBkYXRl44Gr44Gq44KLXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGpzb25bJ3Byb3RlY3RlZCddID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICAgICAgfSwganNvbiwge1xuICAgICAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgICAgIHc6IDFcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAg44K744Os44Kv44K/44Gn44GC44KLWyduYW1lJ13jgpLmm7jjgY3mj5vjgYjjgabjgoJbJ19pZCdd44GM5ZCM44GY44Gq44Gu44GndXBkYXRl44Gr44Gq44KLXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAganNvblsnbmFtZSddID0gJ2ppcm8nO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgICAgICB9LCBqc29uLCB7XG4gICAgICAgICAgICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICB3OiAxXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zLmxlbmd0aCA9PT0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZShcImluc2VydCBvciBudWxsXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0KCdpbnNlcnQgb3IgbnVsbCAtMScpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKFwiZGlzdGluY3RcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICBkaXN0aW5jdChrZXlbLCBxdWVyeV1bLCBvcHRpb25zXSwgY2FsbGJhY2spXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBpdCgn6YeN6KSH6KGM44KS6Zmk5aSW44GX44Gm44OH44O844K/44KS5Y+W5b6XJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgZGF0YSA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgICBwbGFjZTogJ3Rva3lvJyxcbiAgICAgICAgICAgIHRleHQ6ICfjgZPjgpPjgavjgaHjga/jgZPjgpPjgavjgaHjga/vvIEnXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nLFxuICAgICAgICAgICAgcGxhY2U6ICd0b2t5bycsXG4gICAgICAgICAgICB0ZXh0OiAn44GT44KT44Gw44KT44Gv44GT44KT44Gw44KT44Gv77yBJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdqaXJvJyxcbiAgICAgICAgICAgIHBsYWNlOiAnb3Nha2EnLFxuICAgICAgICAgICAgdGV4dDogJ+OBvuOBhOOBqeOBvuOBhOOBqSdcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnaGFuYWtvJyxcbiAgICAgICAgICAgIHBsYWNlOiAndG9reW8nLFxuICAgICAgICAgICAgdGV4dDogJ2hleSFndXlzISdcbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCB7XG4gICAgICAgICAgdzogMVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmRpc3RpbmN0KCduYW1lJywgZnVuY3Rpb24oZXJyLCBkb2NzKSB7XG4gICAgICAgICAgICBhc3NlcnQoZXJyID09PSBudWxsKTtcbiAgICAgICAgICAgIGFzc2VydChkb2NzLmxlbmd0aCA9PT0gMyk7XG4gICAgICAgICAgICBhc3NlcnQoZG9jcy5zb3J0KClbMF0gPT09IFtcInRhcm9cIiwgXCJqaXJvXCIsIFwiaGFuYWtvXCJdLnNvcnQoKVswXSk7XG4gICAgICAgICAgICBhc3NlcnQoZG9jcy5zb3J0KClbMV0gPT09IFtcInRhcm9cIiwgXCJqaXJvXCIsIFwiaGFuYWtvXCJdLnNvcnQoKVsxXSk7XG4gICAgICAgICAgICBhc3NlcnQoZG9jcy5zb3J0KClbMl0gPT09IFtcInRhcm9cIiwgXCJqaXJvXCIsIFwiaGFuYWtvXCJdLnNvcnQoKVsyXSk7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5kaXN0aW5jdCgnbmFtZScsIHtcbiAgICAgICAgICAgICAgcGxhY2U6ICd0b2t5bydcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgZG9jcykge1xuICAgICAgICAgICAgICBhc3NlcnQoZG9jcy5sZW5ndGggPT09IDIpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlc2NyaWJlKFwiY291bnRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8qXG4gICAgICBjb3VudChbcXVlcnldWywgb3B0aW9uc10sIGNhbGxiYWNrKVxuICAgICAgICovXG4gICAgICByZXR1cm4gaXQoJ+OCs+ODrOOCr+OCt+ODp+ODs+OBruimgee0oOaVsOOCkuWPluW+lycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGRhdGEgPSBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ppcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2FuZHknXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2JvYidcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnam9uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KGRhdGEsIHtcbiAgICAgICAgICB3OiAxXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIGNvbGwuY291bnQoZnVuY3Rpb24oZXJyLCBjb3VudDEpIHtcbiAgICAgICAgICAgIGFzc2VydChjb3VudDEgPT09IDUpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuY291bnQoe1xuICAgICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgY291bnQyKSB7XG4gICAgICAgICAgICAgIGFzc2VydChjb3VudDIgPT09IDEpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=
