var BSON, Db, assert, jsonDict, jsonFunc, log, mongo, mongoUri, util;

mongo = require("mongodb");

Db = mongo.Db;

BSON = mongo.BSONPure;

mongoUri = "mongodb://localhost/mongo_test";

assert = require('power-assert');

util = require('util');

log = function(obj) {
  return console.log(util.inspect(obj, false, null));
};

jsonFunc = function() {
  return {
    name: 'jon',
    age: 20
  };
};

jsonDict = {
  name: 'jon',
  age: 20
};

describe("insert Tests", function() {
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
  return describe("insert", function() {

    /*
    insert(docs[, options][, callback])
     */
    it("insertの第一引数にobjectを渡すとinsertできる。再度同じobjectを渡してもinsertできる", function(done) {
      return coll.insert({
        name: 'taro'
      }, function(err, result) {
        assert(err === null);
        return coll.insert({
          name: 'taro'
        }, function(err, result) {
          assert(err === null);
          return coll.find().toArray(function(err, items) {
            assert(items.length === 2);
            return done();
          });
        });
      });
    });
    it("objectを変数化してinsertすると2回めで失敗する", function(done) {
      json = {
        name: 'taro'
      };
      return coll.insert(json, function(err, result) {
        assert(err === null);
        coll.insert(json, function(err, result) {
          return assert(err);
        });
        return done();
      });
    });
    it("変数化したjsonにはinsertしたタイミングで_idが付与されている", function(done) {
      json = {
        name: 'taro'
      };
      assert(json._id === void 0);
      return coll.insert(json, function(err, result) {
        assert(json._id);
        return done();
      });
    });
    it('jsonをグローバル変数から取得した場合も_idは付与される(書き換わる)', function(done) {
      json = jsonDict;
      assert(json._id === void 0);
      return coll.insert(json, function(err, result) {
        var json2;
        assert(json._id);
        json2 = jsonDict;
        assert(json2 === json);
        return done();
      });
    });
    return it('jsonを関数から取得した場合、_idは付与されない', function(done) {
      json = jsonFunc();
      assert(json._id === void 0);
      return coll.insert(json, function(err, result) {
        var json2;
        assert(json._id);
        json2 = jsonFunc();
        assert(json2._id === void 0);
        return done();
      });
    });
  });
});
