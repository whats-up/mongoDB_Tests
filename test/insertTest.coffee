
mongo = require "mongodb"
Db = mongo.Db
BSON = mongo.BSONPure
mongoUri = "mongodb://localhost/mongo_test"
assert = require('power-assert')
util = require('util')
log =(obj)->
  console.log util.inspect obj, false, null
jsonFunc = ()->
  return {
    name:'jon'
    age:20
  }
jsonDict = {
  name:'jon'
  age:20
}
describe "insert Tests", ->
  db = null
  coll = null
  json = null
  before (done) ->
    Db.connect mongoUri,(err, DB) ->
      db = DB
      db.dropCollection 'testCollection'
      db.close()
      done()
  beforeEach (done)->
    Db.connect mongoUri,(err, DB) ->
      db = DB
      db.collection 'testCollection', (err, collection) ->
        coll = collection
        done()
  afterEach (done) ->
    db.dropCollection 'testCollection',(err,result) ->
      db.close()
      done()

  describe "insert", ->
    ###
    insert(docs[, options][, callback])
    ###
    it "insertの第一引数にobjectを渡すとinsertできる。再度同じobjectを渡してもinsertできる",(done) ->
      coll.insert {name:'taro'},(err, result)->
        assert err is null
        coll.insert {name:'taro'},(err, result)->
          assert err is null
          coll.find().toArray (err,items)->
            assert items.length is 2
            done()
    it "objectを変数化してinsertすると2回めで失敗する",(done) ->
      json = {name:'taro'}
      coll.insert json,(err, result)->
        assert err is null
        coll.insert json,(err, result)->
          assert err
        done()
    it "変数化したjsonにはinsertしたタイミングで_idが付与されている",(done) ->
      json = {name:'taro'}
      assert(json._id is undefined)
      coll.insert json,(err, result)->
        assert(json._id)
        done()
    it 'jsonをグローバル変数から取得した場合も_idは付与される(書き換わる)',(done)->
      json = jsonDict
      assert(json._id is undefined)
      coll.insert json,(err, result)->
        assert(json._id)
        json2 = jsonDict
        assert json2 is json
        done()
    it 'jsonを関数から取得した場合、_idは付与されない',(done)->
      json = jsonFunc()
      assert(json._id is undefined)
      coll.insert json,(err, result)->
        assert(json._id)
        json2 = jsonFunc()
        assert json2._id is undefined
        done()
