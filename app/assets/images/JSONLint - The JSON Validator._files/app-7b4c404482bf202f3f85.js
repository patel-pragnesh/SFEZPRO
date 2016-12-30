var app =
webpackJsonpapp([0,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(298);


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global ga,paramJSON */
	
	
	var _codemirror = __webpack_require__(299);
	
	var _codemirror2 = _interopRequireDefault(_codemirror);
	
	var _jsonlintMod = __webpack_require__(300);
	
	var _jsonlintMod2 = _interopRequireDefault(_jsonlintMod);
	
	var _beautify = __webpack_require__(301);
	
	var _beautify2 = _interopRequireDefault(_beautify);
	
	var _jsonminify = __webpack_require__(302);
	
	var _jsonminify2 = _interopRequireDefault(_jsonminify);
	
	var _balajs = __webpack_require__(303);
	
	var _balajs2 = _interopRequireDefault(_balajs);
	
	__webpack_require__(304);
	
	var _fetchExternal = __webpack_require__(305);
	
	var _fetchExternal2 = _interopRequireDefault(_fetchExternal);
	
	var _parseQuery = __webpack_require__(306);
	
	var _parseQuery2 = _interopRequireDefault(_parseQuery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var doc = document;
	
	var Application = function () {
	    function Application() {
	        _classCallCheck(this, Application);
	
	        var form = this.form = doc.forms.main;
	        var query = this.query = (0, _parseQuery2.default)();
	
	        this.initEditor().registerEvents();
	
	        // define 'code' accessors
	        Object.defineProperty(this, 'code', {
	            get: function get() {
	                return this.editor.getValue();
	            },
	            set: function set(v) {
	                form.code.value = v;
	                this.editor.setValue(v);
	            }
	        });
	
	        // if json parameter is given, use it
	        // URL (where JSON is located) is also allowed
	
	        var paramJSON = typeof localStorage.onloadJSONParameter !== 'undefined' ? localStorage.onloadJSONParameter : query.json;
	
	        if (paramJSON) {
	            this.code = paramJSON;
	            localStorage.removeItem('onloadJSONParameter');
	            this.go();
	        }
	    }
	
	    // registers events
	
	
	    _createClass(Application, [{
	        key: 'registerEvents',
	        value: function registerEvents() {
	            var _this = this;
	
	            // listen to changes at location.hash
	            window.addEventListener('hashchange', function () {
	                var query = _this.query = (0, _parseQuery2.default)();
	                if (query.json) {
	                    _this.code = query.json;
	                }
	
	                _this.go();
	            });
	
	            // when user types something, remove highlighting from "bad" line
	            this.editor.on('change', function () {
	                return _this.highlightErrorLine(null);
	            });
	
	            // when user submits form (eg presses "Validate" button), call "go" method
	            this.form.addEventListener('submit', function (evt) {
	                evt.preventDefault();
	                _this.go();
	            });
	
	            // when user clicks "Clear" button, assign empty string to the "code" property
	            this.form.addEventListener('reset', function (evt) {
	                evt.preventDefault();
	                _this.code = '';
	            });
	
	            // when Ctrl-Enter is pressed, run "go" method
	            doc.addEventListener('keyup', function (evt) {
	                var ENTER_KEY = 13;
	                if (evt.ctrlKey && evt.keyCode === ENTER_KEY) {
	                    _this.go();
	                }
	            });
	
	            // expands/unexpands faq by clicking #faqButton
	            _balajs2.default.one('#faqButton').addEventListener('click', function (evt) {
	                evt.preventDefault();
	                _balajs2.default.one('#faq').classList.toggle('expand');
	            });
	
	            // initializes Google Analytics tracking
	            // when user clicks on [data-ga="blah"], call ga('send', 'pageview', '/blah');
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                var _loop = function _loop() {
	                    var node = _step.value;
	
	                    node.addEventListener('click', function () {
	                        return ga('send', 'pageview', '/' + node.getAttribute('data-ga'));
	                    });
	                };
	
	                for (var _iterator = (0, _balajs2.default)('[data-ga]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    _loop();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return this;
	        }
	
	        // initializes CodeMirror editor
	
	    }, {
	        key: 'initEditor',
	        value: function initEditor() {
	            this.editor = _codemirror2.default.fromTextArea(this.form.code, {
	                lineNumbers: true,
	                styleActiveLine: true,
	                matchBrackets: true,
	                indentWithTabs: true,
	                autofocus: true,
	                mode: 'javascript'
	            });
	
	            return this;
	        }
	
	        // the main function of this app
	
	    }, {
	        key: 'go',
	        value: function go() {
	            var _this2 = this;
	
	            var code = this.code;
	            var trimmedCode = code.trim();
	            // if URL is given, fetch data on this URL
	            if (trimmedCode.indexOf('http') === 0) {
	                (0, _fetchExternal2.default)(trimmedCode, function (resp) {
	                    return _this2.validate(resp);
	                }, // if fetching is OK, run validator
	                function (err) {
	                    return _this2.notify(false, err);
	                } // if not, show an error
	                );
	            } else {
	                // if non-url is given, run validator
	                this.validate();
	            }
	
	            return this;
	        }
	
	        // reformats JSON depending on query.reformat value
	        // code argument is optional
	
	    }, {
	        key: 'reformat',
	        value: function reformat(givenCode) {
	            var code = typeof givenCode === 'undefined' ? this.code : givenCode;
	
	            // if reformat==compress, use minifier
	            // if reformat==no, keep code as is
	            // else beautify code
	            if (this.query.reformat === 'compress') {
	                code = (0, _jsonminify2.default)(code) || code;
	            } else if (this.query.reformat !== 'no') {
	                code = _beautify2.default.js_beautify(code, {
	                    indent_with_tabs: true
	                });
	            }
	
	            this.code = code;
	
	            return this;
	        }
	
	        // validates JSON
	        // givenCode argument is optional
	
	    }, {
	        key: 'validate',
	        value: function validate(givenCode) {
	            var lineMatches = void 0;
	
	            this.reformat(givenCode);
	
	            var code = this.code;
	
	
	            try {
	                _jsonlintMod2.default.parse(code);
	                this.notify(true, 'Valid JSON');
	            } catch (e) {
	                // retrieve line number from error string
	                lineMatches = e.message.match(/line ([0-9]*)/);
	
	                if (lineMatches && lineMatches.length > 1) {
	                    this.highlightErrorLine(+lineMatches[1] - 1);
	                }
	
	                this.notify(false, e);
	            }
	
	            return this;
	        }
	
	        // displays success or error message about validation status
	
	    }, {
	        key: 'notify',
	        value: function notify(success, text) {
	            var result = _balajs2.default.one('#result');
	            _balajs2.default.one('#result-container').classList.add('shown');
	            // ie10 doesn't support 2nd argument in classList.toggle
	            result.classList[success ? 'add' : 'remove']('success');
	            result.classList[!success ? 'add' : 'remove']('error');
	            result.innerHTML = text;
	
	            return this;
	        }
	
	        // highlights given line of code
	        // if null is passed function removes highlighting
	
	    }, {
	        key: 'highlightErrorLine',
	        value: function highlightErrorLine(line) {
	            if (typeof line === 'number') {
	                this.errorLine = this.editor.addLineClass(line, 'background', 'line-error');
	                this.editor.setCursor(line);
	            } else if (this.errorLine) {
	                this.editor.removeLineClass(this.errorLine, 'background', 'line-error');
	                this.errorLine = null;
	            }
	
	            return this;
	        }
	    }]);
	
	    return Application;
	}();
	
	module.exports = new Application();

/***/ },

/***/ 305:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = fetchExternal;
	// makes request to external resource via php proxy
	function fetchExternal(url, success, error) {
	    var req = new XMLHttpRequest();
	    req.onreadystatechange = function () {
	        if (req.readyState === XMLHttpRequest.DONE) {
	            if (req.status === 200) {
	                var resp = JSON.parse(req.responseText);
	                if (resp.error) {
	                    // if proxy returns error call error callback
	                    error(resp.result);
	                } else {
	                    // else everything is awesome
	                    success(resp.content);
	                }
	            } else {
	                // if status is not 200 call error callback
	                error(req.statusText || 'Unable to connect');
	            }
	        }
	    };
	
	    req.open('POST', 'proxy.php');
	    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    req.send('url=' + encodeURIComponent(url));
	
	    return this;
	}

/***/ },

/***/ 306:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = parseQuery;
	// parses URL
	function parseQuery() {
	    var _location = location,
	        search = _location.search;
	
	    var query = {};
	    var parts = search.replace('?', '').split('&');
	
	    if (!search) {
	        return query;
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var part = _step.value;
	
	            var _part$split = part.split('='),
	                _part$split2 = _slicedToArray(_part$split, 2),
	                key = _part$split2[0],
	                value = _part$split2[1];
	
	            query[decodeURIComponent(key)] = decodeURIComponent(value || null);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    return query;
	}

/***/ }

});
//# sourceMappingURL=app-7b4c404482bf202f3f85.js.map