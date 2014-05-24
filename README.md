# nodejs test template

これはnode.jsで簡単なテストをする為のテンプレートです。  
cloneするとテストプロジェクトが展開されるので、そのままテスト可能です。  
CoffeeScriptも使えます。  
テストはmochaを使っていますので、-gオプションを付けてインストールが必要です。  

`npm install -g mocha`

[Mocha - (HP)](http://visionmedia.github.io/mocha/)  
[mocha - (npm)](https://www.npmjs.org/package/mocha)  

あと、underScoreやなんやかんやがそのまま使えます。

## 前準備
これはテンプレートなので、このままgitで管理すると上書きしてしまいます。
なので最初に.gitディレクトリを削除してください。  
必要ならその後にgit initしてください。

`rm -rf .git`
`git init`
`git add .`

次にnpmでモジュールをインストールします。
もちろんnodeとnpmがインストール済みな事が前提です。

`npm install`
## 使い方
1. プロジェクトディレクトリでGruntを起動します。
2. coffeeディレクトリに関数等をコーディングして保存すると
jsディレクトリにコンパイルされます。  
(CoffeeScriptを使わない場合はjsディレクトリに関数等を書けばOKです。)
3. testディレクトリにテストを書いて保存するとgruntでtestが実行されます。  
(**.coffeeはjsにコンパイルされますので、coffeeでもjsでもOK)


###!!注意点
gruntは起動した後で新規作成されたファイルはコンパイル(test)
されないので、新規にファイルを作ったらctrl+cで一旦止めてから再度
gruntコマンドを叩く必要があります。


[twitter: @_wats](https://twitter.com/_wats)
