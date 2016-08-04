/*
jquery.truncate_text.js
=========================================================
・要素内テキスト量を描画ベースで面積分ちょうどに断ち切る。
・テキスト最後に任意の断ち切り文字列(デフォルト '…')を追加。

---------------------------------------------------------
example:
---------------------------------------------------------
// Use Built-in Default settings
$('.textDescription').truncateTtext();

// Override settings by Options
$('.textDescription').truncateTtext({ strEllipsis: '...', multiline: true });

---------------------------------------------------------
Format of Usage:
---------------------------------------------------------
$(selector).truncateText(options);

---------------------------------------------------------
Default Options is Defined As Following:
---------------------------------------------------------
options = {
	  strEllipsis: "…"
	, multiline: this.hasClass('multiline')
}

=========================================================
*/

;(function ( $, window, document, undefined ) {

	var pluginName = "truncateText";
	var defaults = {
		strEllipsis: "…",
		multiline: true
	};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;

		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.initTruncateText(this.element, this.settings);
		},

		initTruncateText: function(el, settings) {
			var $elemContainer = $(el);

			return $elemContainer.each(function() {
				var $elemTarg = $(this);
	
				if($elemTarg.css("overflow") != "hidden") { return; }
	
				var text = $elemTarg.html();
				var multiline = settings.multiline;
	
				var $elemTest =
					$(this.cloneNode(true)).
					hide().
					css('position', 'absolute').
					css('overflow', 'visible').
					width(multiline ? $elemTarg.width() : 'auto').
					height(multiline ? 'auto' : $elemTarg.height())
				;
	
				$elemTarg.after($elemTest);
	
				var isOverflowed = function($elemTest, $elemTarg) {
					return multiline ?
						$elemTest.height() > $elemTarg.height() :
						$elemTest.width() > $elemTarg.width()
					;
				}

				if(! isOverflowed($elemTest, $elemTarg)) { return; }
	
				// 切り詰めメイン
				var getTruncatedText = function(textSrc, lower, upper) {
   					var mid = Math.floor(lower + (upper - lower)/2);
       				var textTrunc = textSrc.substr(0, mid);

   					if ((upper <= (lower + 1)) && (lower == mid)) {
						return textTrunc;
					}

					$elemTest.html(textTrunc + settings.strEllipsis);

   					return isOverflowed($elemTest, $elemTarg) ?
						getTruncatedText(textTrunc, lower, mid) :
						getTruncatedText(textSrc, mid, upper)
					;
				};

				var truncatedText = getTruncatedText(text, 0, text.length);
				$elemTest.html(truncatedText + settings.strEllipsis);
	
				$elemTarg.html($elemTest.html());
				$elemTest.remove();
			});

		}
	};

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );

