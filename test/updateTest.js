var BSON, Db, assert, log, mongo, mongoUri, util;

mongo = require("mongodb");

Db = mongo.Db;

BSON = mongo.BSONPure;

mongoUri = "mongodb://localhost/mongo_test";

assert = require('power-assert');

util = require('util');

log = function(obj) {
  return console.log(util.inspect(obj, false, null));
};

describe("update Tests", function() {
  var coll, db, json;
  db = null;
  coll = null;
  json = null;
  before(function(done) {
    return Db.connect(mongoUri, function(err, DB) {
      db = DB;
      db.dropCollection('testCollection');
      db.close();
      return done();
    });
  });
  beforeEach(function(done) {
    return Db.connect(mongoUri, function(err, DB) {
      db = DB;
      return db.collection('testCollection', function(err, collection) {
        coll = collection;
        return done();
      });
    });
  });
  afterEach(function(done) {
    return db.dropCollection('testCollection', function(err, result) {
      db.close();
      return done();
    });
  });

  /*
  update(selector, document, {upsert:true} (and other options)[, callback])
   */
  describe("$inc", function() {
    return describe("指定の値をインクリメントする", function() {
      it('インクリメントの値は自由に指定できる', function(done) {
        return coll.insert({
          name: 'taro',
          age: 18
        }, function(err, result) {
          return coll.update({
            name: 'taro'
          }, {
            $inc: {
              age: -5
            }
          }, function(err, result) {
            return coll.findOne({}, function(err, item) {
              assert(item.age === 13);
              return done();
            });
          });
        });
      });
      it('複数の値を同時に変更できる', function(done) {
        return coll.insert({
          name: 'taro',
          age: 18,
          point: 100
        }, function(err, result) {
          return coll.update({
            name: 'taro'
          }, {
            $inc: {
              age: 1,
              point: 10
            }
          }, function(err, result) {
            return coll.findOne({}, function(err, item) {
              assert(item.age === 19);
              assert(item.point === 110);
              return done();
            });
          });
        });
      });
      return it('{multi:true}を設定するとselectorで抽出された全てに適用する', function(done) {
        var data;
        data = [
          {
            name: 'taro',
            age: 18,
            team: 'A'
          }, {
            name: 'jiro',
            age: 17,
            team: 'A'
          }, {
            name: 'siro',
            age: 12,
            team: 'A'
          }, {
            name: 'kuro',
            age: 1,
            team: 'B'
          }
        ];
        return coll.insert(data, function(err, result) {
          return coll.update({
            team: 'A'
          }, {
            $inc: {
              age: 1
            }
          }, {
            multi: true
          }, function(err, result) {
            assert(result === 3);
            return coll.find().toArray(function(err, items) {
              assert(items[0].age === 19);
              assert(items[1].age === 18);
              assert(items[2].age === 13);
              return done();
            });
          });
        });
      });
    });
  });
  describe("$mul", function() {
    return describe("指定の値を掛ける", function() {
      return it('http://docs.mongodb.org/manual/reference/operator/update/mul/');
    });
  });
  return describe("$setOnInsert", function() {
    describe("insert時の挙動", function() {
      it('$setOnInsertでinsertの代わりになる', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'first'
          }
        }, {
          upsert: true
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);
            return done();
          });
        });
      });
      it('upsertをfalseにするとinsertはされない', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'first'
          }
        }, {
          upsert: false
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 0);
            return done();
          });
        });
      });
      it('$setOnInsertと$set 両方の値が追加される', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'first'
          },
          $set: {
            age: 18
          }
        }, {
          upsert: true
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);
            assert(items[0].status === 'first');
            assert(items[0].age === 18);
            return done();
          });
        });
      });
      return it('$setOnInsertと$set 両方に同じ要素名を指定するとなにも追加されない', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'first'
          },
          $set: {
            status: 'other'
          }
        }, {
          upsert: true
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 0);
            assert(items[0] === void 0);
            return done();
          });
        });
      });
    });
    return describe("update時の挙動", function() {
      it('$setOnInsertは無視される', function(done) {
        return coll.insert({
          name: 'taro'
        }, function(err, result) {
          return coll.update({
            name: 'taro'
          }, {
            $setOnInsert: {
              status: 'first'
            }
          }, {
            upsert: true
          }, function(err, result) {
            return coll.find().toArray(function(err, items) {
              assert(items.length === 1);
              assert(items[0].name === 'taro');
              assert(items[0].status === void 0);
              return done();
            });
          });
        });
      });
      return it('$setを設定するとそっちだけが更新される', function(done) {
        return coll.insert({
          name: 'taro'
        }, function(err, result) {
          return coll.update({
            name: 'taro'
          }, {
            $setOnInsert: {
              status: 'first'
            },
            $set: {
              age: 18,
              name: 'jiro'
            }
          }, {
            upsert: true
          }, function(err, result) {
            return coll.find().toArray(function(err, items) {
              assert(items.length === 1);
              assert(items[0].name === 'jiro');
              assert(items[0].age === 18);
              assert(items[0].status === void 0);
              return done();
            });
          });
        });
      });
    });
  });
});
