/**
* truncate-text.js
* 要素内テキスト量を描画ベースで面積分ちょうどに断ち切る。
* テキスト最後に任意の断ち切り文字列(デフォルト '…')を追加。
*
* released under the MIT License.
*
* @param {NodeList} [seriesElem] 必須
* @param {object} [options] 省略可能
*/

function truncateText(seriesElem, options) {

	// =============================================== Sub Routines
	var _truncateText = function(elemTarg, settings) {
		if(getComputedStyle(elemTarg)['overflow'] != 'hidden') {
			if(elemTarg.getAttribute('data-text-src')) {
				elemTarg.innerHTML = elemTarg.getAttribute('data-text-src');
			}

			return;
		}

		if(! elemTarg.getAttribute('data-text-src')) {
			elemTarg.setAttribute('data-text-src', elemTarg.textContent);
		}

		elemTarg.innerHTML = elemTarg.getAttribute('data-text-src');
		var text = elemTarg.innerHTML;

		var elemTest = elemTarg.cloneNode(true);
		elemTest.style.position = 'absolute';
		elemTest.style.top = '-9999px';
		elemTest.style.left = '-9999px';
		elemTest.style.overflow = 'visible';
		elemTest.style.width = elemTarg.offsetWidth + 'px';
		elemTest.style.height = 'auto';

		elemTarg.insertAdjacentHTML('afterend', elemTest.outerHTML);
		elemTest = elemTarg.nextElementSibling;

		var _isOverflowed = function(elemTest, elemTarg) {
			return(
				elemTest.offsetHeight > elemTarg.offsetHeight
			);
		}

		if(! _isOverflowed(elemTest, elemTarg)) { return; }

		// 切り詰めメイン
		var _getTruncatedText = function(textSrc, lower, upper) {
 			var mid = Math.floor(lower + (upper - lower)/2);
  				var textTrunc = textSrc.substr(0, mid);

 			if ((upper <= (lower + 1)) && (lower == mid)) {
				return textTrunc;
			}

			elemTest.innerHTML = textTrunc + settings.strEllipsis;

			return _isOverflowed(elemTest, elemTarg) ?
				_getTruncatedText(textTrunc, lower, mid) :
				_getTruncatedText(textSrc, mid, upper)
			;
		};

		var truncatedText = _getTruncatedText(text, 0, text.length);

		elemTest.innerHTML = truncatedText + settings.strEllipsis;

		elemTarg.innerHTML = elemTest.innerHTML;
		elemTest.parentNode.removeChild(elemTest);
	}

	var _extend = function(out) {
		out = out || {};
	
	 	for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i])
			continue;
	
			for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key))
				out[key] = arguments[i][key];
			}
		}
	
		return out;
	};

	// =============================================== Main
	(function(window, document, undefined) {
		var settings = {
			strEllipsis: "…"
		};
		settings = _extend({}, settings, options);

		[].slice.call(seriesElem).forEach(function(elem) {
			_truncateText(elem, settings);
		});	
	})(window, document);

	return(seriesElem);
}
