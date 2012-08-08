(function ($) {
	
	var _defaults = {
			text	: '', 
			url		: ''
		},
		
		_classes = {
			closeBtn		: 'ja_close',
			container		: 'ja_container',
			content			: 'ja_content'
		},
		
		_options = {},
		
		_dataName = 'ja-data',
		
		_methods = {
			destroy: function () {
				var announce = this.data(_dataName);
				if (announce) announce.destroy();
			}
		},
		
		_log = function (msg) {
			if (console && console.log) console.log(msg);
		};
		
		
	$.fn.jannounce = function (options) {
		// Method calling logic
    if (_methods[options]) {
	
      return _methods[options].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof options === 'object' || !options) {
		
			$.extend(_options, _defaults, options);
		
			_options.hasUrl  = _options.url && _options.url.length > 3;
			_options.hasText = _options.text && _options.text.length > 3
		
			if (!_options.hasUrl && !_options.hasText) throw "URL or Text must be provided.";
		
			return this.each(function () {
				var jelement = $(this);
				if (jelement.length > 0) {
					return new Announce(jelement);
				}
			});	
			
    } else {
      $.error( 'Method ' +  options + ' does not exist on jannounce' );
    }
	};
	
	var Announce = function (jelement) {
		this._jelement = jelement;
		this._prepareHtml();
	};
	
	Announce.prototype = {		
		_prepareHtml: function () {
			this._jelement.addClass(_classes.container);
			this._addCloseButton();
			this._addContentDiv();
			this._addData();
			if (_options.hasText) this._addContent(_options.text);
			if (_options.hasUrl) 	this._addRemoteContent();
		},
		
		_addContent: function (text) {
			this._jcontent.html(text);
			this._show();
		},
		
		_show: function () {
			this._jelement.show();
		},
		
		_hide: function () {
			this._jelement.slideUp();
		},
		
		_addRemoteContent: function () {
			var self = this;
			$.get(_options.url, function (result) {
				self._addContent(result);
			});
		},
		
		_addContentDiv: function () {
			this._jcontent = $('<div/>')
				.addClass(_classes.content)
				.appendTo(this._jelement);
		},
		
		_removeContentDiv: function () {
			if (this._jcontent && this._jcontent.length) this._jcontent.remove();
		},	
		
		_addCloseButton: function () {
			var self = this;
			this._jbtnClose = $('<a href="#close" title="Close">Hide</a>')
				.addClass(_classes.closeBtn)
				.appendTo(this._jelement)
				.bind('click', function (e) { e.preventDefault(); self._hide(); });
		},
		
		_removeCloseBtn: function () {
			if (this._jbtnClose && this._jbtnClose.length) this._jbtnClose.remove();
		},

		_addData: function () {
			this._jelement.data(_dataName, this);
		},

		_removeData: function () {
			this._jelement.data(_dataName, null);
		},
		
		destroy: function () {
			this._jelement.removeClass(_classes.container);
			this._removeCloseBtn();
			this._removeContentDiv();
			this._removeData();
		}
	};
	
})(jQuery);