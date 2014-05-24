assert = require('power-assert')
_anderScore= require 'underscore'

hogeFunc = require("../js/template").hoge

describe "template Test", ->
  describe "hoges", ->
  it 'hoge',()->
    text = hogeFunc()
    assert text is 'hage'
    assert.equal text,'hage'
    assert.notEqual text, 'hoge'
    assert.deepEqual text, 'hage'
    assert.notDeepEqual text, 'hoge'
    assert.throws ()-> throw new Error "boke"
    assert.doesNotThrow ()-> return true
    assert.ok text.match 'ha..'
