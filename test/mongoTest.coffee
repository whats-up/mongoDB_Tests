# forever start -w -f js/mongoTest.js

mongo = require "mongodb"
Db = mongo.Db
BSON = mongo.BSONPure
mongoUri = "mongodb://localhost/mongo_test"
assert = require('power-assert')
util = require('util')
log =(obj)->
  console.log util.inspect obj, false, null
describe "myModule", ->
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
    json = {
      name: 'taro'
      blood_type: 'AB'
      protected: false
    }
    Db.connect mongoUri,(err, DB) ->
      db = DB
      db.collection 'testCollection', (err, collection) ->
        coll = collection
        done()
  afterEach (done) ->
    db.dropCollection 'testCollection',(err,result) ->
      db.close()
      done()

  it 'test connection',(done)->
    assert coll
    done()

  describe "insert", ->
    ###
    insert(docs[, options][, callback])
    ###

    it "単一のobjectをinsertする",(done) ->
      coll.insert json,{w:1},(err, result)->
        coll.find().toArray (err,items)->
          assert(items.length is 1)
          assert.equal('taro',items[0].name)
          coll.insert json,{w:1},(err, result)->
            assert.ok err
            assert err.code is 11000
            done()
    it "_idの無いjsonをinsertすると_idがjsonに追加される",(done) ->
      assert(json._id is undefined)
      coll.insert json,{w:1},(err, result)->
        assert(json._id)
        done()
    it "_idの無いjsonをsaveすると_idがjsonに追加される",(done) ->
      assert(json._id is undefined)
      coll.save json,(err, result)->
        assert(json._id)
        done()
    it "_idの無いjsonをupsertすると_idはjsonには追加されない",(done) ->
      assert(json._id is undefined)
      coll.update {name:'taro'},json, {upsert:true, w: 1},(err, result)->
        assert(json._id is undefined)
        done()
    it "配列に格納された複数のobjectをinsertする",(done) ->
      data =[]
      for i in [1..20]
        json = {
          _id: i
          name: 'human' + i
        }
        data.push json
      assert(data.length is 20)
      coll.insert data,{w:1},(err, result)->
        coll.count (err,count)->
          assert(count,20)
          done()
    it "配列に格納された複数のobjectをinsertした後に、配列に新しいobjectを追加して再度insertするとエラー",(done) ->
      data =[]
      for i in [1..20]
        json = {
          _id: i
          name: 'human' + i
        }
        data.push json
      coll.insert data,{w:1},(err, result)->
        #dataにjsonを追加して再度insertする
        data.push {_id:100,name:'hage'}
        coll.insert data,{w:1},(err, result)->
          ###
          data[0]はinsert済みな所で再度insertするとエラーになる
          ###
          assert err.code is 11000
          #'E11000 duplicate key error index: mongo_test.testCollection.$_id_  dup key: { : 1 }'
          done()
    ###
    save([doc][, options], [callback])
    ###
    describe "save",->
      it """
      saveはdocが存在しなければinsert
      存在するならupdate
      ただしupdateの場合、docまるごとそのままに書き換えられてしまう
      (一部のプロパティだけ書き換えたい場合でも、docに全てのプロパティが存在している必要がある)
      """,(done) ->
        json = {
          name: 'taro'
          blood_type: 'AB'
          protected: false
          _id: 1
        }
        coll.save json,(err, result)->
          coll.findOne {_id:1},(err,item)->
            assert item['protected'] is false
            json['protected'] = true
            coll.save json,(err,result)->
              coll.findOne {_id:1},(err,item)->
                assert item['protected'] is true
                assert Object.keys(item).length is 4
                json = {
                  _id: 1
                  name: 'taro'
                }
                coll.save json,(err, result)->
                  coll.findOne {_id:1},(err,item)->
                    assert item['protected'] is undefined
                    assert Object.keys(item).length is 2
                    done()
    describe "update",->
      ###
      update(selector, document[, options][, callback])
      ###
      it "存在しないdocumentを渡すと何も追加されないがエラーにもならない",(done) ->
        json = {
          name: 'taro'
          blood_type: 'AB'
          protected: false
          _id: 1
        }
        coll.update {name:'taro'},json, {w:1},(err, result)->
          coll.find({}).toArray (err,items)->
            assert err is null
            assert items.length is 0
            done()
      it "documentに$set等を付けずにそのままのjsonを渡すとsaveと同じ挙動になる",(done) ->
        json = {
          name: 'taro'
          blood_type: 'AB'
          protected: false
          _id: 1
        }
        assert Object.keys(json).length is 4
        coll.insert json, {w:1},(err, result)->
          ###
          documentに{protected:true}を設定すると他の要素が消えてしまう
          (_idは自動で付与される)
          ###
          coll.update {name:'taro'},{protected:true},(err,result)->
            coll.findOne {},(err,item)->
              assert item.blood_type is undefined
              assert Object.keys(item).length is 2
              done()

      it "documentを{$set:に埋め込むとその要素だけが書き換えられる",(done) ->
        json = {
          _id: 1
          name: 'taro'
          blood_type: 'AB'
          protected: false
        }
        assert Object.keys(json).length is 4
        coll.insert json, {w:1},(err, result)->
          coll.update {name:'taro'},{$set:{protected:true}},(err,result)->
            coll.findOne {},(err,item)->
              assert item.blood_type is 'AB'
              assert Object.keys(item).length is 4
              done()
      it "複数件のupdateしたつもりが最初の1件しかupdateできない",(done) ->
        data =[]
        for i in [1..20]
          json = {
            _id: i
            name: 'human' + i
            type: 'human'
          }
          data.push json
        coll.insert data,{w:1},(err, result)->
          coll.update {type:'human'},{$set:{type:'robot'}},(err,result)->
            coll.find({}).toArray (err,items)->
              assert items[0]['type'] is 'robot'
              assert items[1]['type'] isnt 'robot'
              done()
      it "optionsに{multi: true}を渡せば全件uploadできる",(done) ->
        data =[]
        for i in [1..20]
          json = {
            _id: i
            name: 'human' + i
            type: 'human'
          }
          data.push json
        coll.insert data,{w:1},(err, result)->
          coll.update {type:'human'},{$set:{type:'robot'}},{multi: true},(err,result)->
            coll.find({}).toArray (err,items)->
              for item in items
                assert item['type'] is 'robot'
              done()
    describe "upsert",->
      ###
      update(selector, document, {upsert:true} (and other options)[, callback])
      ###
      it "upsert1",(done) ->
        json = {
          name: 'taro'
          update_at: null
          protected: false
        }
        ###
        collectionは空なので最初のupsertはinsertになる
        ###
        coll.update {name:'taro'},json, {upsert:true, w: 1},(err, result)->
          coll.find().toArray (err,items)->
            assert(items.length is 1)
            ###
            値を書き換えてupsertするとすでに存在するのでupdateになる
            ###
            json['protected'] = true
            coll.update {name:'taro'},json, {upsert:true, w: 1},(err,result)->
              coll.find().toArray (err,items)->
                assert(items.length is 1)
                ###
                セレクタである['name']を書き換えると新規オブジェクトと認識されてinsertになる
                (_idが設定されていない場合)
                ###
                json['name'] = 'jiro'
                coll.update {name:'jiro'},json, {upsert:true, w: 1},(err,result)->
                  coll.find().toArray (err,items)->
                    assert(items.length is 2)
                    done()
      it "upsert2",(done) ->
        json = {
          name: 'taro'
          update_at: null
          protected: false
          _id: 1
        }
        ###
        collectionは空なので最初のupsertはinsertになる
        ###
        coll.update {name:'taro'},json, {upsert:true, w: 1},(err, result)->
          coll.find().toArray (err,items)->
            assert(items.length is 1)
            ###
            値を書き換えてupsertするとすでに存在するのでupdateになる
            ###
            json['protected'] = true
            coll.update {name:'taro'},json, {upsert:true, w: 1},(err,result)->
              coll.find().toArray (err,items)->
                assert(items.length is 1)
                ###
                セレクタである['name']を書き換えても['_id']が同じなのでupdateになる
                ###
                json['name'] = 'jiro'
                coll.update {name:'jiro'},json, {upsert:true, w: 1},(err,result)->
                  coll.find().toArray (err,items)->
                    assert(items.length is 1)
                    done()



    describe "insert or null",->
      it 'insert or null -1'
    describe "distinct",->
      ###
      distinct(key[, query][, options], callback)
      ###
      it '重複行を除外してデータを取得',(done)->
        data = [
          {name:'taro',place:'tokyo',text:'こんにちはこんにちは！'}
          {name:'taro',place:'tokyo',text:'こんばんはこんばんは！'}
          {name:'jiro',place:'osaka',text:'まいどまいど'}
          {name:'hanako',place:'tokyo',text:'hey!guys!'}
        ]
        coll.insert data,{w:1}, (err,result)->
          coll.distinct 'name',(err,docs)->
            assert err is null
            assert docs.length is 3
            assert docs.sort()[0] is ["taro","jiro","hanako"].sort()[0]
            assert docs.sort()[1] is ["taro","jiro","hanako"].sort()[1]
            assert docs.sort()[2] is ["taro","jiro","hanako"].sort()[2]
            coll.distinct 'name',{place:'tokyo'},(err,docs)->
              assert docs.length is 2
              done()

    describe "count",->
      ###
      count([query][, options], callback)
      ###
      it 'コレクションの要素数を取得',(done)->
        data =[
          {name:'taro'}
          {name:'jiro'}
          {name:'andy'}
          {name:'bob'}
          {name:'jon'}
        ]
        coll.insert data,{w:1},(err,result)->
          coll.count (err,count1)->
            assert count1 is 5
            coll.count {name:'taro'},(err,count2)->
              assert count2 is 1
              done()
