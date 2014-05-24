clc = require('cli-color')
util = require('util')
twitter = require("twitter")

module.exports =
  red:(str) ->
    console.log clc.redBright.bold util.inspect str,true,null
  blue : (str) ->
    console.log clc.blueBright util.inspect str,true,null
  green : (str) ->
    console.log clc.greenBright util.inspect str,true,null
