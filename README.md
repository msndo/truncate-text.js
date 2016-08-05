#truncate-text.js

##概要
テキストを「溢れたテキスト…」のように断ち切るJavaScript関数。文字数ベースなどではなく。描画上の面積ベース

- 要素内テキスト量を描画ベースで面積分ちょうどに断ち切る。
- テキスト最後に任意の断ち切り文字列(デフォルト '…')を追加。
- 対象テキスト中のhtmlタグは除去されます

##起動書式
truncateText(elemDom, options);

##使用例:
###デフォルト設定で起動
truncateTtext(elemDom, settings);

###設定をオーバーライドして起動
truncateTtext(elemDom, { strEllipsis: '...', multiline: true });

##デフォルト設定
{
	strEllipsis: "…",
	multiline: true
}

##動かない？
対象要素はCSSでwidthとheightを指定のうえ、overflow: hiddenが指定されている必要があります。width, heightの指定は直接指定以外、親要素からの継承でも有効です。

##ライセンス
This software is released under the MIT License, see LICENSE.txt.

##免責・注意事項
このソフトウェアを使用したことによって生じたすべての障害・損害・不具合等に関しては、私と私の関係者および私の所属するいかなる団体・組織とも、一切の責任を負いません。各自の責任においてご使用
ください。「ライセンス」について併せてお読みください
