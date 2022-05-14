// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_EXPRESSIONS_COUNT = exports.ERROR_DELAY_MS = exports.EMOJI_REG_EXP = exports.EMOJIS = void 0;
var MAX_EXPRESSIONS_COUNT = 6;
exports.MAX_EXPRESSIONS_COUNT = MAX_EXPRESSIONS_COUNT;
var ERROR_DELAY_MS = 3000;
exports.ERROR_DELAY_MS = ERROR_DELAY_MS;
var EMOJIS = ['🐴', '🐯', '🦁', '🦝', '🐗'];
exports.EMOJIS = EMOJIS;
var EMOJI_REG_EXP = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
exports.EMOJI_REG_EXP = EMOJI_REG_EXP;
},{}],"js/utils/getNotValidInputIndexes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var validateInputValue = function validateInputValue(value) {
  var formattedValue = value.replace(_constants.EMOJI_REG_EXP, '0');
  var regExp = /^\-?[0-9]+(([-+/*][0-9]+)?([.,][0-9]+)?)*?=([0-9]+|\?)$/;
  return regExp.test(formattedValue);
};

var _default = function _default(inputValues) {
  var notValidInputsIndexes = [];
  inputValues.forEach(function (value, index) {
    if (!validateInputValue(value)) {
      notValidInputsIndexes.push(index);
    }
  });
  return notValidInputsIndexes;
};

exports.default = _default;
},{"../constants":"js/constants.js"}],"js/utils/split.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = function _default(string) {
  var arr = [];

  var _iterator = _createForOfIteratorHelper(string),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var char = _step.value;
      arr.push(char);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return arr;
};

exports.default = _default;
},{}],"js/resolveEquations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _split = _interopRequireDefault(require("./utils/split"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(equations) {
  var emojiValues = Object.fromEntries(_constants.EMOJIS.map(function (emoji) {
    return [emoji, undefined];
  }));
  var total;
  equations.forEach(function (equation) {
    var _equation$split = equation.split('='),
        _equation$split2 = _slicedToArray(_equation$split, 2),
        expression = _equation$split2[0],
        result = _equation$split2[1];

    var calculateExpression = function calculateExpression(expression) {
      console.log(expression);
      var expressionValues = expression.replace(/-/gi, '+-').split('+');
      return expressionValues.map(function (value) {
        var minus = '';

        if (value.startsWith('-')) {
          minus = '-';
          value = value.slice(1);
        }

        if (emojiValues[value]) {
          value = emojiValues[value];
        }

        console.log(value);

        if (_constants.EMOJI_REG_EXP.test(value)) {
          return (0, _split.default)(value).map(function (char) {
            return "".concat(minus).concat(char);
          }).join('+');
        }

        return "".concat(minus).concat(value);
      });
    };

    var expressionValues = calculateExpression(expression);
    var unknownValues = expressionValues.map(function (value) {
      if (emojiValues[value]) {
        value = emojiValues[value];
      }

      if (/^[0-9-]*$/.test(value) && result !== '?') {
        result = parseFloat(result);
        result -= parseFloat(value);
        return null;
      }

      return value;
    }).filter(function (value) {
      return !!value;
    }).join('+');
    var uniqueEmojis = new Set(unknownValues.match(_constants.EMOJI_REG_EXP));

    if (uniqueEmojis.size === 1) {
      var multiplier = 0;
      unknownValues.split('+').forEach(function (value) {
        if (value.startsWith('-')) {
          multiplier--;
        } else {
          multiplier++;
        }
      });
      emojiValues[_toConsumableArray(uniqueEmojis)[0]] = result / multiplier;
    }

    if (result === '?') {
      total = calculateExpression(expression)[0];
    }
  });
  return {
    total: total,
    emojiValues: emojiValues
  };
};

exports.default = _default;
},{"./utils/split":"js/utils/split.js","./constants":"js/constants.js"}],"js/utils/safeBackspace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _split = _interopRequireDefault(require("./split"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(string) {
  var arr = (0, _split.default)(string);
  return arr.slice(0, -1).join('');
};

exports.default = _default;
},{"./split":"js/utils/split.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _constants = require("./constants");

var _getNotValidInputIndexes = _interopRequireDefault(require("./utils/getNotValidInputIndexes"));

var _resolveEquations = _interopRequireDefault(require("./resolveEquations"));

var _safeBackspace = _interopRequireDefault(require("./utils/safeBackspace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var controls = document.getElementById('controls');
var form = document.getElementById('calculator-form');
var newExpressionButton = document.getElementById('new-expression');
var errorMessage = document.getElementById('error-message');
var currentInput = document.getElementById('initial-input');
var resultContainer = document.getElementById('result-container');

var addNewInput = function addNewInput() {
  var newInput = document.createElement('input');
  newInput.setAttribute('readonly', true);
  newInput.classList.add('input');
  form.append(newInput);
  currentInput = newInput;
};

var resetForm = function resetForm() {
  form.innerHTML = '';
  newExpressionButton.removeAttribute('disabled');
  addNewInput();
};

newExpressionButton.addEventListener('click', function (_ref) {
  var target = _ref.target;
  addNewInput();

  if (form.childElementCount === _constants.MAX_EXPRESSIONS_COUNT) {
    target.setAttribute('disabled', true);
  }
});

var setFieldErrors = function setFieldErrors(indexes) {
  Array.from(form.children).forEach(function (input, index) {
    if (indexes.includes(index)) {
      input.classList.add('error');
      setTimeout(function () {
        input.classList.remove('error');
      }, _constants.ERROR_DELAY_MS);
    } else {
      input.classList.remove('error');
    }
  });
};

var showErrorMessage = function showErrorMessage() {
  errorMessage.innerHTML = 'Please enter valid expressions!';
  setTimeout(function () {
    errorMessage.innerHTML = '';
  }, _constants.ERROR_DELAY_MS);
};

controls.addEventListener('click', function (_ref2) {
  var target = _ref2.target;

  if (target.id === 'backspace') {
    currentInput.value = (0, _safeBackspace.default)(currentInput.value);
  }

  if (!target.classList.contains('calculator-button')) return;
  currentInput.value += target.innerHTML;
});
form.addEventListener('click', function (_ref3) {
  var target = _ref3.target;
  if (!target.classList.contains('input')) return;
  currentInput = target;
});
form.addEventListener('reset', function (e) {
  e.preventDefault();
  resetForm();
});
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var inputValues = Array.from(e.target.children).map(function (_ref4) {
    var value = _ref4.value;
    return value;
  });
  var notValidInputIndexes = (0, _getNotValidInputIndexes.default)(inputValues);
  setFieldErrors(notValidInputIndexes);

  if (notValidInputIndexes.length > 0) {
    showErrorMessage();
    return;
  }

  errorMessage.innerHTML = '';
  var result = (0, _resolveEquations.default)(inputValues);
  var total = result.total,
      emojiValues = result.emojiValues;
  var formattedValues = Object.entries(emojiValues).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        emoji = _ref6[0],
        value = _ref6[1];

    var formattedValue = typeof value === 'number' ? value : '?';
    return "".concat(emoji, " = ").concat(formattedValue);
  });
  resultContainer.innerHTML = "Result: ".concat(total);
  formattedValues.forEach(function (value) {
    var resultItem = document.createElement('p');
    resultItem.innerHTML = value;
    resultContainer.append(resultItem);
  });
});
},{"./constants":"js/constants.js","./utils/getNotValidInputIndexes":"js/utils/getNotValidInputIndexes.js","./resolveEquations":"js/resolveEquations.js","./utils/safeBackspace":"js/utils/safeBackspace.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64929" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map