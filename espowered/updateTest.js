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
describe('update Tests', function () {
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
    describe('$inc', function () {
        return describe('\u6307\u5B9A\u306E\u5024\u3092\u30A4\u30F3\u30AF\u30EA\u30E1\u30F3\u30C8\u3059\u308B', function () {
            it('\u30A4\u30F3\u30AF\u30EA\u30E1\u30F3\u30C8\u306E\u5024\u306F\u81EA\u7531\u306B\u6307\u5B9A\u3067\u304D\u308B', function (done) {
                return coll.insert({
                    name: 'taro',
                    age: 18
                }, function (err, result) {
                    return coll.update({ name: 'taro' }, { $inc: { age: -5 } }, function (err, result) {
                        return coll.findOne({}, function (err, item) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').age, 'arguments/0/left') === 13, 'arguments/0'), {
                                content: 'assert(item.age === 13)',
                                filepath: 'test/updateTest.js',
                                line: 66
                            }));
                            return done();
                        });
                    });
                });
            });
            it('\u8907\u6570\u306E\u5024\u3092\u540C\u6642\u306B\u5909\u66F4\u3067\u304D\u308B', function (done) {
                return coll.insert({
                    name: 'taro',
                    age: 18,
                    point: 100
                }, function (err, result) {
                    return coll.update({ name: 'taro' }, {
                        $inc: {
                            age: 1,
                            point: 10
                        }
                    }, function (err, result) {
                        return coll.findOne({}, function (err, item) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').age, 'arguments/0/left') === 19, 'arguments/0'), {
                                content: 'assert(item.age === 19)',
                                filepath: 'test/updateTest.js',
                                line: 87
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(item, 'arguments/0/left/object').point, 'arguments/0/left') === 110, 'arguments/0'), {
                                content: 'assert(item.point === 110)',
                                filepath: 'test/updateTest.js',
                                line: 88
                            }));
                            return done();
                        });
                    });
                });
            });
            return it('{multi:true}\u3092\u8A2D\u5B9A\u3059\u308B\u3068selector\u3067\u62BD\u51FA\u3055\u308C\u305F\u5168\u3066\u306B\u9069\u7528\u3059\u308B', function (done) {
                var data;
                data = [
                    {
                        name: 'taro',
                        age: 18,
                        team: 'A'
                    },
                    {
                        name: 'jiro',
                        age: 17,
                        team: 'A'
                    },
                    {
                        name: 'siro',
                        age: 12,
                        team: 'A'
                    },
                    {
                        name: 'kuro',
                        age: 1,
                        team: 'B'
                    }
                ];
                return coll.insert(data, function (err, result) {
                    return coll.update({ team: 'A' }, { $inc: { age: 1 } }, { multi: true }, function (err, result) {
                        assert(assert._expr(assert._capt(assert._capt(result, 'arguments/0/left') === 3, 'arguments/0'), {
                            content: 'assert(result === 3)',
                            filepath: 'test/updateTest.js',
                            line: 125
                        }));
                        return coll.find().toArray(function (err, items) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').age, 'arguments/0/left') === 19, 'arguments/0'), {
                                content: 'assert(items[0].age === 19)',
                                filepath: 'test/updateTest.js',
                                line: 127
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[1], 'arguments/0/left/object').age, 'arguments/0/left') === 18, 'arguments/0'), {
                                content: 'assert(items[1].age === 18)',
                                filepath: 'test/updateTest.js',
                                line: 128
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[2], 'arguments/0/left/object').age, 'arguments/0/left') === 13, 'arguments/0'), {
                                content: 'assert(items[2].age === 13)',
                                filepath: 'test/updateTest.js',
                                line: 129
                            }));
                            return done();
                        });
                    });
                });
            });
        });
    });
    describe('$mul', function () {
        return describe('\u6307\u5B9A\u306E\u5024\u3092\u639B\u3051\u308B', function () {
            return it('http://docs.mongodb.org/manual/reference/operator/update/mul/');
        });
    });
    return describe('$setOnInsert', function () {
        describe('insert\u6642\u306E\u6319\u52D5', function () {
            it('$setOnInsert\u3067insert\u306E\u4EE3\u308F\u308A\u306B\u306A\u308B', function (done) {
                return coll.update({ name: 'taro' }, { $setOnInsert: { status: 'first' } }, { upsert: true }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/updateTest.js',
                            line: 155
                        }));
                        return done();
                    });
                });
            });
            it('upsert\u3092false\u306B\u3059\u308B\u3068insert\u306F\u3055\u308C\u306A\u3044', function (done) {
                return coll.update({ name: 'taro' }, { $setOnInsert: { status: 'first' } }, { upsert: false }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                            content: 'assert(items.length === 0)',
                            filepath: 'test/updateTest.js',
                            line: 171
                        }));
                        return done();
                    });
                });
            });
            it('$setOnInsert\u3068$set \u4E21\u65B9\u306E\u5024\u304C\u8FFD\u52A0\u3055\u308C\u308B', function (done) {
                return coll.update({ name: 'taro' }, {
                    $setOnInsert: { status: 'first' },
                    $set: { age: 18 }
                }, { upsert: true }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                            content: 'assert(items.length === 1)',
                            filepath: 'test/updateTest.js',
                            line: 190
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').status, 'arguments/0/left') === 'first', 'arguments/0'), {
                            content: 'assert(items[0].status === \'first\')',
                            filepath: 'test/updateTest.js',
                            line: 191
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').age, 'arguments/0/left') === 18, 'arguments/0'), {
                            content: 'assert(items[0].age === 18)',
                            filepath: 'test/updateTest.js',
                            line: 192
                        }));
                        return done();
                    });
                });
            });
            return it('$setOnInsert\u3068$set \u4E21\u65B9\u306B\u540C\u3058\u8981\u7D20\u540D\u3092\u6307\u5B9A\u3059\u308B\u3068\u306A\u306B\u3082\u8FFD\u52A0\u3055\u308C\u306A\u3044', function (done) {
                return coll.update({ name: 'taro' }, {
                    $setOnInsert: { status: 'first' },
                    $set: { status: 'other' }
                }, { upsert: true }, function (err, result) {
                    return coll.find().toArray(function (err, items) {
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 0, 'arguments/0'), {
                            content: 'assert(items.length === 0)',
                            filepath: 'test/updateTest.js',
                            line: 211
                        }));
                        assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object')[0], 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                            content: 'assert(items[0] === void 0)',
                            filepath: 'test/updateTest.js',
                            line: 212
                        }));
                        return done();
                    });
                });
            });
        });
        return describe('update\u6642\u306E\u6319\u52D5', function () {
            it('$setOnInsert\u306F\u7121\u8996\u3055\u308C\u308B', function (done) {
                return coll.insert({ name: 'taro' }, function (err, result) {
                    return coll.update({ name: 'taro' }, { $setOnInsert: { status: 'first' } }, { upsert: true }, function (err, result) {
                        return coll.find().toArray(function (err, items) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                                content: 'assert(items.length === 1)',
                                filepath: 'test/updateTest.js',
                                line: 233
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'taro', 'arguments/0'), {
                                content: 'assert(items[0].name === \'taro\')',
                                filepath: 'test/updateTest.js',
                                line: 234
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').status, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert(items[0].status === void 0)',
                                filepath: 'test/updateTest.js',
                                line: 235
                            }));
                            return done();
                        });
                    });
                });
            });
            return it('$set\u3092\u8A2D\u5B9A\u3059\u308B\u3068\u305D\u3063\u3061\u3060\u3051\u304C\u66F4\u65B0\u3055\u308C\u308B', function (done) {
                return coll.insert({ name: 'taro' }, function (err, result) {
                    return coll.update({ name: 'taro' }, {
                        $setOnInsert: { status: 'first' },
                        $set: {
                            age: 18,
                            name: 'jiro'
                        }
                    }, { upsert: true }, function (err, result) {
                        return coll.find().toArray(function (err, items) {
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object').length, 'arguments/0/left') === 1, 'arguments/0'), {
                                content: 'assert(items.length === 1)',
                                filepath: 'test/updateTest.js',
                                line: 259
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').name, 'arguments/0/left') === 'jiro', 'arguments/0'), {
                                content: 'assert(items[0].name === \'jiro\')',
                                filepath: 'test/updateTest.js',
                                line: 260
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').age, 'arguments/0/left') === 18, 'arguments/0'), {
                                content: 'assert(items[0].age === 18)',
                                filepath: 'test/updateTest.js',
                                line: 261
                            }));
                            assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(items, 'arguments/0/left/object/object')[0], 'arguments/0/left/object').status, 'arguments/0/left') === assert._capt(void 0, 'arguments/0/right'), 'arguments/0'), {
                                content: 'assert(items[0].status === void 0)',
                                filepath: 'test/updateTest.js',
                                line: 262
                            }));
                            return done();
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdXBkYXRlVGVzdC5qcyJdLCJuYW1lcyI6WyJCU09OIiwiRGIiLCJhc3NlcnQiLCJsb2ciLCJtb25nbyIsIm1vbmdvVXJpIiwidXRpbCIsInJlcXVpcmUiLCJCU09OUHVyZSIsIm9iaiIsImNvbnNvbGUiLCJpbnNwZWN0IiwiZGVzY3JpYmUiLCJjb2xsIiwiZGIiLCJqc29uIiwiYmVmb3JlIiwiZG9uZSIsImNvbm5lY3QiLCJlcnIiLCJEQiIsImRyb3BDb2xsZWN0aW9uIiwiY2xvc2UiLCJiZWZvcmVFYWNoIiwiY29sbGVjdGlvbiIsImFmdGVyRWFjaCIsInJlc3VsdCIsIml0IiwiaW5zZXJ0IiwibmFtZSIsImFnZSIsInVwZGF0ZSIsIiRpbmMiLCJmaW5kT25lIiwiaXRlbSIsIl9leHByIiwiX2NhcHQiLCJjb250ZW50IiwiZmlsZXBhdGgiLCJsaW5lIiwicG9pbnQiLCJkYXRhIiwidGVhbSIsIm11bHRpIiwiZmluZCIsInRvQXJyYXkiLCJpdGVtcyIsIiRzZXRPbkluc2VydCIsInN0YXR1cyIsInVwc2VydCIsImxlbmd0aCIsIiRzZXQiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLElBQUosRUFBVUMsRUFBVixFQUFjQyxNQUFkLEVBQXNCQyxHQUF0QixFQUEyQkMsS0FBM0IsRUFBa0NDLFFBQWxDLEVBQTRDQyxJQUE1QztBQUVBRixLQUFBLEdBQVFHLE9BQUEsQ0FBUSxTQUFSLENBQVIsQ0FGQTtBQUlBTixFQUFBLEdBQUtHLEtBQUEsQ0FBTUgsRUFBWCxDQUpBO0FBTUFELElBQUEsR0FBT0ksS0FBQSxDQUFNSSxRQUFiLENBTkE7QUFRQUgsUUFBQSxHQUFXLGdDQUFYLENBUkE7QUFVQUgsTUFBQSxHQUFTSyxPQUFBLENBQVEsY0FBUixDQUFULENBVkE7QUFZQUQsSUFBQSxHQUFPQyxPQUFBLENBQVEsTUFBUixDQUFQLENBWkE7QUFjQUosR0FBQSxHQUFNLFVBQVNNLEdBQVQsRUFBYztBQUFBLElBQ2xCLE9BQU9DLE9BQUEsQ0FBUVAsR0FBUixD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QUEsaUJBRmxCLENBQVAsQ0FEZ0Q7QUFBQSxhQUEzQyxDQUFQLENBdkJ1QztBQUFBLFNBQWxDLENBQVAsQ0E1RXlDO0FBQUEsS0FBcEMsQ0FBUCxDQTNIa0M7QUFBQSxDQUFwQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCU09OLCBEYiwgYXNzZXJ0LCBsb2csIG1vbmdvLCBtb25nb1VyaSwgdXRpbDtcblxubW9uZ28gPSByZXF1aXJlKFwibW9uZ29kYlwiKTtcblxuRGIgPSBtb25nby5EYjtcblxuQlNPTiA9IG1vbmdvLkJTT05QdXJlO1xuXG5tb25nb1VyaSA9IFwibW9uZ29kYjovL2xvY2FsaG9zdC9tb25nb190ZXN0XCI7XG5cbmFzc2VydCA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydCcpO1xuXG51dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5sb2cgPSBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChvYmosIGZhbHNlLCBudWxsKSk7XG59O1xuXG5kZXNjcmliZShcInVwZGF0ZSBUZXN0c1wiLCBmdW5jdGlvbigpIHtcbiAgdmFyIGNvbGwsIGRiLCBqc29uO1xuICBkYiA9IG51bGw7XG4gIGNvbGwgPSBudWxsO1xuICBqc29uID0gbnVsbDtcbiAgYmVmb3JlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICByZXR1cm4gRGIuY29ubmVjdChtb25nb1VyaSwgZnVuY3Rpb24oZXJyLCBEQikge1xuICAgICAgZGIgPSBEQjtcbiAgICAgIGRiLmRyb3BDb2xsZWN0aW9uKCd0ZXN0Q29sbGVjdGlvbicpO1xuICAgICAgZGIuY2xvc2UoKTtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICByZXR1cm4gRGIuY29ubmVjdChtb25nb1VyaSwgZnVuY3Rpb24oZXJyLCBEQikge1xuICAgICAgZGIgPSBEQjtcbiAgICAgIHJldHVybiBkYi5jb2xsZWN0aW9uKCd0ZXN0Q29sbGVjdGlvbicsIGZ1bmN0aW9uKGVyciwgY29sbGVjdGlvbikge1xuICAgICAgICBjb2xsID0gY29sbGVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICByZXR1cm4gZGIuZHJvcENvbGxlY3Rpb24oJ3Rlc3RDb2xsZWN0aW9uJywgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgIGRiLmNsb3NlKCk7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICAvKlxuICB1cGRhdGUoc2VsZWN0b3IsIGRvY3VtZW50LCB7dXBzZXJ0OnRydWV9IChhbmQgb3RoZXIgb3B0aW9ucylbLCBjYWxsYmFja10pXG4gICAqL1xuICBkZXNjcmliZShcIiRpbmNcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlc2NyaWJlKFwi5oyH5a6a44Gu5YCk44KS44Kk44Oz44Kv44Oq44Oh44Oz44OI44GZ44KLXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaXQoJ+OCpOODs+OCr+ODquODoeODs+ODiOOBruWApOOBr+iHqueUseOBq+aMh+WumuOBp+OBjeOCiycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KHtcbiAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgYWdlOiAxOFxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkaW5jOiB7XG4gICAgICAgICAgICAgIGFnZTogLTVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZE9uZSh7fSwgZnVuY3Rpb24oZXJyLCBpdGVtKSB7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtLmFnZSA9PT0gMTMpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdCgn6KSH5pWw44Gu5YCk44KS5ZCM5pmC44Gr5aSJ5pu044Gn44GN44KLJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJyxcbiAgICAgICAgICBhZ2U6IDE4LFxuICAgICAgICAgIHBvaW50OiAxMDBcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgJGluYzoge1xuICAgICAgICAgICAgICBhZ2U6IDEsXG4gICAgICAgICAgICAgIHBvaW50OiAxMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kT25lKHt9LCBmdW5jdGlvbihlcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW0uYWdlID09PSAxOSk7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtLnBvaW50ID09PSAxMTApO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaXQoJ3ttdWx0aTp0cnVlfeOCkuioreWumuOBmeOCi+OBqHNlbGVjdG9y44Gn5oq95Ye644GV44KM44Gf5YWo44Gm44Gr6YGp55So44GZ44KLJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgZGF0YSA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAndGFybycsXG4gICAgICAgICAgICBhZ2U6IDE4LFxuICAgICAgICAgICAgdGVhbTogJ0EnXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2ppcm8nLFxuICAgICAgICAgICAgYWdlOiAxNyxcbiAgICAgICAgICAgIHRlYW06ICdBJ1xuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICdzaXJvJyxcbiAgICAgICAgICAgIGFnZTogMTIsXG4gICAgICAgICAgICB0ZWFtOiAnQSdcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAna3VybycsXG4gICAgICAgICAgICBhZ2U6IDEsXG4gICAgICAgICAgICB0ZWFtOiAnQidcbiAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBjb2xsLmluc2VydChkYXRhLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICB0ZWFtOiAnQSdcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkaW5jOiB7XG4gICAgICAgICAgICAgIGFnZTogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgIGFzc2VydChyZXN1bHQgPT09IDMpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbXNbMF0uYWdlID09PSAxOSk7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtc1sxXS5hZ2UgPT09IDE4KTtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzJdLmFnZSA9PT0gMTMpO1xuICAgICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZShcIiRtdWxcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlc2NyaWJlKFwi5oyH5a6a44Gu5YCk44KS5o6b44GR44KLXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGl0KCdodHRwOi8vZG9jcy5tb25nb2RiLm9yZy9tYW51YWwvcmVmZXJlbmNlL29wZXJhdG9yL3VwZGF0ZS9tdWwvJyk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZGVzY3JpYmUoXCIkc2V0T25JbnNlcnRcIiwgZnVuY3Rpb24oKSB7XG4gICAgZGVzY3JpYmUoXCJpbnNlcnTmmYLjga7mjJnli5VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBpdCgnJHNldE9uSW5zZXJ044GnaW5zZXJ044Gu5Luj44KP44KK44Gr44Gq44KLJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgJHNldE9uSW5zZXJ0OiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdmaXJzdCdcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdCgndXBzZXJ044KSZmFsc2XjgavjgZnjgovjgahpbnNlcnTjga/jgZXjgozjgarjgYQnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgIHN0YXR1czogJ2ZpcnN0J1xuICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHVwc2VydDogZmFsc2VcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpdCgnJHNldE9uSW5zZXJ044GoJHNldCDkuKHmlrnjga7lgKTjgYzov73liqDjgZXjgozjgosnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgIHN0YXR1czogJ2ZpcnN0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgYWdlOiAxOFxuICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHVwc2VydDogdHJ1ZVxuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLmZpbmQoKS50b0FycmF5KGZ1bmN0aW9uKGVyciwgaXRlbXMpIHtcbiAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzBdLnN0YXR1cyA9PT0gJ2ZpcnN0Jyk7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXNbMF0uYWdlID09PSAxOCk7XG4gICAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KCckc2V0T25JbnNlcnTjgagkc2V0IOS4oeaWueOBq+WQjOOBmOimgee0oOWQjeOCkuaMh+WumuOBmeOCi+OBqOOBquOBq+OCgui/veWKoOOBleOCjOOBquOBhCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwudXBkYXRlKHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwge1xuICAgICAgICAgICRzZXRPbkluc2VydDoge1xuICAgICAgICAgICAgc3RhdHVzOiAnZmlyc3QnXG4gICAgICAgICAgfSxcbiAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICBzdGF0dXM6ICdvdGhlcidcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAwKTtcbiAgICAgICAgICAgIGFzc2VydChpdGVtc1swXSA9PT0gdm9pZCAwKTtcbiAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlc2NyaWJlKFwidXBkYXRl5pmC44Gu5oyZ5YuVXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgaXQoJyRzZXRPbkluc2VydOOBr+eEoeimluOBleOCjOOCiycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuIGNvbGwuaW5zZXJ0KHtcbiAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gY29sbC51cGRhdGUoe1xuICAgICAgICAgICAgbmFtZTogJ3Rhcm8nXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgJHNldE9uSW5zZXJ0OiB7XG4gICAgICAgICAgICAgIHN0YXR1czogJ2ZpcnN0J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIHVwc2VydDogdHJ1ZVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbC5maW5kKCkudG9BcnJheShmdW5jdGlvbihlcnIsIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbXNbMF0ubmFtZSA9PT0gJ3Rhcm8nKTtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzBdLnN0YXR1cyA9PT0gdm9pZCAwKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGl0KCckc2V044KS6Kit5a6a44GZ44KL44Go44Gd44Gj44Gh44Gg44GR44GM5pu05paw44GV44KM44KLJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICByZXR1cm4gY29sbC5pbnNlcnQoe1xuICAgICAgICAgIG5hbWU6ICd0YXJvJ1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBjb2xsLnVwZGF0ZSh7XG4gICAgICAgICAgICBuYW1lOiAndGFybydcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAkc2V0T25JbnNlcnQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAnZmlyc3QnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICBhZ2U6IDE4LFxuICAgICAgICAgICAgICBuYW1lOiAnamlybydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGwuZmluZCgpLnRvQXJyYXkoZnVuY3Rpb24oZXJyLCBpdGVtcykge1xuICAgICAgICAgICAgICBhc3NlcnQoaXRlbXMubGVuZ3RoID09PSAxKTtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzBdLm5hbWUgPT09ICdqaXJvJyk7XG4gICAgICAgICAgICAgIGFzc2VydChpdGVtc1swXS5hZ2UgPT09IDE4KTtcbiAgICAgICAgICAgICAgYXNzZXJ0KGl0ZW1zWzBdLnN0YXR1cyA9PT0gdm9pZCAwKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19
