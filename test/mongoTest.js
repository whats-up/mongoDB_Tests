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

describe("mongo Tests", function() {
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
  it('test connection', function(done) {
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
          assert(err.code === 11000);
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
    describe("$setOnInsert", function() {

      /*
      update(selector, document($setOnInsert), {upsert:true} (and other options)[, callback])
       */
      it('$setOnInsert の部分はupdateされない', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'null'
          }
        }, {
          upsert: true
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);
            return coll.update({
              name: 'jiro'
            }, {
              $setOnInsert: {
                status: 'null'
              }
            }, {
              upsert: true
            }, function(err, result) {
              return coll.find().toArray(function(err, items) {
                assert(items.length === 2);
                return coll.update({
                  name: 'jiro'
                }, {
                  $setOnInsert: {
                    status: 'insert'
                  }
                }, {
                  upsert: true
                }, function(err, result) {
                  return coll.find().toArray(function(err, items) {
                    assert(items.length === 2);
                    return coll.findOne({
                      name: 'jiro'
                    }, function(err, item) {
                      assert(item.status === 'null');
                      assert(item.status !== 'insert');
                      return done();
                    });
                  });
                });
              });
            });
          });
        });
      });
      return it('$set の部分はupdateされる', function(done) {
        return coll.update({
          name: 'taro'
        }, {
          $setOnInsert: {
            status: 'null'
          }
        }, {
          upsert: true
        }, function(err, result) {
          return coll.find().toArray(function(err, items) {
            assert(items.length === 1);
            return coll.update({
              name: 'jiro'
            }, {
              $setOnInsert: {
                status: 'null'
              }
            }, {
              upsert: true
            }, function(err, result) {
              return coll.find().toArray(function(err, items) {
                assert(items.length === 2);
                return coll.update({
                  name: 'jiro'
                }, {
                  $setOnInsert: {
                    status: 'insert'
                  },
                  $set: {
                    status: 'update'
                  }
                }, {
                  upsert: true
                }, function(err, result) {
                  return coll.find().toArray(function(err, items) {
                    assert(items.length === 2);
                    return coll.findOne({
                      name: 'jiro'
                    }, function(err, item) {
                      assert(item.status !== 'null');
                      assert(item.status === 'update');
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
    describe("distinct", function() {

      /*
      distinct(key[, query][, options], callback)
       */
      return it('重複行を除外してデータを取得', function(done) {
        var data;
        data = [
          {
            name: 'taro',
            place: 'tokyo',
            text: 'こんにちはこんにちは！'
          }, {
            name: 'taro',
            place: 'tokyo',
            text: 'こんばんはこんばんは！'
          }, {
            name: 'jiro',
            place: 'osaka',
            text: 'まいどまいど'
          }, {
            name: 'hanako',
            place: 'tokyo',
            text: 'hey!guys!'
          }
        ];
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.distinct('name', function(err, docs) {
            assert(err === null);
            assert(docs.length === 3);
            assert(docs.sort()[0] === ["taro", "jiro", "hanako"].sort()[0]);
            assert(docs.sort()[1] === ["taro", "jiro", "hanako"].sort()[1]);
            assert(docs.sort()[2] === ["taro", "jiro", "hanako"].sort()[2]);
            return coll.distinct('name', {
              place: 'tokyo'
            }, function(err, docs) {
              assert(docs.length === 2);
              return done();
            });
          });
        });
      });
    });
    describe("count", function() {

      /*
      count([query][, options], callback)
       */
      return it('コレクションの要素数を取得', function(done) {
        var data;
        data = [
          {
            name: 'taro'
          }, {
            name: 'jiro'
          }, {
            name: 'andy'
          }, {
            name: 'bob'
          }, {
            name: 'jon'
          }
        ];
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.count(function(err, count1) {
            assert(count1 === 5);
            return coll.count({
              name: 'taro'
            }, function(err, count2) {
              assert(count2 === 1);
              return done();
            });
          });
        });
      });
    });
    return describe("findAndModify", function() {

      /*
      [findAndModify(query, sort, doc[, options], callback)](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#findandmodify)
       */
      it('要素を修正して取得する', function(done) {
        var data;
        data = [
          {
            name: 'taro'
          }, {
            name: 'jiro'
          }, {
            name: 'andy'
          }, {
            name: 'bob'
          }, {
            name: 'jon'
          }
        ];
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.findAndModify({
            name: 'taro'
          }, [['name', 1]], {
            $set: {
              age: 18
            }
          }, function(err, doc) {
            assert(doc.name === 'taro');
            assert(doc.age === void 0);
            return done();
          });
        });
      });
      return it('{new:true}を設定すると$set後の要素を取得する', function(done) {
        var data;
        data = [
          {
            name: 'taro'
          }, {
            name: 'jiro'
          }, {
            name: 'andy'
          }, {
            name: 'bob'
          }, {
            name: 'jon'
          }
        ];
        return coll.insert(data, {
          w: 1
        }, function(err, result) {
          return coll.findAndModify({
            name: 'taro'
          }, [['name', 1]], {
            $set: {
              age: 18
            }
          }, {
            "new": true
          }, function(err, doc) {
            assert(doc.name === 'taro');
            assert(doc.age === 18);
            return done();
          });
        });
      });
    });
  });
});
