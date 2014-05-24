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

describe("myModule", function() {
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
    json = {
      name: 'taro',
      blood_type: 'AB',
      "protected": false
    };
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
  it('接続テスト', function(done) {
    assert(coll);
    return done();
  });
  return describe("insert", function() {

    /*
    insert(docs[, options][, callback])
     */
    it("単一のobjectをinsertする", function(done) {
      return coll.insert(json, {
        w: 1
      }, function(err, result) {
        return coll.find().toArray(function(err, items) {
          assert(items.length === 1);
          assert.equal('taro', items[0].name);
          return coll.insert(json, {
            w: 1
          }, function(err, result) {
            assert.ok(err);
            assert(err.code === 11000);
            return done();
          });
        });
      });
    });
    it("_idの無いjsonをinsertすると_idがjsonに追加される", function(done) {
      assert(json._id === void 0);
      return coll.insert(json, {
        w: 1
      }, function(err, result) {
        assert(json._id);
        return done();
      });
    });
    it("_idの無いjsonをsaveすると_idがjsonに追加される", function(done) {
      assert(json._id === void 0);
      return coll.save(json, function(err, result) {
        assert(json._id);
        return done();
      });
    });
    it("_idの無いjsonをupsertすると_idはjsonには追加されない", function(done) {
      assert(json._id === void 0);
      return coll.update({
        name: 'taro'
      }, json, {
        upsert: true,
        w: 1
      }, function(err, result) {
        assert(json._id === void 0);
        return done();
      });
    });
    it("配列に格納された複数のobjectをinsertする", function(done) {
      var data, i, _i;
      data = [];
      for (i = _i = 1; _i <= 20; i = ++_i) {
        json = {
          _id: i,
          name: 'human' + i
        };
        data.push(json);
      }
      assert(data.length === 20);
      return coll.insert(data, {
        w: 1
      }, function(err, result) {
        return coll.count(function(err, count) {
          assert(count, 20);
          return done();
        });
      });
    });
    it("配列に格納された複数のobjectをinsertした後に、配列に新しいobjectを追加して再度insertするとエラー", function(done) {
      var data, i, _i;
      data = [];
      for (i = _i = 1; _i <= 20; i = ++_i) {
        json = {
          _id: i,
          name: 'human' + i
        };
        data.push(json);
      }
      return coll.insert(data, {
        w: 1
      }, function(err, result) {
        data.push({
          _id: 100,
          name: 'hage'
        });
        return coll.insert(data, {
          w: 1
        }, function(err, result) {

          /*
          data[0]はinsert済みな所で再度insertするとエラーになる
           */
          assert(err.err === 'E11000 duplicate key error index: mongo_test.testCollection.$_id_  dup key: { : 1 }');
          return done();
        });
      });
    });

    /*
    save([doc][, options], [callback])
     */
    describe("save", function() {
      return it("saveはdocが存在しなければinsert\n存在するならupdate\nただしupdateの場合、docまるごとそのままに書き換えられてしまう\n(一部のプロパティだけ書き換えたい場合でも、docに全てのプロパティが存在している必要がある)", function(done) {
        json = {
          name: 'taro',
          blood_type: 'AB',
          "protected": false,
          _id: 1
        };
        return coll.save(json, function(err, result) {
          return coll.findOne({
            _id: 1
          }, function(err, item) {
            assert(item['protected'] === false);
            json['protected'] = true;
            return coll.save(json, function(err, result) {
              return coll.findOne({
                _id: 1
              }, function(err, item) {
                assert(item['protected'] === true);
                assert(Object.keys(item).length === 4);
                json = {
                  _id: 1,
                  name: 'taro'
                };
                return coll.save(json, function(err, result) {
                  return coll.findOne({
                    _id: 1
                  }, function(err, item) {
                    assert(item['protected'] === void 0);
                    assert(Object.keys(item).length === 2);
                    return done();
                  });
                });
              });
            });
          });
        });
      });
    });
    describe("update", function() {

      /*
      update(selector, document[, options][, callback])
       */
      it("存在しないdocumentを渡すと何も追加されないがエラーにもならない", function(done) {
        json = {
          name: 'taro',
          blood_type: 'AB',
          "protected": false,
          _id: 1
        };
        return coll.update({
          name: 'taro'
        }, json, {
          w: 1
        }, function(err, result) {
          return coll.find({}).toArray(function(err, items) {
            assert(err === null);
            assert(items.length === 0);
            return done();
          });
        });
      });
      it("documentに$set等を付けずにそのままのjsonを渡すとsaveと同じ挙動になる", function(done) {
        json = {
          name: 'taro',
          blood_type: 'AB',
          "protected": false,
          _id: 1
        };
        assert(Object.keys(json).length === 4);
        return coll.insert(json, {
          w: 1
        }, function(err, result) {

          /*
          documentに{protected:true}を設定すると他の要素が消えてしまう
          (_idは自動で付与される)
           */
          return coll.update({
            name: 'taro'
          }, {
            "protected": true
          }, function(err, result) {
            return coll.findOne({}, function(err, item) {
              assert(item.blood_type === void 0);
              assert(Object.keys(item).length === 2);
              return done();
            });
          });
        });
      });
      it("documentを{$set:に埋め込むとその要素だけが書き換えられる", function(done) {
        json = {
          _id: 1,
          name: 'taro',
          blood_type: 'AB',
          "protected": false
        };
        assert(Object.keys(json).length === 4);
        return coll.insert(json, {
          w: 1
        }, function(err, result) {
          return coll.update({
            name: 'taro'
          }, {
            $set: {
              "protected": true
            }
          }, function(err, result) {
            return coll.findOne({}, function(err, item) {
              assert(item.blood_type === 'AB');
              assert(Object.keys(item).length === 4);
              return done();
            });
          });
        });
      });
      it("複数件のupdateしたつもりが最初の1件しかupdateできない", function(done) {
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
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.update({
            type: 'human'
          }, {
            $set: {
              type: 'robot'
            }
          }, function(err, result) {
            return coll.find({}).toArray(function(err, items) {
              assert(items[0]['type'] === 'robot');
              assert(items[1]['type'] !== 'robot');
              return done();
            });
          });
        });
      });
      return it("optionsに{multi: true}を渡せば全件uploadできる", function(done) {
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
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.update({
            type: 'human'
          }, {
            $set: {
              type: 'robot'
            }
          }, {
            multi: true
          }, function(err, result) {
            return coll.find({}).toArray(function(err, items) {
              var item, _j, _len;
              for (_j = 0, _len = items.length; _j < _len; _j++) {
                item = items[_j];
                assert(item['type'] === 'robot');
              }
              return done();
            });
          });
        });
      });
    });
    describe("upsert", function() {

      /*
      update(selector, document, {upsert:true} (and other options)[, callback])
       */
      it("upsert1", function(done) {
        json = {
          name: 'taro',
          update_at: null,
          "protected": false
        };

        /*
        collectionは空なので最初のupsertはinsertになる
         */
        return coll.update({
          name: 'taro'
        }, json, {
          upsert: true,
          w: 1
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);

            /*
            値を書き換えてupsertするとすでに存在するのでupdateになる
             */
            json['protected'] = true;
            return coll.update({
              name: 'taro'
            }, json, {
              upsert: true,
              w: 1
            }, function(err, result) {
              return coll.find().toArray(function(err, items) {
                assert(items.length === 1);

                /*
                セレクタである['name']を書き換えると新規オブジェクトと認識されてinsertになる
                (_idが設定されていない場合)
                 */
                json['name'] = 'jiro';
                return coll.update({
                  name: 'jiro'
                }, json, {
                  upsert: true,
                  w: 1
                }, function(err, result) {
                  return coll.find().toArray(function(err, items) {
                    assert(items.length === 2);
                    return done();
                  });
                });
              });
            });
          });
        });
      });
      return it("upsert2", function(done) {
        json = {
          name: 'taro',
          update_at: null,
          "protected": false,
          _id: 1
        };

        /*
        collectionは空なので最初のupsertはinsertになる
         */
        return coll.update({
          name: 'taro'
        }, json, {
          upsert: true,
          w: 1
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);

            /*
            値を書き換えてupsertするとすでに存在するのでupdateになる
             */
            json['protected'] = true;
            return coll.update({
              name: 'taro'
            }, json, {
              upsert: true,
              w: 1
            }, function(err, result) {
              return coll.find().toArray(function(err, items) {
                assert(items.length === 1);

                /*
                セレクタである['name']を書き換えても['_id']が同じなのでupdateになる
                 */
                json['name'] = 'jiro';
                return coll.update({
                  name: 'jiro'
                }, json, {
                  upsert: true,
                  w: 1
                }, function(err, result) {
                  return coll.find().toArray(function(err, items) {
                    assert(items.length === 1);
                    return done();
                  });
                });
              });
            });
          });
        });
      });
    });
    describe("insert or null", function() {
      return it('insert or null -1');
    });
    return describe("distinkt", function() {
      return it('insert or null -1');
    });
  });
});

module.exports = {
  upsert003: function() {
    var json;
    json = {
      name: 'taro',
      update_at: null,
      "protected": false,
      _id: 1
    };
    return collection.update({
      name: 'taro'
    }, json, {
      upsert: true,
      w: 1
    }, function(err, result) {
      return collection.find().toArray(function(err, items) {
        log("insert:");
        log(items);
        json['protected'] = true;
        return collection.save(json, function(err, result) {
          return collection.find().toArray(function(err, items) {
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
