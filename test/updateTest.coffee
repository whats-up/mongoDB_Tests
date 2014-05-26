mongo = require "mongodb"
Db = mongo.Db
BSON = mongo.BSONPure
mongoUri = "mongodb://localhost/mongo_test"
assert = require('power-assert')
util = require('util')
log =(obj)->
  console.log util.inspect obj, false, null
describe "update Tests", ->
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
  ###
  update(selector, document, {upsert:true} (and other options)[, callback])
  ###
  describe "$inc", ->
    describe "指定の値をインクリメントする", ->
      it 'インクリメントの値は自由に指定できる',(done)->
        coll.insert {name:'taro',age:18},(err,result)->
          coll.update {name:'taro'},{$inc:{age:-5}},(err,result)->
            coll.findOne {},(err,item)->
              assert item.age is 13
              done()
      it '複数の値を同時に変更できる',(done)->
        coll.insert {name:'taro',age:18,point:100},(err,result)->
          coll.update {name:'taro'},{$inc:{age:1,point:10}},(err,result)->
            coll.findOne {},(err,item)->
              assert item.age is 19
              assert item.point is 110
              done()
      it '{multi:true}を設定するとselectorで抽出された全てに適用する',(done)->
        data = [
          {name:'taro',age:18,team:'A'}
          {name:'jiro',age:17,team:'A'}
          {name:'siro',age:12,team:'A'}
          {name:'kuro',age:1,team:'B'}
        ]
        coll.insert data,(err,result)->
          coll.update {team:'A'},{$inc:{age:1}},{multi:true},(err,result)->
            assert result is 3
            coll.find().toArray (err,items)->
              assert items[0].age is 19
              assert items[1].age is 18
              assert items[2].age is 13
              done()
  describe "$mul", ->
    describe "指定の値を掛ける", ->
      it 'http://docs.mongodb.org/manual/reference/operator/update/mul/'
  describe "$setOnInsert", ->
    describe "insert時の挙動", ->
      it '$setOnInsertでinsertの代わりになる',(done)->
        coll.update {name:'taro'},{$setOnInsert:{status:'first'}},{upsert:true},(err,result)->
          coll.find().toArray (err,items)->
            assert items.length is 1
            done()
      it 'upsertをfalseにするとinsertはされない',(done)->
          coll.update {name:'taro'},{$setOnInsert:{status:'first'}},{upsert:false},(err,result)->
            coll.find().toArray (err,items)->
              assert items.length is 0
              done()
      it '$setOnInsertと$set 両方の値が追加される',(done)->
        coll.update {name:'taro'},{$setOnInsert:{status:'first'},$set:{age:18}},{upsert:true},(err,result)->
          coll.find().toArray (err,items)->
            assert items.length is 1
            assert items[0].status is 'first'
            assert items[0].age is 18
            done()
      it '$setOnInsertと$set 両方に同じ要素名を指定するとなにも追加されない',(done)->
        coll.update {name:'taro'},{$setOnInsert:{status:'first'},$set:{status:'other'}},{upsert:true},(err,result)->
          coll.find().toArray (err,items)->
            assert items.length is 0
            assert items[0] is undefined
            done()
    describe "update時の挙動", ->
      it '$setOnInsertは無視される',(done)->
        coll.insert {name:'taro'},(err,result)->
          coll.update {name:'taro'},{$setOnInsert:{status:'first'}},{upsert:true},(err,result)->
            coll.find().toArray (err,items)->
              assert items.length is 1
              assert items[0].name is 'taro'
              assert items[0].status is undefined
              done()
      it '$setを設定するとそっちだけが更新される',(done)->
        coll.insert {name:'taro'},(err,result)->
          coll.update {name:'taro'},{$setOnInsert:{status:'first'},$set:{age:18,name:'jiro'}},{upsert:true},(err,result)->
            coll.find().toArray (err,items)->
              assert items.length is 1
              assert items[0].name is 'jiro'
              assert items[0].age is 18
              assert items[0].status is undefined
              done()
