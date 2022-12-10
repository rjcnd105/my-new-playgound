"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/injectStyles/dist/vanilla-extract-css-injectStyles.browser.cjs.js
  var require_vanilla_extract_css_injectStyles_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/injectStyles/dist/vanilla-extract-css-injectStyles.browser.cjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stylesheets = {};
      var injectStyles = (_ref) => {
        var {
          fileScope,
          css
        } = _ref;
        var fileScopeId = fileScope.packageName ? [fileScope.packageName, fileScope.filePath].join("/") : fileScope.filePath;
        var stylesheet = stylesheets[fileScopeId];
        if (!stylesheet) {
          var styleEl = document.createElement("style");
          if (fileScope.packageName) {
            styleEl.setAttribute("data-package", fileScope.packageName);
          }
          styleEl.setAttribute("data-file", fileScope.filePath);
          styleEl.setAttribute("type", "text/css");
          stylesheet = stylesheets[fileScopeId] = styleEl;
          document.head.appendChild(styleEl);
        }
        stylesheet.innerHTML = css;
      };
      exports.injectStyles = injectStyles;
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+private@1.0.3/node_modules/@vanilla-extract/private/dist/vanilla-extract-private.cjs.dev.js
  var require_vanilla_extract_private_cjs_dev = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+private@1.0.3/node_modules/@vanilla-extract/private/dist/vanilla-extract-private.cjs.dev.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getVarName(variable) {
        var matches = variable.match(/^var\((.*)\)$/);
        if (matches) {
          return matches[1];
        }
        return variable;
      }
      function get(obj, path) {
        var result = obj;
        for (var key of path) {
          if (!(key in result)) {
            throw new Error("Path ".concat(path.join(" -> "), " does not exist in object"));
          }
          result = result[key];
        }
        return result;
      }
      function walkObject(obj, fn) {
        var path = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        var clone = obj.constructor();
        for (var key in obj) {
          var _value = obj[key];
          var currentPath = [...path, key];
          if (typeof _value === "string" || typeof _value === "number" || _value == null) {
            clone[key] = fn(_value, currentPath);
          } else if (typeof _value === "object" && !Array.isArray(_value)) {
            clone[key] = walkObject(_value, fn, currentPath);
          } else {
            console.warn('Skipping invalid key "'.concat(currentPath.join("."), '". Should be a string, number, null or object. Received: "').concat(Array.isArray(_value) ? "Array" : typeof _value, '"'));
          }
        }
        return clone;
      }
      exports.get = get;
      exports.getVarName = getVarName;
      exports.walkObject = walkObject;
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+private@1.0.3/node_modules/@vanilla-extract/private/dist/vanilla-extract-private.cjs.js
  var require_vanilla_extract_private_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+private@1.0.3/node_modules/@vanilla-extract/private/dist/vanilla-extract-private.cjs.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_vanilla_extract_private_cjs_dev();
      }
    }
  });

  // ../../node_modules/.pnpm/cssesc@3.0.0/node_modules/cssesc/cssesc.js
  var require_cssesc = __commonJS({
    "../../node_modules/.pnpm/cssesc@3.0.0/node_modules/cssesc/cssesc.js"(exports, module) {
      "use strict";
      var object = {};
      var hasOwnProperty = object.hasOwnProperty;
      var merge = function merge2(options, defaults) {
        if (!options) {
          return defaults;
        }
        var result = {};
        for (var key in defaults) {
          result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
        }
        return result;
      };
      var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
      var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
      var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
      var cssesc = function cssesc2(string, options) {
        options = merge(options, cssesc2.options);
        if (options.quotes != "single" && options.quotes != "double") {
          options.quotes = "single";
        }
        var quote = options.quotes == "double" ? '"' : "'";
        var isIdentifier = options.isIdentifier;
        var firstChar = string.charAt(0);
        var output = "";
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var character = string.charAt(counter++);
          var codePoint = character.charCodeAt();
          var value = void 0;
          if (codePoint < 32 || codePoint > 126) {
            if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
              var extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
              } else {
                counter--;
              }
            }
            value = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else {
            if (options.escapeEverything) {
              if (regexAnySingleEscape.test(character)) {
                value = "\\" + character;
              } else {
                value = "\\" + codePoint.toString(16).toUpperCase() + " ";
              }
            } else if (/[\t\n\f\r\x0B]/.test(character)) {
              value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
              value = "\\" + character;
            } else {
              value = character;
            }
          }
          output += value;
        }
        if (isIdentifier) {
          if (/^-[-\d]/.test(output)) {
            output = "\\-" + output.slice(1);
          } else if (/\d/.test(firstChar)) {
            output = "\\3" + firstChar + " " + output.slice(1);
          }
        }
        output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
          if ($1 && $1.length % 2) {
            return $0;
          }
          return ($1 || "") + $2;
        });
        if (!isIdentifier && options.wrap) {
          return quote + output + quote;
        }
        return output;
      };
      cssesc.options = {
        "escapeEverything": false,
        "isIdentifier": false,
        "quotes": "single",
        "wrap": false
      };
      cssesc.version = "3.0.0";
      module.exports = cssesc;
    }
  });

  // ../../node_modules/.pnpm/ahocorasick@1.0.2/node_modules/ahocorasick/src/main.js
  var require_main = __commonJS({
    "../../node_modules/.pnpm/ahocorasick@1.0.2/node_modules/ahocorasick/src/main.js"(exports, module) {
      (function() {
        "use strict";
        var AhoCorasick = function(keywords) {
          this._buildTables(keywords);
        };
        AhoCorasick.prototype._buildTables = function(keywords) {
          var gotoFn = {
            0: {}
          };
          var output = {};
          var state = 0;
          keywords.forEach(function(word) {
            var curr = 0;
            for (var i = 0; i < word.length; i++) {
              var l2 = word[i];
              if (gotoFn[curr] && l2 in gotoFn[curr]) {
                curr = gotoFn[curr][l2];
              } else {
                state++;
                gotoFn[curr][l2] = state;
                gotoFn[state] = {};
                curr = state;
                output[state] = [];
              }
            }
            output[curr].push(word);
          });
          var failure = {};
          var xs = [];
          for (var l in gotoFn[0]) {
            var state = gotoFn[0][l];
            failure[state] = 0;
            xs.push(state);
          }
          while (xs.length) {
            var r = xs.shift();
            for (var l in gotoFn[r]) {
              var s = gotoFn[r][l];
              xs.push(s);
              var state = failure[r];
              while (state > 0 && !(l in gotoFn[state])) {
                state = failure[state];
              }
              if (l in gotoFn[state]) {
                var fs = gotoFn[state][l];
                failure[s] = fs;
                output[s] = output[s].concat(output[fs]);
              } else {
                failure[s] = 0;
              }
            }
          }
          this.gotoFn = gotoFn;
          this.output = output;
          this.failure = failure;
        };
        AhoCorasick.prototype.search = function(string) {
          var state = 0;
          var results = [];
          for (var i = 0; i < string.length; i++) {
            var l = string[i];
            while (state > 0 && !(l in this.gotoFn[state])) {
              state = this.failure[state];
            }
            if (!(l in this.gotoFn[state])) {
              continue;
            }
            state = this.gotoFn[state][l];
            if (this.output[state].length) {
              var foundStrs = this.output[state];
              results.push([i, foundStrs]);
            }
          }
          return results;
        };
        if (typeof module !== "undefined") {
          module.exports = AhoCorasick;
        } else {
          window.AhoCorasick = AhoCorasick;
        }
      })();
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/adapter/dist/vanilla-extract-css-adapter.browser.cjs.js
  var require_vanilla_extract_css_adapter_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/adapter/dist/vanilla-extract-css-adapter.browser.cjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var mockAdapter = {
        appendCss: () => {
        },
        registerClassName: () => {
        },
        onEndFileScope: () => {
        },
        registerComposition: () => {
        },
        markCompositionUsed: () => {
        },
        getIdentOption: () => false ? "short" : "debug"
      };
      var adapterStack = [mockAdapter];
      var currentAdapter = () => {
        if (adapterStack.length < 1) {
          throw new Error("No adapter configured");
        }
        return adapterStack[adapterStack.length - 1];
      };
      var hasConfiguredAdapter = false;
      var setAdapterIfNotSet = (newAdapter) => {
        if (!hasConfiguredAdapter) {
          setAdapter(newAdapter);
        }
      };
      var setAdapter = (newAdapter) => {
        hasConfiguredAdapter = true;
        adapterStack.push(newAdapter);
      };
      var removeAdapter = () => {
        adapterStack.pop();
      };
      var appendCss = function appendCss2() {
        return currentAdapter().appendCss(...arguments);
      };
      var registerClassName = function registerClassName2() {
        return currentAdapter().registerClassName(...arguments);
      };
      var registerComposition = function registerComposition2() {
        return currentAdapter().registerComposition(...arguments);
      };
      var markCompositionUsed = function markCompositionUsed2() {
        return currentAdapter().markCompositionUsed(...arguments);
      };
      var onEndFileScope = function onEndFileScope2() {
        return currentAdapter().onEndFileScope(...arguments);
      };
      var getIdentOption = function getIdentOption2() {
        var adapter = currentAdapter();
        if (!("getIdentOption" in adapter)) {
          return false ? "short" : "debug";
        }
        return adapter.getIdentOption(...arguments);
      };
      exports.appendCss = appendCss;
      exports.getIdentOption = getIdentOption;
      exports.markCompositionUsed = markCompositionUsed;
      exports.mockAdapter = mockAdapter;
      exports.onEndFileScope = onEndFileScope;
      exports.registerClassName = registerClassName;
      exports.registerComposition = registerComposition;
      exports.removeAdapter = removeAdapter;
      exports.setAdapter = setAdapter;
      exports.setAdapterIfNotSet = setAdapterIfNotSet;
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/taggedTemplateLiteral-c635af00.browser.cjs.js
  var require_taggedTemplateLiteral_c635af00_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/taggedTemplateLiteral-c635af00.browser.cjs.js"(exports) {
      "use strict";
      function _taggedTemplateLiteral(strings, raw) {
        if (!raw) {
          raw = strings.slice(0);
        }
        return Object.freeze(Object.defineProperties(strings, {
          raw: {
            value: Object.freeze(raw)
          }
        }));
      }
      exports._taggedTemplateLiteral = _taggedTemplateLiteral;
    }
  });

  // ../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/parse.js
  var require_parse = __commonJS({
    "../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/parse.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isTraversal = void 0;
      var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
      var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
      var actionTypes = /* @__PURE__ */ new Map([
        ["~", "element"],
        ["^", "start"],
        ["$", "end"],
        ["*", "any"],
        ["!", "not"],
        ["|", "hyphen"]
      ]);
      var Traversals = {
        ">": "child",
        "<": "parent",
        "~": "sibling",
        "+": "adjacent"
      };
      var attribSelectors = {
        "#": ["id", "equals"],
        ".": ["class", "element"]
      };
      var unpackPseudos = /* @__PURE__ */ new Set([
        "has",
        "not",
        "matches",
        "is",
        "where",
        "host",
        "host-context"
      ]);
      var traversalNames = new Set(__spreadArray([
        "descendant"
      ], Object.keys(Traversals).map(function(k) {
        return Traversals[k];
      }), true));
      var caseInsensitiveAttributes = /* @__PURE__ */ new Set([
        "accept",
        "accept-charset",
        "align",
        "alink",
        "axis",
        "bgcolor",
        "charset",
        "checked",
        "clear",
        "codetype",
        "color",
        "compact",
        "declare",
        "defer",
        "dir",
        "direction",
        "disabled",
        "enctype",
        "face",
        "frame",
        "hreflang",
        "http-equiv",
        "lang",
        "language",
        "link",
        "media",
        "method",
        "multiple",
        "nohref",
        "noresize",
        "noshade",
        "nowrap",
        "readonly",
        "rel",
        "rev",
        "rules",
        "scope",
        "scrolling",
        "selected",
        "shape",
        "target",
        "text",
        "type",
        "valign",
        "valuetype",
        "vlink"
      ]);
      function isTraversal(selector) {
        return traversalNames.has(selector.type);
      }
      exports.isTraversal = isTraversal;
      var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
      var quotes = /* @__PURE__ */ new Set(['"', "'"]);
      function funescape(_, escaped, escapedWhitespace) {
        var high = parseInt(escaped, 16) - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      }
      function unescapeCSS(str) {
        return str.replace(reEscape, funescape);
      }
      function isWhitespace(c) {
        return c === " " || c === "\n" || c === "	" || c === "\f" || c === "\r";
      }
      function parse(selector, options) {
        var subselects = [];
        var endIndex = parseSelector(subselects, "" + selector, options, 0);
        if (endIndex < selector.length) {
          throw new Error("Unmatched selector: " + selector.slice(endIndex));
        }
        return subselects;
      }
      exports.default = parse;
      function parseSelector(subselects, selector, options, selectorIndex) {
        var _a, _b;
        if (options === void 0) {
          options = {};
        }
        var tokens = [];
        var sawWS = false;
        function getName(offset) {
          var match = selector.slice(selectorIndex + offset).match(reName);
          if (!match) {
            throw new Error("Expected name, found " + selector.slice(selectorIndex));
          }
          var name = match[0];
          selectorIndex += offset + name.length;
          return unescapeCSS(name);
        }
        function stripWhitespace(offset) {
          while (isWhitespace(selector.charAt(selectorIndex + offset)))
            offset++;
          selectorIndex += offset;
        }
        function isEscaped(pos) {
          var slashCount = 0;
          while (selector.charAt(--pos) === "\\")
            slashCount++;
          return (slashCount & 1) === 1;
        }
        function ensureNotTraversal() {
          if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
            throw new Error("Did not expect successive traversals.");
          }
        }
        stripWhitespace(0);
        while (selector !== "") {
          var firstChar = selector.charAt(selectorIndex);
          if (isWhitespace(firstChar)) {
            sawWS = true;
            stripWhitespace(1);
          } else if (firstChar in Traversals) {
            ensureNotTraversal();
            tokens.push({ type: Traversals[firstChar] });
            sawWS = false;
            stripWhitespace(1);
          } else if (firstChar === ",") {
            if (tokens.length === 0) {
              throw new Error("Empty sub-selector");
            }
            subselects.push(tokens);
            tokens = [];
            sawWS = false;
            stripWhitespace(1);
          } else if (selector.startsWith("/*", selectorIndex)) {
            var endIndex = selector.indexOf("*/", selectorIndex + 2);
            if (endIndex < 0) {
              throw new Error("Comment was not terminated");
            }
            selectorIndex = endIndex + 2;
          } else {
            if (sawWS) {
              ensureNotTraversal();
              tokens.push({ type: "descendant" });
              sawWS = false;
            }
            if (firstChar in attribSelectors) {
              var _c = attribSelectors[firstChar], name_1 = _c[0], action = _c[1];
              tokens.push({
                type: "attribute",
                name: name_1,
                action,
                value: getName(1),
                namespace: null,
                ignoreCase: options.xmlMode ? null : false
              });
            } else if (firstChar === "[") {
              stripWhitespace(1);
              var namespace = null;
              if (selector.charAt(selectorIndex) === "|") {
                namespace = "";
                selectorIndex += 1;
              }
              if (selector.startsWith("*|", selectorIndex)) {
                namespace = "*";
                selectorIndex += 2;
              }
              var name_2 = getName(0);
              if (namespace === null && selector.charAt(selectorIndex) === "|" && selector.charAt(selectorIndex + 1) !== "=") {
                namespace = name_2;
                name_2 = getName(1);
              }
              if ((_a = options.lowerCaseAttributeNames) !== null && _a !== void 0 ? _a : !options.xmlMode) {
                name_2 = name_2.toLowerCase();
              }
              stripWhitespace(0);
              var action = "exists";
              var possibleAction = actionTypes.get(selector.charAt(selectorIndex));
              if (possibleAction) {
                action = possibleAction;
                if (selector.charAt(selectorIndex + 1) !== "=") {
                  throw new Error("Expected `=`");
                }
                stripWhitespace(2);
              } else if (selector.charAt(selectorIndex) === "=") {
                action = "equals";
                stripWhitespace(1);
              }
              var value = "";
              var ignoreCase = null;
              if (action !== "exists") {
                if (quotes.has(selector.charAt(selectorIndex))) {
                  var quote = selector.charAt(selectorIndex);
                  var sectionEnd = selectorIndex + 1;
                  while (sectionEnd < selector.length && (selector.charAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                    sectionEnd += 1;
                  }
                  if (selector.charAt(sectionEnd) !== quote) {
                    throw new Error("Attribute value didn't end");
                  }
                  value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
                  selectorIndex = sectionEnd + 1;
                } else {
                  var valueStart = selectorIndex;
                  while (selectorIndex < selector.length && (!isWhitespace(selector.charAt(selectorIndex)) && selector.charAt(selectorIndex) !== "]" || isEscaped(selectorIndex))) {
                    selectorIndex += 1;
                  }
                  value = unescapeCSS(selector.slice(valueStart, selectorIndex));
                }
                stripWhitespace(0);
                var forceIgnore = selector.charAt(selectorIndex);
                if (forceIgnore === "s" || forceIgnore === "S") {
                  ignoreCase = false;
                  stripWhitespace(1);
                } else if (forceIgnore === "i" || forceIgnore === "I") {
                  ignoreCase = true;
                  stripWhitespace(1);
                }
              }
              if (!options.xmlMode) {
                ignoreCase !== null && ignoreCase !== void 0 ? ignoreCase : ignoreCase = caseInsensitiveAttributes.has(name_2);
              }
              if (selector.charAt(selectorIndex) !== "]") {
                throw new Error("Attribute selector didn't terminate");
              }
              selectorIndex += 1;
              var attributeSelector = {
                type: "attribute",
                name: name_2,
                action,
                value,
                namespace,
                ignoreCase
              };
              tokens.push(attributeSelector);
            } else if (firstChar === ":") {
              if (selector.charAt(selectorIndex + 1) === ":") {
                tokens.push({
                  type: "pseudo-element",
                  name: getName(2).toLowerCase()
                });
                continue;
              }
              var name_3 = getName(1).toLowerCase();
              var data = null;
              if (selector.charAt(selectorIndex) === "(") {
                if (unpackPseudos.has(name_3)) {
                  if (quotes.has(selector.charAt(selectorIndex + 1))) {
                    throw new Error("Pseudo-selector " + name_3 + " cannot be quoted");
                  }
                  data = [];
                  selectorIndex = parseSelector(data, selector, options, selectorIndex + 1);
                  if (selector.charAt(selectorIndex) !== ")") {
                    throw new Error("Missing closing parenthesis in :" + name_3 + " (" + selector + ")");
                  }
                  selectorIndex += 1;
                } else {
                  selectorIndex += 1;
                  var start = selectorIndex;
                  var counter = 1;
                  for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
                    if (selector.charAt(selectorIndex) === "(" && !isEscaped(selectorIndex)) {
                      counter++;
                    } else if (selector.charAt(selectorIndex) === ")" && !isEscaped(selectorIndex)) {
                      counter--;
                    }
                  }
                  if (counter) {
                    throw new Error("Parenthesis not matched");
                  }
                  data = selector.slice(start, selectorIndex - 1);
                  if (stripQuotesFromPseudos.has(name_3)) {
                    var quot = data.charAt(0);
                    if (quot === data.slice(-1) && quotes.has(quot)) {
                      data = data.slice(1, -1);
                    }
                    data = unescapeCSS(data);
                  }
                }
              }
              tokens.push({ type: "pseudo", name: name_3, data });
            } else {
              var namespace = null;
              var name_4 = void 0;
              if (firstChar === "*") {
                selectorIndex += 1;
                name_4 = "*";
              } else if (reName.test(selector.slice(selectorIndex))) {
                if (selector.charAt(selectorIndex) === "|") {
                  namespace = "";
                  selectorIndex += 1;
                }
                name_4 = getName(0);
              } else {
                if (tokens.length && tokens[tokens.length - 1].type === "descendant") {
                  tokens.pop();
                }
                addToken(subselects, tokens);
                return selectorIndex;
              }
              if (selector.charAt(selectorIndex) === "|") {
                namespace = name_4;
                if (selector.charAt(selectorIndex + 1) === "*") {
                  name_4 = "*";
                  selectorIndex += 2;
                } else {
                  name_4 = getName(1);
                }
              }
              if (name_4 === "*") {
                tokens.push({ type: "universal", namespace });
              } else {
                if ((_b = options.lowerCaseTags) !== null && _b !== void 0 ? _b : !options.xmlMode) {
                  name_4 = name_4.toLowerCase();
                }
                tokens.push({ type: "tag", name: name_4, namespace });
              }
            }
          }
        }
        addToken(subselects, tokens);
        return selectorIndex;
      }
      function addToken(subselects, tokens) {
        if (subselects.length > 0 && tokens.length === 0) {
          throw new Error("Empty sub-selector");
        }
        subselects.push(tokens);
      }
    }
  });

  // ../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/stringify.js
  var require_stringify = __commonJS({
    "../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/stringify.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var actionTypes = {
        equals: "",
        element: "~",
        start: "^",
        end: "$",
        any: "*",
        not: "!",
        hyphen: "|"
      };
      var charsToEscape = new Set(__spreadArray(__spreadArray([], Object.keys(actionTypes).map(function(typeKey) {
        return actionTypes[typeKey];
      }).filter(Boolean), true), [
        ":",
        "[",
        "]",
        " ",
        "\\",
        "(",
        ")",
        "'"
      ], false));
      function stringify(selector) {
        return selector.map(stringifySubselector).join(", ");
      }
      exports.default = stringify;
      function stringifySubselector(token) {
        return token.map(stringifyToken).join("");
      }
      function stringifyToken(token) {
        switch (token.type) {
          case "child":
            return " > ";
          case "parent":
            return " < ";
          case "sibling":
            return " ~ ";
          case "adjacent":
            return " + ";
          case "descendant":
            return " ";
          case "universal":
            return getNamespace(token.namespace) + "*";
          case "tag":
            return getNamespacedName(token);
          case "pseudo-element":
            return "::" + escapeName(token.name);
          case "pseudo":
            if (token.data === null)
              return ":" + escapeName(token.name);
            if (typeof token.data === "string") {
              return ":" + escapeName(token.name) + "(" + escapeName(token.data) + ")";
            }
            return ":" + escapeName(token.name) + "(" + stringify(token.data) + ")";
          case "attribute": {
            if (token.name === "id" && token.action === "equals" && !token.ignoreCase && !token.namespace) {
              return "#" + escapeName(token.value);
            }
            if (token.name === "class" && token.action === "element" && !token.ignoreCase && !token.namespace) {
              return "." + escapeName(token.value);
            }
            var name_1 = getNamespacedName(token);
            if (token.action === "exists") {
              return "[" + name_1 + "]";
            }
            return "[" + name_1 + actionTypes[token.action] + "='" + escapeName(token.value) + "'" + (token.ignoreCase ? "i" : token.ignoreCase === false ? "s" : "") + "]";
          }
        }
      }
      function getNamespacedName(token) {
        return "" + getNamespace(token.namespace) + escapeName(token.name);
      }
      function getNamespace(namespace) {
        return namespace !== null ? (namespace === "*" ? "*" : escapeName(namespace)) + "|" : "";
      }
      function escapeName(str) {
        return str.split("").map(function(c) {
          return charsToEscape.has(c) ? "\\" + c : c;
        }).join("");
      }
    }
  });

  // ../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/index.js
  var require_lib = __commonJS({
    "../../node_modules/.pnpm/css-what@5.1.0/node_modules/css-what/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stringify = exports.parse = void 0;
      __exportStar(require_parse(), exports);
      var parse_1 = require_parse();
      Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
        return __importDefault(parse_1).default;
      } });
      var stringify_1 = require_stringify();
      Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
        return __importDefault(stringify_1).default;
      } });
    }
  });

  // ../../node_modules/.pnpm/outdent@0.8.0/node_modules/outdent/lib/index.js
  var require_lib2 = __commonJS({
    "../../node_modules/.pnpm/outdent@0.8.0/node_modules/outdent/lib/index.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.outdent = void 0;
      function noop() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
      }
      function createWeakMap() {
        if (typeof WeakMap !== "undefined") {
          return /* @__PURE__ */ new WeakMap();
        } else {
          return fakeSetOrMap();
        }
      }
      function fakeSetOrMap() {
        return {
          add: noop,
          delete: noop,
          get: noop,
          set: noop,
          has: function(k) {
            return false;
          }
        };
      }
      var hop = Object.prototype.hasOwnProperty;
      var has = function(obj, prop) {
        return hop.call(obj, prop);
      };
      function extend(target, source) {
        for (var prop in source) {
          if (has(source, prop)) {
            target[prop] = source[prop];
          }
        }
        return target;
      }
      var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
      var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
      var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
      var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
      var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
      function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
        var indentationLevel = 0;
        var match = strings[0].match(reDetectIndentation);
        if (match) {
          indentationLevel = match[1].length;
        }
        var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
        var reMatchIndent = new RegExp(reSource, "g");
        if (firstInterpolatedValueSetsIndentationLevel) {
          strings = strings.slice(1);
        }
        var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
        var normalizeNewlines = typeof newline === "string";
        var l = strings.length;
        var outdentedStrings = strings.map(function(v, i) {
          v = v.replace(reMatchIndent, "$1");
          if (i === 0 && trimLeadingNewline) {
            v = v.replace(reLeadingNewline, "");
          }
          if (i === l - 1 && trimTrailingNewline) {
            v = v.replace(reTrailingNewline, "");
          }
          if (normalizeNewlines) {
            v = v.replace(/\r\n|\n|\r/g, function(_) {
              return newline;
            });
          }
          return v;
        });
        return outdentedStrings;
      }
      function concatStringsAndValues(strings, values) {
        var ret = "";
        for (var i = 0, l = strings.length; i < l; i++) {
          ret += strings[i];
          if (i < l - 1) {
            ret += values[i];
          }
        }
        return ret;
      }
      function isTemplateStringsArray(v) {
        return has(v, "raw") && has(v, "length");
      }
      function createInstance(options) {
        var arrayAutoIndentCache = createWeakMap();
        var arrayFirstInterpSetsIndentCache = createWeakMap();
        function outdent(stringsOrOptions) {
          var values = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
          }
          if (isTemplateStringsArray(stringsOrOptions)) {
            var strings = stringsOrOptions;
            var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);
            var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
            var renderedArray = cache.get(strings);
            if (!renderedArray) {
              renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
              cache.set(strings, renderedArray);
            }
            if (values.length === 0) {
              return renderedArray[0];
            }
            var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
            return rendered;
          } else {
            return createInstance(extend(extend({}, options), stringsOrOptions || {}));
          }
        }
        var fullOutdent = extend(outdent, {
          string: function(str) {
            return _outdentArray([str], false, options)[0];
          }
        });
        return fullOutdent;
      }
      var defaultOutdent = createInstance({
        trimLeadingNewline: true,
        trimTrailingNewline: true
      });
      exports.outdent = defaultOutdent;
      exports.default = defaultOutdent;
      if (typeof module !== "undefined") {
        try {
          module.exports = defaultOutdent;
          Object.defineProperty(defaultOutdent, "__esModule", { value: true });
          defaultOutdent.default = defaultOutdent;
          defaultOutdent.outdent = defaultOutdent;
        } catch (e) {
        }
      }
    }
  });

  // ../../node_modules/.pnpm/media-query-parser@2.0.2/node_modules/media-query-parser/dist/index.js
  var require_dist = __commonJS({
    "../../node_modules/.pnpm/media-query-parser@2.0.2/node_modules/media-query-parser/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      function __rest(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      }
      function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }
      function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      }
      var weirdNewlines = /(\u000D|\u000C|\u000D\u000A)/g;
      var nullOrSurrogates = /[\u0000\uD800-\uDFFF]/g;
      var commentRegex = /(\/\*)[\s\S]*?(\*\/)/g;
      var lexicalAnalysis = function lexicalAnalysis2(str, index) {
        if (index === void 0) {
          index = 0;
        }
        str = str.replace(weirdNewlines, "\n").replace(nullOrSurrogates, "\uFFFD");
        str = str.replace(commentRegex, "");
        var tokens = [];
        for (; index < str.length; index += 1) {
          var code = str.charCodeAt(index);
          if (code === 9 || code === 32 || code === 10) {
            var code_1 = str.charCodeAt(++index);
            while (code_1 === 9 || code_1 === 32 || code_1 === 10) {
              code_1 = str.charCodeAt(++index);
            }
            index -= 1;
            tokens.push({
              type: "<whitespace-token>"
            });
          } else if (code === 34) {
            var result = consumeString(str, index);
            if (result === null) {
              return null;
            }
            var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
            tokens.push({
              type: "<string-token>",
              value
            });
            index = lastIndex;
          } else if (code === 35) {
            if (index + 1 < str.length) {
              var nextCode = str.charCodeAt(index + 1);
              if (nextCode === 95 || nextCode >= 65 && nextCode <= 90 || nextCode >= 97 && nextCode <= 122 || nextCode >= 128 || nextCode >= 48 && nextCode <= 57 || nextCode === 92 && index + 2 < str.length && str.charCodeAt(index + 2) !== 10) {
                var flag = wouldStartIdentifier(str, index + 1) ? "id" : "unrestricted";
                var result = consumeIdentUnsafe(str, index + 1);
                if (result !== null) {
                  var _b = __read(result, 2), lastIndex = _b[0], value = _b[1];
                  tokens.push({
                    type: "<hash-token>",
                    value: value.toLowerCase(),
                    flag
                  });
                  index = lastIndex;
                  continue;
                }
              }
            }
            tokens.push({
              type: "<delim-token>",
              value: code
            });
          } else if (code === 39) {
            var result = consumeString(str, index);
            if (result === null) {
              return null;
            }
            var _c = __read(result, 2), lastIndex = _c[0], value = _c[1];
            tokens.push({
              type: "<string-token>",
              value
            });
            index = lastIndex;
          } else if (code === 40) {
            tokens.push({
              type: "<(-token>"
            });
          } else if (code === 41) {
            tokens.push({
              type: "<)-token>"
            });
          } else if (code === 43) {
            var plusNumeric = consumeNumeric(str, index);
            if (plusNumeric === null) {
              tokens.push({
                type: "<delim-token>",
                value: code
              });
            } else {
              var _d = __read(plusNumeric, 2), lastIndex = _d[0], tokenTuple = _d[1];
              if (tokenTuple[0] === "<dimension-token>") {
                tokens.push({
                  type: "<dimension-token>",
                  value: tokenTuple[1],
                  unit: tokenTuple[2].toLowerCase(),
                  flag: "number"
                });
              } else if (tokenTuple[0] === "<number-token>") {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: tokenTuple[2]
                });
              } else {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: "number"
                });
              }
              index = lastIndex;
            }
          } else if (code === 44) {
            tokens.push({
              type: "<comma-token>"
            });
          } else if (code === 45) {
            var minusNumeric = consumeNumeric(str, index);
            if (minusNumeric !== null) {
              var _e = __read(minusNumeric, 2), lastIndex = _e[0], tokenTuple = _e[1];
              if (tokenTuple[0] === "<dimension-token>") {
                tokens.push({
                  type: "<dimension-token>",
                  value: tokenTuple[1],
                  unit: tokenTuple[2].toLowerCase(),
                  flag: "number"
                });
              } else if (tokenTuple[0] === "<number-token>") {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: tokenTuple[2]
                });
              } else {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: "number"
                });
              }
              index = lastIndex;
              continue;
            }
            if (index + 2 < str.length) {
              var nextCode = str.charCodeAt(index + 1);
              var nextNextCode = str.charCodeAt(index + 2);
              if (nextCode === 45 && nextNextCode === 62) {
                tokens.push({
                  type: "<CDC-token>"
                });
                index += 2;
                continue;
              }
            }
            var result = consumeIdentLike(str, index);
            if (result !== null) {
              var _f = __read(result, 3), lastIndex = _f[0], value = _f[1], type = _f[2];
              tokens.push({
                type,
                value
              });
              index = lastIndex;
              continue;
            }
            tokens.push({
              type: "<delim-token>",
              value: code
            });
          } else if (code === 46) {
            var minusNumeric = consumeNumeric(str, index);
            if (minusNumeric === null) {
              tokens.push({
                type: "<delim-token>",
                value: code
              });
            } else {
              var _g = __read(minusNumeric, 2), lastIndex = _g[0], tokenTuple = _g[1];
              if (tokenTuple[0] === "<dimension-token>") {
                tokens.push({
                  type: "<dimension-token>",
                  value: tokenTuple[1],
                  unit: tokenTuple[2].toLowerCase(),
                  flag: "number"
                });
              } else if (tokenTuple[0] === "<number-token>") {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: tokenTuple[2]
                });
              } else {
                tokens.push({
                  type: tokenTuple[0],
                  value: tokenTuple[1],
                  flag: "number"
                });
              }
              index = lastIndex;
              continue;
            }
          } else if (code === 58) {
            tokens.push({
              type: "<colon-token>"
            });
          } else if (code === 59) {
            tokens.push({
              type: "<semicolon-token>"
            });
          } else if (code === 60) {
            if (index + 3 < str.length) {
              var nextCode = str.charCodeAt(index + 1);
              var nextNextCode = str.charCodeAt(index + 2);
              var nextNextNextCode = str.charCodeAt(index + 3);
              if (nextCode === 33 && nextNextCode === 45 && nextNextNextCode === 45) {
                tokens.push({
                  type: "<CDO-token>"
                });
                index += 3;
                continue;
              }
            }
            tokens.push({
              type: "<delim-token>",
              value: code
            });
          } else if (code === 64) {
            var result = consumeIdent(str, index + 1);
            if (result !== null) {
              var _h = __read(result, 2), lastIndex = _h[0], value = _h[1];
              tokens.push({
                type: "<at-keyword-token>",
                value: value.toLowerCase()
              });
              index = lastIndex;
              continue;
            }
            tokens.push({
              type: "<delim-token>",
              value: code
            });
          } else if (code === 91) {
            tokens.push({
              type: "<[-token>"
            });
          } else if (code === 92) {
            var result = consumeEscape(str, index);
            if (result === null) {
              return null;
            }
            var _j = __read(result, 2), lastIndex = _j[0], value = _j[1];
            str = str.slice(0, index) + value + str.slice(lastIndex + 1);
            index -= 1;
          } else if (code === 93) {
            tokens.push({
              type: "<]-token>"
            });
          } else if (code === 123) {
            tokens.push({
              type: "<{-token>"
            });
          } else if (code === 125) {
            tokens.push({
              type: "<}-token>"
            });
          } else if (code >= 48 && code <= 57) {
            var result = consumeNumeric(str, index);
            var _k = __read(result, 2), lastIndex = _k[0], tokenTuple = _k[1];
            if (tokenTuple[0] === "<dimension-token>") {
              tokens.push({
                type: "<dimension-token>",
                value: tokenTuple[1],
                unit: tokenTuple[2].toLowerCase(),
                flag: "number"
              });
            } else if (tokenTuple[0] === "<number-token>") {
              tokens.push({
                type: tokenTuple[0],
                value: tokenTuple[1],
                flag: tokenTuple[2]
              });
            } else {
              tokens.push({
                type: tokenTuple[0],
                value: tokenTuple[1],
                flag: "number"
              });
            }
            index = lastIndex;
          } else if (code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128) {
            var result = consumeIdentLike(str, index);
            if (result === null) {
              return null;
            }
            var _l = __read(result, 3), lastIndex = _l[0], value = _l[1], type = _l[2];
            tokens.push({
              type,
              value
            });
            index = lastIndex;
          } else {
            tokens.push({
              type: "<delim-token>",
              value: code
            });
          }
        }
        tokens.push({
          type: "<EOF-token>"
        });
        return tokens;
      };
      var consumeString = function consumeString2(str, index) {
        if (str.length <= index + 1)
          return null;
        var firstCode = str.charCodeAt(index);
        var charCodes = [];
        for (var i = index + 1; i < str.length; i += 1) {
          var code = str.charCodeAt(i);
          if (code === firstCode) {
            return [i, String.fromCharCode.apply(null, charCodes)];
          } else if (code === 92) {
            var result = consumeEscape(str, i);
            if (result === null)
              return null;
            var _a = __read(result, 2), lastIndex = _a[0], charCode = _a[1];
            charCodes.push(charCode);
            i = lastIndex;
          } else if (code === 10) {
            return null;
          } else {
            charCodes.push(code);
          }
        }
        return null;
      };
      var wouldStartIdentifier = function wouldStartIdentifier2(str, index) {
        if (str.length <= index)
          return false;
        var code = str.charCodeAt(index);
        if (code === 45) {
          if (str.length <= index + 1)
            return false;
          var nextCode = str.charCodeAt(index + 1);
          if (nextCode === 45 || nextCode === 95 || nextCode >= 65 && nextCode <= 90 || nextCode >= 97 && nextCode <= 122 || nextCode >= 128) {
            return true;
          } else if (nextCode === 92) {
            if (str.length <= index + 2)
              return false;
            var nextNextCode = str.charCodeAt(index + 2);
            return nextNextCode !== 10;
          } else {
            return false;
          }
        } else if (code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128) {
          return true;
        } else if (code === 92) {
          if (str.length <= index + 1)
            return false;
          var nextCode = str.charCodeAt(index + 1);
          return nextCode !== 10;
        } else {
          return false;
        }
      };
      var consumeEscape = function consumeEscape2(str, index) {
        if (str.length <= index + 1)
          return null;
        if (str.charCodeAt(index) !== 92)
          return null;
        var code = str.charCodeAt(index + 1);
        if (code === 10) {
          return null;
        } else if (code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102) {
          var hexCharCodes = [code];
          var min = Math.min(index + 7, str.length);
          var i = index + 2;
          for (; i < min; i += 1) {
            var code_2 = str.charCodeAt(i);
            if (code_2 >= 48 && code_2 <= 57 || code_2 >= 65 && code_2 <= 70 || code_2 >= 97 && code_2 <= 102) {
              hexCharCodes.push(code_2);
            } else {
              break;
            }
          }
          if (i < str.length) {
            var code_3 = str.charCodeAt(i);
            if (code_3 === 9 || code_3 === 32 || code_3 === 10) {
              i += 1;
            }
          }
          return [i - 1, parseInt(String.fromCharCode.apply(null, hexCharCodes), 16)];
        } else {
          return [index + 1, code];
        }
      };
      var consumeNumeric = function consumeNumeric2(str, index) {
        var numberResult = consumeNumber(str, index);
        if (numberResult === null)
          return null;
        var _a = __read(numberResult, 3), numberEndIndex = _a[0], numberValue = _a[1], numberFlag = _a[2];
        var identResult = consumeIdent(str, numberEndIndex + 1);
        if (identResult !== null) {
          var _b = __read(identResult, 2), identEndIndex = _b[0], identValue = _b[1];
          return [identEndIndex, ["<dimension-token>", numberValue, identValue]];
        }
        if (numberEndIndex + 1 < str.length && str.charCodeAt(numberEndIndex + 1) === 37) {
          return [numberEndIndex + 1, ["<percentage-token>", numberValue]];
        }
        return [numberEndIndex, ["<number-token>", numberValue, numberFlag]];
      };
      var consumeNumber = function consumeNumber2(str, index) {
        if (str.length <= index)
          return null;
        var flag = "integer";
        var numberChars = [];
        var firstCode = str.charCodeAt(index);
        if (firstCode === 43 || firstCode === 45) {
          index += 1;
          if (firstCode === 45)
            numberChars.push(45);
        }
        while (index < str.length) {
          var code = str.charCodeAt(index);
          if (code >= 48 && code <= 57) {
            numberChars.push(code);
            index += 1;
          } else {
            break;
          }
        }
        if (index + 1 < str.length) {
          var nextCode = str.charCodeAt(index);
          var nextNextCode = str.charCodeAt(index + 1);
          if (nextCode === 46 && nextNextCode >= 48 && nextNextCode <= 57) {
            numberChars.push(nextCode, nextNextCode);
            flag = "number";
            index += 2;
            while (index < str.length) {
              var code = str.charCodeAt(index);
              if (code >= 48 && code <= 57) {
                numberChars.push(code);
                index += 1;
              } else {
                break;
              }
            }
          }
        }
        if (index + 1 < str.length) {
          var nextCode = str.charCodeAt(index);
          var nextNextCode = str.charCodeAt(index + 1);
          var nextNextNextCode = str.charCodeAt(index + 2);
          if (nextCode === 69 || nextCode === 101) {
            var nextNextIsDigit = nextNextCode >= 48 && nextNextCode <= 57;
            if (nextNextIsDigit || (nextNextCode === 43 || nextNextCode === 45) && nextNextNextCode >= 48 && nextNextNextCode <= 57) {
              flag = "number";
              if (nextNextIsDigit) {
                numberChars.push(69, nextNextCode);
                index += 2;
              } else if (nextNextCode === 45) {
                numberChars.push(69, 45, nextNextNextCode);
                index += 3;
              } else {
                numberChars.push(69, nextNextNextCode);
                index += 3;
              }
              while (index < str.length) {
                var code = str.charCodeAt(index);
                if (code >= 48 && code <= 57) {
                  numberChars.push(code);
                  index += 1;
                } else {
                  break;
                }
              }
            }
          }
        }
        var numberString = String.fromCharCode.apply(null, numberChars);
        var value = flag === "number" ? parseFloat(numberString) : parseInt(numberString);
        if (value === -0)
          value = 0;
        return Number.isNaN(value) ? null : [index - 1, value, flag];
      };
      var consumeIdentUnsafe = function consumeIdentUnsafe2(str, index) {
        if (str.length <= index) {
          return null;
        }
        var identChars = [];
        for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
          if (code === 45 || code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128 || code >= 48 && code <= 57) {
            identChars.push(code);
            continue;
          } else {
            var result = consumeEscape(str, index);
            if (result !== null) {
              var _a = __read(result, 2), lastIndex = _a[0], code_4 = _a[1];
              identChars.push(code_4);
              index = lastIndex;
              continue;
            }
          }
          break;
        }
        return index === 0 ? null : [index - 1, String.fromCharCode.apply(null, identChars)];
      };
      var consumeIdent = function consumeIdent2(str, index) {
        if (str.length <= index || !wouldStartIdentifier(str, index)) {
          return null;
        }
        var identChars = [];
        for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
          if (code === 45 || code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128 || code >= 48 && code <= 57) {
            identChars.push(code);
            continue;
          } else {
            var result = consumeEscape(str, index);
            if (result !== null) {
              var _a = __read(result, 2), lastIndex = _a[0], code_5 = _a[1];
              identChars.push(code_5);
              index = lastIndex;
              continue;
            }
          }
          break;
        }
        return [index - 1, String.fromCharCode.apply(null, identChars)];
      };
      var consumeUrl = function consumeUrl2(str, index) {
        var code = str.charCodeAt(index);
        while (code === 9 || code === 32 || code === 10) {
          code = str.charCodeAt(++index);
        }
        var urlChars = [];
        var hasFinishedWord = false;
        while (index < str.length) {
          if (code === 41) {
            return [index, String.fromCharCode.apply(null, urlChars)];
          } else if (code === 34 || code === 39 || code === 40) {
            return null;
          } else if (code === 9 || code === 32 || code === 10) {
            if (!hasFinishedWord && urlChars.length !== 0)
              hasFinishedWord = true;
          } else if (code === 92) {
            var result = consumeEscape(str, index);
            if (result === null || hasFinishedWord)
              return null;
            var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
            urlChars.push(value);
            index = lastIndex;
          } else {
            if (hasFinishedWord)
              return null;
            urlChars.push(code);
          }
          code = str.charCodeAt(++index);
        }
        return null;
      };
      var consumeIdentLike = function consumeIdentLike2(str, index) {
        var result = consumeIdent(str, index);
        if (result === null)
          return null;
        var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
        if (value.toLowerCase() === "url") {
          if (str.length > lastIndex + 1) {
            var nextCode = str.charCodeAt(lastIndex + 1);
            if (nextCode === 40) {
              for (var offset = 2; lastIndex + offset < str.length; offset += 1) {
                var nextNextCode = str.charCodeAt(lastIndex + offset);
                if (nextNextCode === 34 || nextNextCode === 39) {
                  return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
                } else if (nextNextCode !== 9 && nextNextCode !== 32 && nextNextCode !== 10) {
                  var result_1 = consumeUrl(str, lastIndex + offset);
                  if (result_1 === null)
                    return null;
                  var _b = __read(result_1, 2), lastUrlIndex = _b[0], value_1 = _b[1];
                  return [lastUrlIndex, value_1, "<url-token>"];
                }
              }
              return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
            }
          }
        } else if (str.length > lastIndex + 1) {
          var nextCode = str.charCodeAt(lastIndex + 1);
          if (nextCode === 40) {
            return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
          }
        }
        return [lastIndex, value.toLowerCase(), "<ident-token>"];
      };
      var simplifyAST = function simplifyAST2(ast) {
        for (var i = ast.length - 1; i >= 0; i--) {
          ast[i] = simplifyMediaQuery(ast[i]);
        }
        return ast;
      };
      var simplifyMediaQuery = function simplifyMediaQuery2(mediaQuery) {
        if (mediaQuery.mediaCondition === null)
          return mediaQuery;
        var mediaCondition = simplifyMediaCondition(mediaQuery.mediaCondition);
        if (mediaCondition.operator === null && mediaCondition.children.length === 1 && "children" in mediaCondition.children[0]) {
          mediaCondition = mediaCondition.children[0];
        }
        return {
          mediaPrefix: mediaQuery.mediaPrefix,
          mediaType: mediaQuery.mediaType,
          mediaCondition
        };
      };
      var simplifyMediaCondition = function simplifyMediaCondition2(mediaCondition) {
        for (var i = mediaCondition.children.length - 1; i >= 0; i--) {
          var unsimplifiedChild = mediaCondition.children[i];
          if (!("context" in unsimplifiedChild)) {
            var child = simplifyMediaCondition2(unsimplifiedChild);
            if (child.operator === null && child.children.length === 1) {
              mediaCondition.children[i] = child.children[0];
            } else if (child.operator === mediaCondition.operator && (child.operator === "and" || child.operator === "or")) {
              var spliceArgs = [i, 1];
              for (var i_1 = 0; i_1 < child.children.length; i_1++) {
                spliceArgs.push(child.children[i_1]);
              }
              mediaCondition.children.splice.apply(mediaCondition.children, spliceArgs);
            }
          }
        }
        return mediaCondition;
      };
      var createError = function createError2(message, err) {
        if (err instanceof Error) {
          return new Error("".concat(err.message.trim(), "\n").concat(message.trim()));
        } else {
          return new Error(message.trim());
        }
      };
      var toAST = function toAST2(str) {
        return simplifyAST(toUnflattenedAST(str));
      };
      var toUnflattenedAST = function toUnflattenedAST2(str) {
        var tokenList = lexicalAnalysis(str.trim());
        if (tokenList === null) {
          throw createError("Failed tokenizing");
        }
        var startIndex = 0;
        var endIndex = tokenList.length - 1;
        if (tokenList[0].type === "<at-keyword-token>" && tokenList[0].value === "media") {
          if (tokenList[1].type !== "<whitespace-token>") {
            throw createError("Expected whitespace after media");
          }
          startIndex = 2;
          for (var i = 2; i < tokenList.length - 1; i++) {
            var token = tokenList[i];
            if (token.type === "<{-token>") {
              endIndex = i;
              break;
            } else if (token.type === "<semicolon-token>") {
              throw createError("Expected '{' in media query but found ';'");
            }
          }
        }
        tokenList = tokenList.slice(startIndex, endIndex);
        return syntacticAnalysis(tokenList);
      };
      var removeWhitespace = function removeWhitespace2(tokenList) {
        var newTokenList = [];
        var before = false;
        for (var i = 0; i < tokenList.length; i++) {
          if (tokenList[i].type === "<whitespace-token>") {
            before = true;
            if (newTokenList.length > 0) {
              newTokenList[newTokenList.length - 1].wsAfter = true;
            }
          } else {
            newTokenList.push(__assign(__assign({}, tokenList[i]), {
              wsBefore: before,
              wsAfter: false
            }));
            before = false;
          }
        }
        return newTokenList;
      };
      var syntacticAnalysis = function syntacticAnalysis2(tokenList) {
        var e_1, _a;
        var mediaQueryList = [[]];
        for (var i = 0; i < tokenList.length; i++) {
          var token = tokenList[i];
          if (token.type === "<comma-token>") {
            mediaQueryList.push([]);
          } else {
            mediaQueryList[mediaQueryList.length - 1].push(token);
          }
        }
        var mediaQueries = mediaQueryList.map(removeWhitespace);
        if (mediaQueries.length === 1 && mediaQueries[0].length === 0) {
          return [{
            mediaCondition: null,
            mediaPrefix: null,
            mediaType: "all"
          }];
        } else {
          var mediaQueryTokens = mediaQueries.map(function(mediaQueryTokens2) {
            if (mediaQueryTokens2.length === 0) {
              return null;
            } else {
              return tokenizeMediaQuery(mediaQueryTokens2);
            }
          });
          var nonNullMediaQueryTokens = [];
          try {
            for (var mediaQueryTokens_1 = __values(mediaQueryTokens), mediaQueryTokens_1_1 = mediaQueryTokens_1.next(); !mediaQueryTokens_1_1.done; mediaQueryTokens_1_1 = mediaQueryTokens_1.next()) {
              var mediaQueryToken = mediaQueryTokens_1_1.value;
              if (mediaQueryToken !== null) {
                nonNullMediaQueryTokens.push(mediaQueryToken);
              }
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (mediaQueryTokens_1_1 && !mediaQueryTokens_1_1.done && (_a = mediaQueryTokens_1["return"]))
                _a.call(mediaQueryTokens_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          if (nonNullMediaQueryTokens.length === 0) {
            throw createError("No valid media queries");
          }
          return nonNullMediaQueryTokens;
        }
      };
      var tokenizeMediaQuery = function tokenizeMediaQuery2(tokens) {
        var firstToken = tokens[0];
        if (firstToken.type === "<(-token>") {
          try {
            return {
              mediaPrefix: null,
              mediaType: "all",
              mediaCondition: tokenizeMediaCondition(tokens, true)
            };
          } catch (err) {
            throw createError("Expected media condition after '('", err);
          }
        } else if (firstToken.type === "<ident-token>") {
          var mediaPrefix = null;
          var mediaType = void 0;
          var value = firstToken.value;
          if (value === "only" || value === "not") {
            mediaPrefix = value;
          }
          var firstIndex = mediaPrefix === null ? 0 : 1;
          if (tokens.length <= firstIndex) {
            throw createError("Expected extra token in media query");
          }
          var firstNonUnaryToken = tokens[firstIndex];
          if (firstNonUnaryToken.type === "<ident-token>") {
            var value_1 = firstNonUnaryToken.value;
            if (value_1 === "all") {
              mediaType = "all";
            } else if (value_1 === "print" || value_1 === "screen") {
              mediaType = value_1;
            } else if (value_1 === "tty" || value_1 === "tv" || value_1 === "projection" || value_1 === "handheld" || value_1 === "braille" || value_1 === "embossed" || value_1 === "aural" || value_1 === "speech") {
              mediaPrefix = mediaPrefix === "not" ? null : "not";
              mediaType = "all";
            } else {
              throw createError("Unknown ident '".concat(value_1, "' in media query"));
            }
          } else if (mediaPrefix === "not" && firstNonUnaryToken.type === "<(-token>") {
            var tokensWithParens = [{
              type: "<(-token>",
              wsBefore: false,
              wsAfter: false
            }];
            tokensWithParens.push.apply(tokensWithParens, tokens);
            tokensWithParens.push({
              type: "<)-token>",
              wsBefore: false,
              wsAfter: false
            });
            try {
              return {
                mediaPrefix: null,
                mediaType: "all",
                mediaCondition: tokenizeMediaCondition(tokensWithParens, true)
              };
            } catch (err) {
              throw createError("Expected media condition after '('", err);
            }
          } else {
            throw createError("Invalid media query");
          }
          if (firstIndex + 1 === tokens.length) {
            return {
              mediaPrefix,
              mediaType,
              mediaCondition: null
            };
          } else if (firstIndex + 4 < tokens.length) {
            var secondNonUnaryToken = tokens[firstIndex + 1];
            if (secondNonUnaryToken.type === "<ident-token>" && secondNonUnaryToken.value === "and") {
              try {
                return {
                  mediaPrefix,
                  mediaType,
                  mediaCondition: tokenizeMediaCondition(tokens.slice(firstIndex + 2), false)
                };
              } catch (err) {
                throw createError("Expected media condition after 'and'", err);
              }
            } else {
              throw createError("Expected 'and' after media prefix");
            }
          } else {
            throw createError("Expected media condition after media prefix");
          }
        } else {
          throw createError("Expected media condition or media prefix");
        }
      };
      var tokenizeMediaCondition = function tokenizeMediaCondition2(tokens, mayContainOr, previousOperator) {
        if (previousOperator === void 0) {
          previousOperator = null;
        }
        if (tokens.length < 3 || tokens[0].type !== "<(-token>" || tokens[tokens.length - 1].type !== "<)-token>") {
          throw new Error("Invalid media condition");
        }
        var endIndexOfFirstFeature = tokens.length - 1;
        var maxDepth = 0;
        var count = 0;
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          if (token.type === "<(-token>") {
            count += 1;
            maxDepth = Math.max(maxDepth, count);
          } else if (token.type === "<)-token>") {
            count -= 1;
          }
          if (count === 0) {
            endIndexOfFirstFeature = i;
            break;
          }
        }
        if (count !== 0) {
          throw new Error("Mismatched parens\nInvalid media condition");
        }
        var child;
        var featureTokens = tokens.slice(0, endIndexOfFirstFeature + 1);
        if (maxDepth === 1) {
          child = tokenizeMediaFeature(featureTokens);
        } else {
          if (featureTokens[1].type === "<ident-token>" && featureTokens[1].value === "not") {
            child = tokenizeMediaCondition2(featureTokens.slice(2, -1), true, "not");
          } else {
            child = tokenizeMediaCondition2(featureTokens.slice(1, -1), true);
          }
        }
        if (endIndexOfFirstFeature === tokens.length - 1) {
          return {
            operator: previousOperator,
            children: [child]
          };
        } else {
          var nextToken = tokens[endIndexOfFirstFeature + 1];
          if (nextToken.type !== "<ident-token>") {
            throw new Error("Invalid operator\nInvalid media condition");
          } else if (previousOperator !== null && previousOperator !== nextToken.value) {
            throw new Error("'".concat(nextToken.value, "' and '").concat(previousOperator, "' must not be at same level\nInvalid media condition"));
          } else if (nextToken.value === "or" && !mayContainOr) {
            throw new Error("Cannot use 'or' at top level of a media query\nInvalid media condition");
          } else if (nextToken.value !== "and" && nextToken.value !== "or") {
            throw new Error("Invalid operator: '".concat(nextToken.value, "'\nInvalid media condition"));
          }
          var siblings = tokenizeMediaCondition2(tokens.slice(endIndexOfFirstFeature + 2), mayContainOr, nextToken.value);
          return {
            operator: nextToken.value,
            children: [child].concat(siblings.children)
          };
        }
      };
      var tokenizeMediaFeature = function tokenizeMediaFeature2(rawTokens) {
        if (rawTokens.length < 3 || rawTokens[0].type !== "<(-token>" || rawTokens[rawTokens.length - 1].type !== "<)-token>") {
          throw new Error("Invalid media feature");
        }
        var tokens = [rawTokens[0]];
        for (var i = 1; i < rawTokens.length; i++) {
          if (i < rawTokens.length - 2) {
            var a = rawTokens[i];
            var b = rawTokens[i + 1];
            var c = rawTokens[i + 2];
            if (a.type === "<number-token>" && a.value > 0 && b.type === "<delim-token>" && b.value === 47 && c.type === "<number-token>" && c.value > 0) {
              tokens.push({
                type: "<ratio-token>",
                numerator: a.value,
                denominator: c.value,
                wsBefore: a.wsBefore,
                wsAfter: c.wsAfter
              });
              i += 2;
              continue;
            }
          }
          tokens.push(rawTokens[i]);
        }
        var nextToken = tokens[1];
        if (nextToken.type === "<ident-token>" && tokens.length === 3) {
          return {
            context: "boolean",
            feature: nextToken.value
          };
        } else if (tokens.length === 5 && tokens[1].type === "<ident-token>" && tokens[2].type === "<colon-token>") {
          var valueToken = tokens[3];
          if (valueToken.type === "<number-token>" || valueToken.type === "<dimension-token>" || valueToken.type === "<ratio-token>" || valueToken.type === "<ident-token>") {
            var feature = tokens[1].value;
            var prefix = null;
            var slice = feature.slice(0, 4);
            if (slice === "min-") {
              prefix = "min";
              feature = feature.slice(4);
            } else if (slice === "max-") {
              prefix = "max";
              feature = feature.slice(4);
            }
            valueToken.wsBefore;
            valueToken.wsAfter;
            var value = __rest(valueToken, ["wsBefore", "wsAfter"]);
            return {
              context: "value",
              prefix,
              feature,
              value
            };
          }
        } else if (tokens.length >= 5) {
          try {
            var range = tokenizeRange(tokens);
            return {
              context: "range",
              feature: range.featureName,
              range
            };
          } catch (err) {
            throw createError("Invalid media feature", err);
          }
        }
        throw new Error("Invalid media feature");
      };
      var tokenizeRange = function tokenizeRange2(tokens) {
        var _a, _b, _c, _d;
        if (tokens.length < 5 || tokens[0].type !== "<(-token>" || tokens[tokens.length - 1].type !== "<)-token>") {
          throw new Error("Invalid range");
        }
        var range = {
          leftToken: null,
          leftOp: null,
          featureName: "",
          rightOp: null,
          rightToken: null
        };
        var hasLeft = tokens[1].type === "<number-token>" || tokens[1].type === "<dimension-token>" || tokens[1].type === "<ratio-token>" || tokens[1].type === "<ident-token>" && tokens[1].value === "infinite";
        if (tokens[2].type === "<delim-token>") {
          if (tokens[2].value === 60) {
            if (tokens[3].type === "<delim-token>" && tokens[3].value === 61 && !tokens[3].wsBefore) {
              range[hasLeft ? "leftOp" : "rightOp"] = "<=";
            } else {
              range[hasLeft ? "leftOp" : "rightOp"] = "<";
            }
          } else if (tokens[2].value === 62) {
            if (tokens[3].type === "<delim-token>" && tokens[3].value === 61 && !tokens[3].wsBefore) {
              range[hasLeft ? "leftOp" : "rightOp"] = ">=";
            } else {
              range[hasLeft ? "leftOp" : "rightOp"] = ">";
            }
          } else if (tokens[2].value === 61) {
            range[hasLeft ? "leftOp" : "rightOp"] = "=";
          } else {
            throw new Error("Invalid range");
          }
          if (hasLeft) {
            range.leftToken = tokens[1];
          } else if (tokens[1].type === "<ident-token>") {
            range.featureName = tokens[1].value;
          } else {
            throw new Error("Invalid range");
          }
          var tokenIndexAfterFirstOp = 2 + ((_b = (_a = range[hasLeft ? "leftOp" : "rightOp"]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
          var tokenAfterFirstOp = tokens[tokenIndexAfterFirstOp];
          if (hasLeft) {
            if (tokenAfterFirstOp.type === "<ident-token>") {
              range.featureName = tokenAfterFirstOp.value;
              if (tokens.length >= 7) {
                var secondOpToken = tokens[tokenIndexAfterFirstOp + 1];
                var followingToken = tokens[tokenIndexAfterFirstOp + 2];
                if (secondOpToken.type === "<delim-token>") {
                  var charCode = secondOpToken.value;
                  if (charCode === 60) {
                    if (followingToken.type === "<delim-token>" && followingToken.value === 61 && !followingToken.wsBefore) {
                      range.rightOp = "<=";
                    } else {
                      range.rightOp = "<";
                    }
                  } else if (charCode === 62) {
                    if (followingToken.type === "<delim-token>" && followingToken.value === 61 && !followingToken.wsBefore) {
                      range.rightOp = ">=";
                    } else {
                      range.rightOp = ">";
                    }
                  } else {
                    throw new Error("Invalid range");
                  }
                  var tokenAfterSecondOp = tokens[tokenIndexAfterFirstOp + 1 + ((_d = (_c = range.rightOp) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0)];
                  range.rightToken = tokenAfterSecondOp;
                } else {
                  throw new Error("Invalid range");
                }
              } else if (tokenIndexAfterFirstOp + 2 !== tokens.length) {
                throw new Error("Invalid range");
              }
            } else {
              throw new Error("Invalid range");
            }
          } else {
            range.rightToken = tokenAfterFirstOp;
          }
          var validRange = null;
          var lt = range.leftToken, leftOp = range.leftOp, featureName = range.featureName, rightOp = range.rightOp, rt = range.rightToken;
          var leftToken = null;
          if (lt !== null) {
            if (lt.type === "<ident-token>") {
              var type = lt.type, value = lt.value;
              if (value === "infinite") {
                leftToken = {
                  type,
                  value
                };
              }
            } else if (lt.type === "<number-token>" || lt.type === "<dimension-token>" || lt.type === "<ratio-token>") {
              lt.wsBefore;
              lt.wsAfter;
              var ltNoWS = __rest(lt, ["wsBefore", "wsAfter"]);
              leftToken = ltNoWS;
            }
          }
          var rightToken = null;
          if (rt !== null) {
            if (rt.type === "<ident-token>") {
              var type = rt.type, value = rt.value;
              if (value === "infinite") {
                rightToken = {
                  type,
                  value
                };
              }
            } else if (rt.type === "<number-token>" || rt.type === "<dimension-token>" || rt.type === "<ratio-token>") {
              rt.wsBefore;
              rt.wsAfter;
              var rtNoWS = __rest(rt, ["wsBefore", "wsAfter"]);
              rightToken = rtNoWS;
            }
          }
          if (leftToken !== null && rightToken !== null) {
            if ((leftOp === "<" || leftOp === "<=") && (rightOp === "<" || rightOp === "<=")) {
              validRange = {
                leftToken,
                leftOp,
                featureName,
                rightOp,
                rightToken
              };
            } else if ((leftOp === ">" || leftOp === ">=") && (rightOp === ">" || rightOp === ">=")) {
              validRange = {
                leftToken,
                leftOp,
                featureName,
                rightOp,
                rightToken
              };
            } else {
              throw new Error("Invalid range");
            }
          } else if (leftToken === null && leftOp === null && rightOp !== null && rightToken !== null) {
            validRange = {
              leftToken,
              leftOp,
              featureName,
              rightOp,
              rightToken
            };
          } else if (leftToken !== null && leftOp !== null && rightOp === null && rightToken === null) {
            validRange = {
              leftToken,
              leftOp,
              featureName,
              rightOp,
              rightToken
            };
          }
          return validRange;
        } else {
          throw new Error("Invalid range");
        }
      };
      exports.consumeEscape = consumeEscape;
      exports.consumeIdent = consumeIdent;
      exports.consumeIdentLike = consumeIdentLike;
      exports.consumeIdentUnsafe = consumeIdentUnsafe;
      exports.consumeNumber = consumeNumber;
      exports.consumeNumeric = consumeNumeric;
      exports.consumeString = consumeString;
      exports.consumeUrl = consumeUrl;
      exports.lexicalAnalysis = lexicalAnalysis;
      exports.removeWhitespace = removeWhitespace;
      exports.syntacticAnalysis = syntacticAnalysis;
      exports.toAST = toAST;
      exports.toUnflattenedAST = toUnflattenedAST;
      exports.tokenizeMediaCondition = tokenizeMediaCondition;
      exports.tokenizeMediaFeature = tokenizeMediaFeature;
      exports.tokenizeMediaQuery = tokenizeMediaQuery;
      exports.tokenizeRange = tokenizeRange;
      exports.wouldStartIdentifier = wouldStartIdentifier;
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/transformCss-899723c6.browser.cjs.js
  var require_transformCss_899723c6_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/transformCss-899723c6.browser.cjs.js"(exports) {
      "use strict";
      var _private = require_vanilla_extract_private_cjs();
      var cssesc = require_cssesc();
      var AhoCorasick = require_main();
      var adapter_dist_vanillaExtractCssAdapter = require_vanilla_extract_css_adapter_browser_cjs();
      var taggedTemplateLiteral = require_taggedTemplateLiteral_c635af00_browser_cjs();
      var cssWhat = require_lib();
      var outdent = require_lib2();
      var mediaQueryParser = require_dist();
      function _interopDefault(e) {
        return e && e.__esModule ? e : { "default": e };
      }
      var cssesc__default = /* @__PURE__ */ _interopDefault(cssesc);
      var AhoCorasick__default = /* @__PURE__ */ _interopDefault(AhoCorasick);
      var outdent__default = /* @__PURE__ */ _interopDefault(outdent);
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
        return target;
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null)
          return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          target[key] = source[key];
        }
        return target;
      }
      function _objectWithoutProperties(source, excluded) {
        if (source == null)
          return {};
        var target = _objectWithoutPropertiesLoose(source, excluded);
        var key, i;
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0)
              continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key))
              continue;
            target[key] = source[key];
          }
        }
        return target;
      }
      function forEach(obj, fn) {
        for (var _key in obj) {
          fn(obj[_key], _key);
        }
      }
      function omit(obj, omitKeys) {
        var result = {};
        for (var _key2 in obj) {
          if (omitKeys.indexOf(_key2) === -1) {
            result[_key2] = obj[_key2];
          }
        }
        return result;
      }
      function mapKeys(obj, fn) {
        var result = {};
        for (var _key3 in obj) {
          result[fn(obj[_key3], _key3)] = obj[_key3];
        }
        return result;
      }
      function composeStylesIntoSet(set) {
        for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key5 = 1; _key5 < _len; _key5++) {
          classNames[_key5 - 1] = arguments[_key5];
        }
        for (var className of classNames) {
          if (className.length === 0) {
            continue;
          }
          if (typeof className === "string") {
            if (className.includes(" ")) {
              composeStylesIntoSet(set, ...className.trim().split(" "));
            } else {
              set.add(className);
            }
          } else if (Array.isArray(className)) {
            composeStylesIntoSet(set, ...className);
          }
        }
      }
      function dudupeAndJoinClassList(classNames) {
        var set = /* @__PURE__ */ new Set();
        composeStylesIntoSet(set, ...classNames);
        return Array.from(set).join(" ");
      }
      var _templateObject$1;
      function escapeRegex(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      var validateSelector = (selector, targetClassName) => {
        var replaceTarget = () => {
          var targetRegex = new RegExp(".".concat(escapeRegex(cssesc__default["default"](targetClassName, {
            isIdentifier: true
          }))), "g");
          return selector.replace(targetRegex, "&");
        };
        var selectorParts;
        try {
          selectorParts = cssWhat.parse(selector);
        } catch (err) {
          throw new Error("Invalid selector: ".concat(replaceTarget()));
        }
        selectorParts.forEach((tokens) => {
          try {
            for (var i = tokens.length - 1; i >= -1; i--) {
              if (!tokens[i]) {
                throw new Error();
              }
              var token = tokens[i];
              if (token.type === "child" || token.type === "parent" || token.type === "sibling" || token.type === "adjacent" || token.type === "descendant") {
                throw new Error();
              }
              if (token.type === "attribute" && token.name === "class" && token.value === targetClassName) {
                return;
              }
            }
          } catch (err) {
            throw new Error(outdent__default["default"](_templateObject$1 || (_templateObject$1 = taggedTemplateLiteral._taggedTemplateLiteral(["\n        Invalid selector: ", "\n    \n        Style selectors must target the '&' character (along with any modifiers), e.g. ", " or ", ".\n        \n        This is to ensure that each style block only affects the styling of a single class.\n        \n        If your selector is targeting another class, you should move it to the style definition for that class, e.g. given we have styles for 'parent' and 'child' elements, instead of adding a selector of ", ") to 'parent', you should add ", " to 'child').\n        \n        If your selector is targeting something global, use the 'globalStyle' function instead, e.g. if you wanted to write ", ", you should instead write 'globalStyle(", ", { ... })'\n      "])), replaceTarget(), "`${parent} &`", "`${parent} &:hover`", "`& ${child}`", "`${parent} &`", "`& h1`", "`${parent} h1`"));
          }
        });
      };
      var ConditionalRuleset = class {
        constructor() {
          this.ruleset = /* @__PURE__ */ new Map();
          this.precedenceLookup = /* @__PURE__ */ new Map();
        }
        findOrCreateCondition(conditionQuery) {
          var targetCondition = this.ruleset.get(conditionQuery);
          if (!targetCondition) {
            targetCondition = {
              query: conditionQuery,
              rules: [],
              children: new ConditionalRuleset()
            };
            this.ruleset.set(conditionQuery, targetCondition);
          }
          return targetCondition;
        }
        getConditionalRulesetByPath(conditionPath) {
          var currRuleset = this;
          for (var query of conditionPath) {
            var condition = currRuleset.findOrCreateCondition(query);
            currRuleset = condition.children;
          }
          return currRuleset;
        }
        addRule(rule, conditionQuery, conditionPath) {
          var ruleset = this.getConditionalRulesetByPath(conditionPath);
          var targetCondition = ruleset.findOrCreateCondition(conditionQuery);
          if (!targetCondition) {
            throw new Error("Failed to add conditional rule");
          }
          targetCondition.rules.push(rule);
        }
        addConditionPrecedence(conditionPath, conditionOrder) {
          var ruleset = this.getConditionalRulesetByPath(conditionPath);
          for (var i = 0; i < conditionOrder.length; i++) {
            var _ruleset$precedenceLo;
            var query = conditionOrder[i];
            var conditionPrecedence = (_ruleset$precedenceLo = ruleset.precedenceLookup.get(query)) !== null && _ruleset$precedenceLo !== void 0 ? _ruleset$precedenceLo : /* @__PURE__ */ new Set();
            for (var lowerPrecedenceCondition of conditionOrder.slice(i + 1)) {
              conditionPrecedence.add(lowerPrecedenceCondition);
            }
            ruleset.precedenceLookup.set(query, conditionPrecedence);
          }
        }
        isCompatible(incomingRuleset) {
          for (var [condition, orderPrecedence] of this.precedenceLookup.entries()) {
            for (var lowerPrecedenceCondition of orderPrecedence) {
              var _incomingRuleset$prec;
              if ((_incomingRuleset$prec = incomingRuleset.precedenceLookup.get(lowerPrecedenceCondition)) !== null && _incomingRuleset$prec !== void 0 && _incomingRuleset$prec.has(condition)) {
                return false;
              }
            }
          }
          for (var {
            query,
            children
          } of incomingRuleset.ruleset.values()) {
            var matchingCondition = this.ruleset.get(query);
            if (matchingCondition && !matchingCondition.children.isCompatible(children)) {
              return false;
            }
          }
          return true;
        }
        merge(incomingRuleset) {
          for (var {
            query,
            rules,
            children
          } of incomingRuleset.ruleset.values()) {
            var matchingCondition = this.ruleset.get(query);
            if (matchingCondition) {
              matchingCondition.rules.push(...rules);
              matchingCondition.children.merge(children);
            } else {
              this.ruleset.set(query, {
                query,
                rules,
                children
              });
            }
          }
          for (var [condition, incomingOrderPrecedence] of incomingRuleset.precedenceLookup.entries()) {
            var _this$precedenceLooku;
            var orderPrecedence = (_this$precedenceLooku = this.precedenceLookup.get(condition)) !== null && _this$precedenceLooku !== void 0 ? _this$precedenceLooku : /* @__PURE__ */ new Set();
            this.precedenceLookup.set(condition, /* @__PURE__ */ new Set([...orderPrecedence, ...incomingOrderPrecedence]));
          }
        }
        mergeIfCompatible(incomingRuleset) {
          if (!this.isCompatible(incomingRuleset)) {
            return false;
          }
          this.merge(incomingRuleset);
          return true;
        }
        getSortedRuleset() {
          var _this = this;
          var sortedRuleset = [];
          var _loop = function _loop2(query2, dependents2) {
            var conditionForQuery = _this.ruleset.get(query2);
            if (!conditionForQuery) {
              throw new Error("Can't find condition for ".concat(query2));
            }
            var firstMatchingDependent = sortedRuleset.findIndex((condition) => dependents2.has(condition.query));
            if (firstMatchingDependent > -1) {
              sortedRuleset.splice(firstMatchingDependent, 0, conditionForQuery);
            } else {
              sortedRuleset.push(conditionForQuery);
            }
          };
          for (var [query, dependents] of this.precedenceLookup.entries()) {
            _loop(query, dependents);
          }
          return sortedRuleset;
        }
        renderToArray() {
          var arr = [];
          for (var {
            query,
            rules,
            children
          } of this.getSortedRuleset()) {
            var selectors = {};
            for (var rule of rules) {
              selectors[rule.selector] = rule.rule;
            }
            Object.assign(selectors, ...children.renderToArray());
            arr.push({
              [query]: selectors
            });
          }
          return arr;
        }
      };
      var simplePseudoMap = {
        ":-moz-any-link": true,
        ":-moz-full-screen": true,
        ":-moz-placeholder": true,
        ":-moz-read-only": true,
        ":-moz-read-write": true,
        ":-ms-fullscreen": true,
        ":-ms-input-placeholder": true,
        ":-webkit-any-link": true,
        ":-webkit-full-screen": true,
        "::-moz-placeholder": true,
        "::-moz-progress-bar": true,
        "::-moz-range-progress": true,
        "::-moz-range-thumb": true,
        "::-moz-range-track": true,
        "::-moz-selection": true,
        "::-ms-backdrop": true,
        "::-ms-browse": true,
        "::-ms-check": true,
        "::-ms-clear": true,
        "::-ms-fill": true,
        "::-ms-fill-lower": true,
        "::-ms-fill-upper": true,
        "::-ms-reveal": true,
        "::-ms-thumb": true,
        "::-ms-ticks-after": true,
        "::-ms-ticks-before": true,
        "::-ms-tooltip": true,
        "::-ms-track": true,
        "::-ms-value": true,
        "::-webkit-backdrop": true,
        "::-webkit-input-placeholder": true,
        "::-webkit-progress-bar": true,
        "::-webkit-progress-inner-value": true,
        "::-webkit-progress-value": true,
        "::-webkit-resizer": true,
        "::-webkit-scrollbar-button": true,
        "::-webkit-scrollbar-corner": true,
        "::-webkit-scrollbar-thumb": true,
        "::-webkit-scrollbar-track-piece": true,
        "::-webkit-scrollbar-track": true,
        "::-webkit-scrollbar": true,
        "::-webkit-slider-runnable-track": true,
        "::-webkit-slider-thumb": true,
        "::after": true,
        "::backdrop": true,
        "::before": true,
        "::cue": true,
        "::first-letter": true,
        "::first-line": true,
        "::grammar-error": true,
        "::placeholder": true,
        "::selection": true,
        "::spelling-error": true,
        ":active": true,
        ":after": true,
        ":any-link": true,
        ":before": true,
        ":blank": true,
        ":checked": true,
        ":default": true,
        ":defined": true,
        ":disabled": true,
        ":empty": true,
        ":enabled": true,
        ":first": true,
        ":first-child": true,
        ":first-letter": true,
        ":first-line": true,
        ":first-of-type": true,
        ":focus": true,
        ":focus-visible": true,
        ":focus-within": true,
        ":fullscreen": true,
        ":hover": true,
        ":in-range": true,
        ":indeterminate": true,
        ":invalid": true,
        ":last-child": true,
        ":last-of-type": true,
        ":left": true,
        ":link": true,
        ":only-child": true,
        ":only-of-type": true,
        ":optional": true,
        ":out-of-range": true,
        ":placeholder-shown": true,
        ":read-only": true,
        ":read-write": true,
        ":required": true,
        ":right": true,
        ":root": true,
        ":scope": true,
        ":target": true,
        ":valid": true,
        ":visited": true
      };
      var simplePseudos = Object.keys(simplePseudoMap);
      var simplePseudoLookup = simplePseudoMap;
      var _templateObject;
      var createMediaQueryError = (mediaQuery, msg) => new Error(outdent__default["default"](_templateObject || (_templateObject = taggedTemplateLiteral._taggedTemplateLiteral(['\n    Invalid media query: "', '"\n\n    ', "\n\n    Read more on MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries\n  "])), mediaQuery, msg));
      var validateMediaQuery = (mediaQuery) => {
        if (mediaQuery === "@media ") {
          throw createMediaQueryError(mediaQuery, "Query is empty");
        }
        try {
          mediaQueryParser.toAST(mediaQuery);
        } catch (e) {
          throw createMediaQueryError(mediaQuery, e.message);
        }
      };
      var _excluded = ["vars"];
      var _excluded2 = ["content"];
      var UNITLESS = {
        animationIterationCount: true,
        borderImage: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexShrink: true,
        fontWeight: true,
        gridArea: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnStart: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowStart: true,
        initialLetter: true,
        lineClamp: true,
        lineHeight: true,
        maxLines: true,
        opacity: true,
        order: true,
        orphans: true,
        scale: true,
        tabSize: true,
        WebkitLineClamp: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        maskBorder: true,
        maskBorderOutset: true,
        maskBorderSlice: true,
        maskBorderWidth: true,
        shapeImageThreshold: true,
        stopOpacity: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      function dashify(str) {
        return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
      }
      function replaceBetweenIndexes(target, startIndex, endIndex, replacement) {
        var start = target.slice(0, startIndex);
        var end = target.slice(endIndex);
        return "".concat(start).concat(replacement).concat(end);
      }
      var DOUBLE_SPACE = "  ";
      var specialKeys = [...simplePseudos, "@media", "@supports", "@container", "selectors"];
      var Stylesheet = class {
        constructor(localClassNames, composedClassLists) {
          this.rules = [];
          this.conditionalRulesets = [new ConditionalRuleset()];
          this.fontFaceRules = [];
          this.keyframesRules = [];
          this.localClassNamesMap = new Map(localClassNames.map((localClassName) => [localClassName, localClassName]));
          this.localClassNamesSearch = new AhoCorasick__default["default"](localClassNames);
          this.composedClassLists = composedClassLists.map((_ref) => {
            var {
              identifier,
              classList
            } = _ref;
            return {
              identifier,
              regex: RegExp("(".concat(classList, ")"), "g")
            };
          }).reverse();
        }
        processCssObj(root) {
          if (root.type === "fontFace") {
            this.fontFaceRules.push(root.rule);
            return;
          }
          if (root.type === "keyframes") {
            this.keyframesRules.push(root);
            return;
          }
          var mainRule = omit(root.rule, specialKeys);
          this.addRule({
            selector: root.selector,
            rule: mainRule
          });
          this.currConditionalRuleset = new ConditionalRuleset();
          this.transformMedia(root, root.rule["@media"]);
          this.transformSupports(root, root.rule["@supports"]);
          this.transformContainer(root, root.rule["@container"]);
          this.transformSimplePseudos(root, root.rule);
          this.transformSelectors(root, root.rule);
          var activeConditionalRuleset = this.conditionalRulesets[this.conditionalRulesets.length - 1];
          if (!activeConditionalRuleset.mergeIfCompatible(this.currConditionalRuleset)) {
            this.conditionalRulesets.push(this.currConditionalRuleset);
          }
        }
        addConditionalRule(cssRule, conditions) {
          var rule = this.transformVars(this.transformContent(this.pixelifyProperties(cssRule.rule)));
          var selector = this.transformSelector(cssRule.selector);
          if (!this.currConditionalRuleset) {
            throw new Error("Couldn't add conditional rule");
          }
          var conditionQuery = conditions[conditions.length - 1];
          var parentConditions = conditions.slice(0, conditions.length - 1);
          this.currConditionalRuleset.addRule({
            selector,
            rule
          }, conditionQuery, parentConditions);
        }
        addRule(cssRule) {
          var rule = this.transformVars(this.transformContent(this.pixelifyProperties(cssRule.rule)));
          var selector = this.transformSelector(cssRule.selector);
          this.rules.push({
            selector,
            rule
          });
        }
        pixelifyProperties(cssRule) {
          forEach(cssRule, (value, key) => {
            if (typeof value === "number" && value !== 0 && !UNITLESS[key]) {
              cssRule[key] = "".concat(value, "px");
            }
          });
          return cssRule;
        }
        transformVars(_ref2) {
          var {
            vars
          } = _ref2, rest = _objectWithoutProperties(_ref2, _excluded);
          if (!vars) {
            return rest;
          }
          return _objectSpread2(_objectSpread2({}, mapKeys(vars, (_value, key) => _private.getVarName(key))), rest);
        }
        transformContent(_ref3) {
          var {
            content
          } = _ref3, rest = _objectWithoutProperties(_ref3, _excluded2);
          if (typeof content === "undefined") {
            return rest;
          }
          var contentArray = Array.isArray(content) ? content : [content];
          return _objectSpread2({
            content: contentArray.map((value) => value && (value.includes('"') || value.includes("'") || /^([A-Za-z\-]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)(\s|$)/.test(value)) ? value : '"'.concat(value, '"'))
          }, rest);
        }
        transformClassname(identifier) {
          return ".".concat(cssesc__default["default"](identifier, {
            isIdentifier: true
          }));
        }
        transformSelector(selector) {
          var transformedSelector = selector;
          var _loop = function _loop2(identifier2, regex2) {
            transformedSelector = transformedSelector.replace(regex2, () => {
              adapter_dist_vanillaExtractCssAdapter.markCompositionUsed(identifier2);
              return identifier2;
            });
          };
          for (var {
            identifier,
            regex
          } of this.composedClassLists) {
            _loop(identifier, regex);
          }
          if (this.localClassNamesMap.has(transformedSelector)) {
            return this.transformClassname(transformedSelector);
          }
          var results = this.localClassNamesSearch.search(transformedSelector);
          var lastReplaceIndex = transformedSelector.length;
          for (var i = results.length - 1; i >= 0; i--) {
            var [endIndex, [firstMatch]] = results[i];
            var startIndex = endIndex - firstMatch.length + 1;
            if (startIndex >= lastReplaceIndex) {
              continue;
            }
            lastReplaceIndex = startIndex;
            if (transformedSelector[startIndex - 1] !== ".") {
              transformedSelector = replaceBetweenIndexes(transformedSelector, startIndex, endIndex + 1, this.transformClassname(firstMatch));
            }
          }
          return transformedSelector;
        }
        transformSelectors(root, rule, conditions) {
          forEach(rule.selectors, (selectorRule, selector) => {
            if (root.type !== "local") {
              throw new Error("Selectors are not allowed within ".concat(root.type === "global" ? '"globalStyle"' : '"selectors"'));
            }
            var transformedSelector = this.transformSelector(selector.replace(RegExp("&", "g"), root.selector));
            validateSelector(transformedSelector, root.selector);
            var rule2 = {
              selector: transformedSelector,
              rule: omit(selectorRule, specialKeys)
            };
            if (conditions) {
              this.addConditionalRule(rule2, conditions);
            } else {
              this.addRule(rule2);
            }
            var selectorRoot = {
              type: "selector",
              selector: transformedSelector,
              rule: selectorRule
            };
            this.transformSupports(selectorRoot, selectorRule["@supports"], conditions);
            this.transformMedia(selectorRoot, selectorRule["@media"], conditions);
          });
        }
        transformMedia(root, rules) {
          var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          if (rules) {
            var _this$currConditional;
            (_this$currConditional = this.currConditionalRuleset) === null || _this$currConditional === void 0 ? void 0 : _this$currConditional.addConditionPrecedence(parentConditions, Object.keys(rules).map((query) => "@media ".concat(query)));
            forEach(rules, (mediaRule, query) => {
              var mediaQuery = "@media ".concat(query);
              validateMediaQuery(mediaQuery);
              var conditions = [...parentConditions, mediaQuery];
              this.addConditionalRule({
                selector: root.selector,
                rule: omit(mediaRule, specialKeys)
              }, conditions);
              if (root.type === "local") {
                this.transformSimplePseudos(root, mediaRule, conditions);
                this.transformSelectors(root, mediaRule, conditions);
              }
              this.transformSupports(root, mediaRule["@supports"], conditions);
              this.transformContainer(root, mediaRule["@container"], conditions);
            });
          }
        }
        transformContainer(root, rules) {
          var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          if (rules) {
            var _this$currConditional2;
            (_this$currConditional2 = this.currConditionalRuleset) === null || _this$currConditional2 === void 0 ? void 0 : _this$currConditional2.addConditionPrecedence(parentConditions, Object.keys(rules).map((query) => "@container ".concat(query)));
            forEach(rules, (containerRule, query) => {
              var containerQuery = "@container ".concat(query);
              var conditions = [...parentConditions, containerQuery];
              this.addConditionalRule({
                selector: root.selector,
                rule: omit(containerRule, specialKeys)
              }, conditions);
              if (root.type === "local") {
                this.transformSimplePseudos(root, containerRule, conditions);
                this.transformSelectors(root, containerRule, conditions);
              }
              this.transformSupports(root, containerRule["@supports"], conditions);
              this.transformMedia(root, containerRule["@media"], conditions);
            });
          }
        }
        transformSupports(root, rules) {
          var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
          if (rules) {
            var _this$currConditional3;
            (_this$currConditional3 = this.currConditionalRuleset) === null || _this$currConditional3 === void 0 ? void 0 : _this$currConditional3.addConditionPrecedence(parentConditions, Object.keys(rules).map((query) => "@supports ".concat(query)));
            forEach(rules, (supportsRule, query) => {
              var conditions = [...parentConditions, "@supports ".concat(query)];
              this.addConditionalRule({
                selector: root.selector,
                rule: omit(supportsRule, specialKeys)
              }, conditions);
              if (root.type === "local") {
                this.transformSimplePseudos(root, supportsRule, conditions);
                this.transformSelectors(root, supportsRule, conditions);
              }
              this.transformMedia(root, supportsRule["@media"], conditions);
              this.transformContainer(root, supportsRule["@container"], conditions);
            });
          }
        }
        transformSimplePseudos(root, rule, conditions) {
          for (var key of Object.keys(rule)) {
            if (simplePseudoLookup[key]) {
              if (root.type !== "local") {
                throw new Error("Simple pseudos are not valid in ".concat(root.type === "global" ? '"globalStyle"' : '"selectors"'));
              }
              if (conditions) {
                this.addConditionalRule({
                  selector: "".concat(root.selector).concat(key),
                  rule: rule[key]
                }, conditions);
              } else {
                this.addRule({
                  conditions,
                  selector: "".concat(root.selector).concat(key),
                  rule: rule[key]
                });
              }
            }
          }
        }
        toCss() {
          var css = [];
          for (var fontFaceRule of this.fontFaceRules) {
            css.push(renderCss({
              "@font-face": fontFaceRule
            }));
          }
          for (var keyframe of this.keyframesRules) {
            css.push(renderCss({
              ["@keyframes ".concat(keyframe.name)]: keyframe.rule
            }));
          }
          for (var rule of this.rules) {
            css.push(renderCss({
              [rule.selector]: rule.rule
            }));
          }
          for (var conditionalRuleset of this.conditionalRulesets) {
            for (var conditionalRule of conditionalRuleset.renderToArray()) {
              css.push(renderCss(conditionalRule));
            }
          }
          return css.filter(Boolean);
        }
      };
      function renderCss(v) {
        var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var rules = [];
        var _loop2 = function _loop22(key2) {
          var value = v[key2];
          if (value && Array.isArray(value)) {
            rules.push(...value.map((v2) => renderCss({
              [key2]: v2
            }, indent)));
          } else if (value && typeof value === "object") {
            var isEmpty = Object.keys(value).length === 0;
            if (!isEmpty) {
              rules.push("".concat(indent).concat(key2, " {\n").concat(renderCss(value, indent + DOUBLE_SPACE), "\n").concat(indent, "}"));
            }
          } else {
            rules.push("".concat(indent).concat(key2.startsWith("--") ? key2 : dashify(key2), ": ").concat(value, ";"));
          }
        };
        for (var key of Object.keys(v)) {
          _loop2(key);
        }
        return rules.join("\n");
      }
      function transformCss(_ref4) {
        var {
          localClassNames,
          cssObjs,
          composedClassLists
        } = _ref4;
        var stylesheet = new Stylesheet(localClassNames, composedClassLists);
        for (var root of cssObjs) {
          stylesheet.processCssObj(root);
        }
        return stylesheet.toCss();
      }
      exports._objectSpread2 = _objectSpread2;
      exports.dudupeAndJoinClassList = dudupeAndJoinClassList;
      exports.transformCss = transformCss;
    }
  });

  // ../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js
  var require_emotion_hash_cjs_dev = __commonJS({
    "../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.cjs.dev.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function murmur2(str) {
        var h = 0;
        var k, i = 0, len = str.length;
        for (; len >= 4; ++i, len -= 4) {
          k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
          k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
          k ^= k >>> 24;
          h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        }
        switch (len) {
          case 3:
            h ^= (str.charCodeAt(i + 2) & 255) << 16;
          case 2:
            h ^= (str.charCodeAt(i + 1) & 255) << 8;
          case 1:
            h ^= str.charCodeAt(i) & 255;
            h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        }
        h ^= h >>> 13;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        return ((h ^ h >>> 15) >>> 0).toString(36);
      }
      exports.default = murmur2;
    }
  });

  // ../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.cjs.js
  var require_emotion_hash_cjs = __commonJS({
    "../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.cjs.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_emotion_hash_cjs_dev();
      }
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/fileScope/dist/vanilla-extract-css-fileScope.browser.cjs.js
  var require_vanilla_extract_css_fileScope_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/fileScope/dist/vanilla-extract-css-fileScope.browser.cjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var taggedTemplateLiteral = require_taggedTemplateLiteral_c635af00_browser_cjs();
      var outdent = require_lib2();
      var adapter_dist_vanillaExtractCssAdapter = require_vanilla_extract_css_adapter_browser_cjs();
      function _interopDefault(e) {
        return e && e.__esModule ? e : { "default": e };
      }
      var outdent__default = /* @__PURE__ */ _interopDefault(outdent);
      var _templateObject;
      var refCounter = 0;
      var fileScopes = [];
      function setFileScope(filePath, packageName) {
        refCounter = 0;
        fileScopes.unshift({
          filePath,
          packageName
        });
      }
      function endFileScope() {
        adapter_dist_vanillaExtractCssAdapter.onEndFileScope(getFileScope());
        refCounter = 0;
        fileScopes.splice(0, 1);
      }
      function hasFileScope() {
        return fileScopes.length > 0;
      }
      function getFileScope() {
        if (fileScopes.length === 0) {
          throw new Error(outdent__default["default"](_templateObject || (_templateObject = taggedTemplateLiteral._taggedTemplateLiteral(["\n        Styles were unable to be assigned to a file. This is generally caused by one of the following:\n\n        - You may have created styles outside of a '.css.ts' context\n        - You may have incorrect configuration. See https://vanilla-extract.style/documentation/getting-started\n      "]))));
        }
        return fileScopes[0];
      }
      function getAndIncrementRefCounter() {
        return refCounter++;
      }
      exports.endFileScope = endFileScope;
      exports.getAndIncrementRefCounter = getAndIncrementRefCounter;
      exports.getFileScope = getFileScope;
      exports.hasFileScope = hasFileScope;
      exports.setFileScope = setFileScope;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/utils.js
  var require_utils = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.makeObjectWithoutPrototype = exports.isObject = exports.isEmptyObject = exports.isEmpty = exports.isDate = exports.hasOwnProperty = void 0;
      var isDate = (d) => d instanceof Date;
      exports.isDate = isDate;
      var isEmpty = (o) => Object.keys(o).length === 0;
      exports.isEmpty = isEmpty;
      var isObject = (o) => o != null && typeof o === "object";
      exports.isObject = isObject;
      var hasOwnProperty = (o, ...args) => Object.prototype.hasOwnProperty.call(o, ...args);
      exports.hasOwnProperty = hasOwnProperty;
      var isEmptyObject = (o) => isObject(o) && isEmpty(o);
      exports.isEmptyObject = isEmptyObject;
      var makeObjectWithoutPrototype = () => /* @__PURE__ */ Object.create(null);
      exports.makeObjectWithoutPrototype = makeObjectWithoutPrototype;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/diff.js
  var require_diff = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/diff.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _utils = require_utils();
      var diff = (lhs, rhs) => {
        if (lhs === rhs)
          return {};
        if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs))
          return rhs;
        const deletedValues = Object.keys(lhs).reduce((acc, key) => {
          if (!(0, _utils.hasOwnProperty)(rhs, key)) {
            acc[key] = void 0;
          }
          return acc;
        }, (0, _utils.makeObjectWithoutPrototype)());
        if ((0, _utils.isDate)(lhs) || (0, _utils.isDate)(rhs)) {
          if (lhs.valueOf() == rhs.valueOf())
            return {};
          return rhs;
        }
        return Object.keys(rhs).reduce((acc, key) => {
          if (!(0, _utils.hasOwnProperty)(lhs, key)) {
            acc[key] = rhs[key];
            return acc;
          }
          const difference = diff(lhs[key], rhs[key]);
          if ((0, _utils.isEmptyObject)(difference) && !(0, _utils.isDate)(difference) && ((0, _utils.isEmptyObject)(lhs[key]) || !(0, _utils.isEmptyObject)(rhs[key])))
            return acc;
          acc[key] = difference;
          return acc;
        }, deletedValues);
      };
      var _default = diff;
      exports.default = _default;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/added.js
  var require_added = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/added.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _utils = require_utils();
      var addedDiff = (lhs, rhs) => {
        if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs))
          return {};
        return Object.keys(rhs).reduce((acc, key) => {
          if ((0, _utils.hasOwnProperty)(lhs, key)) {
            const difference = addedDiff(lhs[key], rhs[key]);
            if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference))
              return acc;
            acc[key] = difference;
            return acc;
          }
          acc[key] = rhs[key];
          return acc;
        }, (0, _utils.makeObjectWithoutPrototype)());
      };
      var _default = addedDiff;
      exports.default = _default;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/deleted.js
  var require_deleted = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/deleted.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _utils = require_utils();
      var deletedDiff = (lhs, rhs) => {
        if (lhs === rhs || !(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs))
          return {};
        return Object.keys(lhs).reduce((acc, key) => {
          if ((0, _utils.hasOwnProperty)(rhs, key)) {
            const difference = deletedDiff(lhs[key], rhs[key]);
            if ((0, _utils.isObject)(difference) && (0, _utils.isEmpty)(difference))
              return acc;
            acc[key] = difference;
            return acc;
          }
          acc[key] = void 0;
          return acc;
        }, (0, _utils.makeObjectWithoutPrototype)());
      };
      var _default = deletedDiff;
      exports.default = _default;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/updated.js
  var require_updated = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/updated.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _utils = require_utils();
      var updatedDiff = (lhs, rhs) => {
        if (lhs === rhs)
          return {};
        if (!(0, _utils.isObject)(lhs) || !(0, _utils.isObject)(rhs))
          return rhs;
        if ((0, _utils.isDate)(lhs) || (0, _utils.isDate)(rhs)) {
          if (lhs.valueOf() == rhs.valueOf())
            return {};
          return rhs;
        }
        return Object.keys(rhs).reduce((acc, key) => {
          if ((0, _utils.hasOwnProperty)(lhs, key)) {
            const difference = updatedDiff(lhs[key], rhs[key]);
            if ((0, _utils.isEmptyObject)(difference) && !(0, _utils.isDate)(difference) && ((0, _utils.isEmptyObject)(lhs[key]) || !(0, _utils.isEmptyObject)(rhs[key])))
              return acc;
            acc[key] = difference;
            return acc;
          }
          return acc;
        }, (0, _utils.makeObjectWithoutPrototype)());
      };
      var _default = updatedDiff;
      exports.default = _default;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/detailed.js
  var require_detailed = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/detailed.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _added = _interopRequireDefault(require_added());
      var _deleted = _interopRequireDefault(require_deleted());
      var _updated = _interopRequireDefault(require_updated());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var detailedDiff = (lhs, rhs) => ({
        added: (0, _added.default)(lhs, rhs),
        deleted: (0, _deleted.default)(lhs, rhs),
        updated: (0, _updated.default)(lhs, rhs)
      });
      var _default = detailedDiff;
      exports.default = _default;
    }
  });

  // ../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/index.js
  var require_cjs = __commonJS({
    "../../node_modules/.pnpm/deep-object-diff@1.1.9/node_modules/deep-object-diff/cjs/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "addedDiff", {
        enumerable: true,
        get: function() {
          return _added.default;
        }
      });
      Object.defineProperty(exports, "deletedDiff", {
        enumerable: true,
        get: function() {
          return _deleted.default;
        }
      });
      Object.defineProperty(exports, "detailedDiff", {
        enumerable: true,
        get: function() {
          return _detailed.default;
        }
      });
      Object.defineProperty(exports, "diff", {
        enumerable: true,
        get: function() {
          return _diff.default;
        }
      });
      Object.defineProperty(exports, "updatedDiff", {
        enumerable: true,
        get: function() {
          return _updated.default;
        }
      });
      var _diff = _interopRequireDefault(require_diff());
      var _added = _interopRequireDefault(require_added());
      var _deleted = _interopRequireDefault(require_deleted());
      var _updated = _interopRequireDefault(require_updated());
      var _detailed = _interopRequireDefault(require_detailed());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
    }
  });

  // ../../node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
  var require_color_name = __commonJS({
    "../../node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports, module) {
      "use strict";
      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }
  });

  // ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
  var require_conversions = __commonJS({
    "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports, module) {
      var cssKeywords = require_color_name();
      var reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
      var convert = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      module.exports = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        const { channels, labels } = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
      convert.rgb.hsl = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const delta = max - min;
        let h;
        let s;
        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g - b) / delta;
        } else if (g === max) {
          h = 2 + (b - r) / delta;
        } else if (b === max) {
          h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) {
          h += 360;
        }
        const l = (min + max) / 2;
        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }
        return [h, s * 100, l * 100];
      };
      convert.rgb.hsv = function(rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const v = Math.max(r, g, b);
        const diff = v - Math.min(r, g, b);
        const diffc = function(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h = 0;
          s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g);
          bdif = diffc(b);
          if (r === v) {
            h = bdif - gdif;
          } else if (g === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b === v) {
            h = 2 / 3 + gdif - rdif;
          }
          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }
        return [
          h * 360,
          s * 100,
          v * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        const r = rgb[0];
        const g = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = 1 / 255 * Math.min(r, Math.min(g, b));
        b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
        return [h, w * 100, b * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const k = Math.min(1 - r, 1 - g, 1 - b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      };
      function comparativeDistance(x, y) {
        return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      }
      convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];
          const distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
        g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
        b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
        const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        return [x * 100, y * 100, z * 100];
      };
      convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.hsl.rgb = function(hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;
        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }
        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }
        const t1 = 2 * l - t2;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);
        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
        return [h, sv * 100, v * 100];
      };
      convert.hsv.rgb = function(hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - s * f);
        const t = 255 * v * (1 - s * (1 - f));
        v *= 255;
        switch (hi) {
          case 0:
            return [v, t, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t];
          case 3:
            return [p, q, v];
          case 4:
            return [t, p, v];
          case 5:
            return [v, p, q];
        }
      };
      convert.hsv.hsl = function(hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      };
      convert.hwb.rgb = function(hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;
        if ((i & 1) !== 0) {
          f = 1 - f;
        }
        const n = wh + f * (v - wh);
        let r;
        let g;
        let b;
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b = wh;
            break;
          case 1:
            r = n;
            g = v;
            b = wh;
            break;
          case 2:
            r = wh;
            g = v;
            b = n;
            break;
          case 3:
            r = wh;
            g = n;
            b = v;
            break;
          case 4:
            r = n;
            g = wh;
            b = v;
            break;
          case 5:
            r = v;
            g = wh;
            b = n;
            break;
        }
        return [r * 255, g * 255, b * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;
        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b * 255];
      };
      convert.xyz.rgb = function(xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g;
        let b;
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.204 + z * 1.057;
        r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
        g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
        b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g * 255, b * 255];
      };
      convert.xyz.lab = function(xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.lab.xyz = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let x;
        let y;
        let z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
      };
      convert.lab.lch = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let h;
        const hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
          h += 360;
        }
        const c = Math.sqrt(a * a + b * b);
        return [l, c, h];
      };
      convert.lch.lab = function(lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];
        const hr = h / 360 * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);
        return [l, a, b];
      };
      convert.rgb.ansi16 = function(args, saturation = null) {
        const [r, g, b] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        const r = args[0];
        const g = args[1];
        const b = args[2];
        if (r === g && g === b) {
          if (r < 8) {
            return 16;
          }
          if (r > 248) {
            return 231;
          }
          return Math.round((r - 8) / 247 * 24) + 232;
        }
        const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        let color = args % 10;
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }
          color = color / 10.5 * 255;
          return [color, color, color];
        }
        const mult = (~~(args > 50) + 1) * 0.5;
        const r = (color & 1) * mult * 255;
        const g = (color >> 1 & 1) * mult * 255;
        const b = (color >> 2 & 1) * mult * 255;
        return [r, g, b];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c = (args - 232) * 10 + 8;
          return [c, c, c];
        }
        args -= 16;
        let rem;
        const r = Math.floor(args / 36) / 5 * 255;
        const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b = rem % 6 / 5 * 255;
        return [r, g, b];
      };
      convert.rgb.hex = function(args) {
        const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        let colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map((char) => {
            return char + char;
          }).join("");
        }
        const integer = parseInt(colorString, 16);
        const r = integer >> 16 & 255;
        const g = integer >> 8 & 255;
        const b = integer & 255;
        return [r, g, b];
      };
      convert.rgb.hcg = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(Math.max(r, g), b);
        const min = Math.min(Math.min(r, g), b);
        const chroma = max - min;
        let grayscale;
        let hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = (g - b) / chroma % 6;
        } else if (max === g) {
          hue = 2 + (b - r) / chroma;
        } else {
          hue = 4 + (r - g) / chroma;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
        let f = 0;
        if (c < 1) {
          f = (l - 0.5 * c) / (1 - c);
        }
        return [hsl[0], c * 100, f * 100];
      };
      convert.hsv.hcg = function(hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const c = s * v;
        let f = 0;
        if (c < 1) {
          f = (v - c) / (1 - c);
        }
        return [hsv[0], c * 100, f * 100];
      };
      convert.hcg.rgb = function(hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        if (c === 0) {
          return [g * 255, g * 255, g * 255];
        }
        const pure = [0, 0, 0];
        const hi = h % 1 * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }
        mg = (1 - c) * g;
        return [
          (c * pure[0] + mg) * 255,
          (c * pure[1] + mg) * 255,
          (c * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        let f = 0;
        if (v > 0) {
          f = c / v;
        }
        return [hcg[0], f * 100, v * 100];
      };
      convert.hcg.hsl = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const l = g * (1 - c) + 0.5 * c;
        let s = 0;
        if (l > 0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1) {
          s = c / (2 * (1 - l));
        }
        return [hcg[0], s * 100, l * 100];
      };
      convert.hcg.hwb = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        const w = hwb[1] / 100;
        const b = hwb[2] / 100;
        const v = 1 - b;
        const c = v - w;
        let g = 0;
        if (c < 1) {
          g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hsv = convert.gray.hsl;
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        const val = Math.round(gray[0] / 100 * 255) & 255;
        const integer = (val << 16) + (val << 8) + val;
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
    }
  });

  // ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
  var require_route = __commonJS({
    "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports, module) {
      var conversions = require_conversions();
      function buildGraph() {
        const graph = {};
        const models = Object.keys(conversions);
        for (let len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions[current]);
          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path = [graph[toModel].parent, toModel];
        let fn = conversions[graph[toModel].parent][toModel];
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      module.exports = function(fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          const node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
    }
  });

  // ../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
  var require_color_convert = __commonJS({
    "../../node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports, module) {
      var conversions = require_conversions();
      var route = require_route();
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          const result = fn(args);
          if (typeof result === "object") {
            for (let len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach((fromModel) => {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
        const routes = route(fromModel);
        const routeModels = Object.keys(routes);
        routeModels.forEach((toModel) => {
          const fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      module.exports = convert;
    }
  });

  // ../../node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS({
    "../../node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports, module) {
      "use strict";
      var wrapAnsi16 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${code + offset}m`;
      };
      var wrapAnsi256 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\x1B[${38 + offset};5;${code}m`;
      };
      var wrapAnsi16m = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      };
      var ansi2ansi = (n) => n;
      var rgb2rgb = (r, g, b) => [r, g, b];
      var setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get();
            Object.defineProperty(object, property, {
              value,
              enumerable: true,
              configurable: true
            });
            return value;
          },
          enumerable: true,
          configurable: true
        });
      };
      var colorConvert;
      var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        if (colorConvert === void 0) {
          colorConvert = require_color_convert();
        }
        const offset = isBackground ? 10 : 0;
        const styles = {};
        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
          const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
          if (sourceSpace === targetSpace) {
            styles[name] = wrap(identity, offset);
          } else if (typeof suite === "object") {
            styles[name] = wrap(suite[targetSpace], offset);
          }
        }
        return styles;
      };
      function assembleStyles() {
        const codes = /* @__PURE__ */ new Map();
        const styles = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles.color.gray = styles.color.blackBright;
        styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
        styles.color.grey = styles.color.blackBright;
        styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles)) {
          for (const [styleName, style2] of Object.entries(group)) {
            styles[styleName] = {
              open: `\x1B[${style2[0]}m`,
              close: `\x1B[${style2[1]}m`
            };
            group[styleName] = styles[styleName];
            codes.set(style2[0], style2[1]);
          }
          Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
        styles.color.close = "\x1B[39m";
        styles.bgColor.close = "\x1B[49m";
        setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
        setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
        setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
        setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
        setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
        setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
        return styles;
      }
      Object.defineProperty(module, "exports", {
        enumerable: true,
        get: assembleStyles
      });
    }
  });

  // ../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/browser.js
  var require_browser = __commonJS({
    "../../node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/browser.js"(exports, module) {
      "use strict";
      module.exports = {
        stdout: false,
        stderr: false
      };
    }
  });

  // ../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/util.js
  var require_util = __commonJS({
    "../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/util.js"(exports, module) {
      "use strict";
      var stringReplaceAll = (string, substring, replacer) => {
        let index = string.indexOf(substring);
        if (index === -1) {
          return string;
        }
        const substringLength = substring.length;
        let endIndex = 0;
        let returnValue = "";
        do {
          returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
          endIndex = index + substringLength;
          index = string.indexOf(substring, endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
        let endIndex = 0;
        let returnValue = "";
        do {
          const gotCR = string[index - 1] === "\r";
          returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
          endIndex = index + 1;
          index = string.indexOf("\n", endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      module.exports = {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
      };
    }
  });

  // ../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/templates.js
  var require_templates = __commonJS({
    "../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/templates.js"(exports, module) {
      "use strict";
      var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
      var ESCAPES = /* @__PURE__ */ new Map([
        ["n", "\n"],
        ["r", "\r"],
        ["t", "	"],
        ["b", "\b"],
        ["f", "\f"],
        ["v", "\v"],
        ["0", "\0"],
        ["\\", "\\"],
        ["e", "\x1B"],
        ["a", "\x07"]
      ]);
      function unescape(c) {
        const u = c[0] === "u";
        const bracket = c[1] === "{";
        if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
          return String.fromCharCode(parseInt(c.slice(1), 16));
        }
        if (u && bracket) {
          return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }
        return ESCAPES.get(c) || c;
      }
      function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
          } else {
            throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
          }
        }
        return results;
      }
      function parseStyle(style2) {
        STYLE_REGEX.lastIndex = 0;
        const results = [];
        let matches;
        while ((matches = STYLE_REGEX.exec(style2)) !== null) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }
        return results;
      }
      function buildStyle(chalk, styles) {
        const enabled = {};
        for (const layer of styles) {
          for (const style2 of layer.styles) {
            enabled[style2[0]] = layer.inverse ? null : style2.slice(1);
          }
        }
        let current = chalk;
        for (const [styleName, styles2] of Object.entries(enabled)) {
          if (!Array.isArray(styles2)) {
            continue;
          }
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
        }
        return current;
      }
      module.exports = (chalk, temporary) => {
        const styles = [];
        const chunks = [];
        let chunk = [];
        temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style2, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape(escapeCharacter));
          } else if (style2) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
            styles.push({ inverse, styles: parseStyle(style2) });
          } else if (close) {
            if (styles.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle(chalk, styles)(chunk.join("")));
            chunk = [];
            styles.pop();
          } else {
            chunk.push(character);
          }
        });
        chunks.push(chunk.join(""));
        if (styles.length > 0) {
          const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(errMessage);
        }
        return chunks.join("");
      };
    }
  });

  // ../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/index.js
  var require_source = __commonJS({
    "../../node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/index.js"(exports, module) {
      "use strict";
      var ansiStyles = require_ansi_styles();
      var { stdout: stdoutColor, stderr: stderrColor } = require_browser();
      var {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
      } = require_util();
      var { isArray } = Array;
      var levelMapping = [
        "ansi",
        "ansi",
        "ansi256",
        "ansi16m"
      ];
      var styles = /* @__PURE__ */ Object.create(null);
      var applyOptions = (object, options = {}) => {
        if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
          throw new Error("The `level` option should be an integer from 0 to 3");
        }
        const colorLevel = stdoutColor ? stdoutColor.level : 0;
        object.level = options.level === void 0 ? colorLevel : options.level;
      };
      var ChalkClass = class {
        constructor(options) {
          return chalkFactory(options);
        }
      };
      var chalkFactory = (options) => {
        const chalk2 = {};
        applyOptions(chalk2, options);
        chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
        Object.setPrototypeOf(chalk2, Chalk.prototype);
        Object.setPrototypeOf(chalk2.template, chalk2);
        chalk2.template.constructor = () => {
          throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
        };
        chalk2.template.Instance = ChalkClass;
        return chalk2.template;
      };
      function Chalk(options) {
        return chalkFactory(options);
      }
      for (const [styleName, style2] of Object.entries(ansiStyles)) {
        styles[styleName] = {
          get() {
            const builder = createBuilder(this, createStyler(style2.open, style2.close, this._styler), this._isEmpty);
            Object.defineProperty(this, styleName, { value: builder });
            return builder;
          }
        };
      }
      styles.visible = {
        get() {
          const builder = createBuilder(this, this._styler, true);
          Object.defineProperty(this, "visible", { value: builder });
          return builder;
        }
      };
      var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
      for (const model of usedModels) {
        styles[model] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
              return createBuilder(this, styler, this._isEmpty);
            };
          }
        };
      }
      for (const model of usedModels) {
        const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
        styles[bgModel] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
              return createBuilder(this, styler, this._isEmpty);
            };
          }
        };
      }
      var proto = Object.defineProperties(() => {
      }, {
        ...styles,
        level: {
          enumerable: true,
          get() {
            return this._generator.level;
          },
          set(level) {
            this._generator.level = level;
          }
        }
      });
      var createStyler = (open, close, parent) => {
        let openAll;
        let closeAll;
        if (parent === void 0) {
          openAll = open;
          closeAll = close;
        } else {
          openAll = parent.openAll + open;
          closeAll = close + parent.closeAll;
        }
        return {
          open,
          close,
          openAll,
          closeAll,
          parent
        };
      };
      var createBuilder = (self, _styler, _isEmpty) => {
        const builder = (...arguments_) => {
          if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
            return applyStyle(builder, chalkTag(builder, ...arguments_));
          }
          return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
        };
        Object.setPrototypeOf(builder, proto);
        builder._generator = self;
        builder._styler = _styler;
        builder._isEmpty = _isEmpty;
        return builder;
      };
      var applyStyle = (self, string) => {
        if (self.level <= 0 || !string) {
          return self._isEmpty ? "" : string;
        }
        let styler = self._styler;
        if (styler === void 0) {
          return string;
        }
        const { openAll, closeAll } = styler;
        if (string.indexOf("\x1B") !== -1) {
          while (styler !== void 0) {
            string = stringReplaceAll(string, styler.close, styler.open);
            styler = styler.parent;
          }
        }
        const lfIndex = string.indexOf("\n");
        if (lfIndex !== -1) {
          string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
        }
        return openAll + string + closeAll;
      };
      var template;
      var chalkTag = (chalk2, ...strings) => {
        const [firstString] = strings;
        if (!isArray(firstString) || !isArray(firstString.raw)) {
          return strings.join(" ");
        }
        const arguments_ = strings.slice(1);
        const parts = [firstString.raw[0]];
        for (let i = 1; i < firstString.length; i++) {
          parts.push(
            String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
            String(firstString.raw[i])
          );
        }
        if (template === void 0) {
          template = require_templates();
        }
        return template(chalk2, parts.join(""));
      };
      Object.defineProperties(Chalk.prototype, styles);
      var chalk = Chalk();
      chalk.supportsColor = stdoutColor;
      chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
      chalk.stderr.supportsColor = stderrColor;
      module.exports = chalk;
    }
  });

  // ../../node_modules/.pnpm/deepmerge@4.2.2/node_modules/deepmerge/dist/cjs.js
  var require_cjs2 = __commonJS({
    "../../node_modules/.pnpm/deepmerge@4.2.2/node_modules/deepmerge/dist/cjs.js"(exports, module) {
      "use strict";
      var isMergeableObject = function isMergeableObject2(value) {
        return isNonNullObject(value) && !isSpecial(value);
      };
      function isNonNullObject(value) {
        return !!value && typeof value === "object";
      }
      function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
      }
      var canUseSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
      function isReactElement(value) {
        return value.$$typeof === REACT_ELEMENT_TYPE;
      }
      function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
      }
      function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
      }
      function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function(element) {
          return cloneUnlessOtherwiseSpecified(element, options);
        });
      }
      function getMergeFunction(key, options) {
        if (!options.customMerge) {
          return deepmerge;
        }
        var customMerge = options.customMerge(key);
        return typeof customMerge === "function" ? customMerge : deepmerge;
      }
      function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
          return target.propertyIsEnumerable(symbol);
        }) : [];
      }
      function getKeys(target) {
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
      }
      function propertyIsOnObject(object, property) {
        try {
          return property in object;
        } catch (_) {
          return false;
        }
      }
      function propertyIsUnsafe(target, key) {
        return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
      }
      function mergeObject(target, source, options) {
        var destination = {};
        if (options.isMergeableObject(target)) {
          getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
          });
        }
        getKeys(source).forEach(function(key) {
          if (propertyIsUnsafe(target, key)) {
            return;
          }
          if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
          } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
          }
        });
        return destination;
      }
      function deepmerge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject = options.isMergeableObject || isMergeableObject;
        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
        if (!sourceAndTargetTypesMatch) {
          return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
          return options.arrayMerge(target, source, options);
        } else {
          return mergeObject(target, source, options);
        }
      }
      deepmerge.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array)) {
          throw new Error("first argument should be an array");
        }
        return array.reduce(function(prev, next) {
          return deepmerge(prev, next, options);
        }, {});
      };
      var deepmerge_1 = deepmerge;
      module.exports = deepmerge_1;
    }
  });

  // ../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/vanilla-extract-css.browser.cjs.js
  var require_vanilla_extract_css_browser_cjs = __commonJS({
    "../../node_modules/.pnpm/@vanilla-extract+css@1.9.2/node_modules/@vanilla-extract/css/dist/vanilla-extract-css.browser.cjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var injectStyles_dist_vanillaExtractCssInjectStyles = require_vanilla_extract_css_injectStyles_browser_cjs();
      var transformCss_dist_vanillaExtractCssTransformCss = require_transformCss_899723c6_browser_cjs();
      var adapter_dist_vanillaExtractCssAdapter = require_vanilla_extract_css_adapter_browser_cjs();
      var hash = require_emotion_hash_cjs();
      var fileScope_dist_vanillaExtractCssFileScope = require_vanilla_extract_css_fileScope_browser_cjs();
      var _private = require_vanilla_extract_private_cjs();
      var cssesc = require_cssesc();
      var deepObjectDiff = require_cjs();
      var chalk = require_source();
      var taggedTemplateLiteral = require_taggedTemplateLiteral_c635af00_browser_cjs();
      var outdent = require_lib2();
      var deepmerge = require_cjs2();
      require_main();
      require_lib();
      require_dist();
      function _interopDefault(e) {
        return e && e.__esModule ? e : { "default": e };
      }
      var hash__default = /* @__PURE__ */ _interopDefault(hash);
      var cssesc__default = /* @__PURE__ */ _interopDefault(cssesc);
      var chalk__default = /* @__PURE__ */ _interopDefault(chalk);
      var outdent__default = /* @__PURE__ */ _interopDefault(outdent);
      var deepmerge__default = /* @__PURE__ */ _interopDefault(deepmerge);
      var localClassNames = /* @__PURE__ */ new Set();
      var composedClassLists = [];
      var bufferedCSSObjs = [];
      var browserRuntimeAdapter = {
        appendCss: (cssObj) => {
          bufferedCSSObjs.push(cssObj);
        },
        registerClassName: (className) => {
          localClassNames.add(className);
        },
        registerComposition: (composition) => {
          composedClassLists.push(composition);
        },
        markCompositionUsed: () => {
        },
        onEndFileScope: (fileScope) => {
          var css = transformCss_dist_vanillaExtractCssTransformCss.transformCss({
            localClassNames: Array.from(localClassNames),
            composedClassLists,
            cssObjs: bufferedCSSObjs
          }).join("\n");
          injectStyles_dist_vanillaExtractCssInjectStyles.injectStyles({
            fileScope,
            css
          });
          bufferedCSSObjs = [];
        },
        getIdentOption: () => false ? "short" : "debug"
      };
      {
        adapter_dist_vanillaExtractCssAdapter.setAdapterIfNotSet(browserRuntimeAdapter);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperty(subClass, "prototype", {
          writable: false
        });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _wrapRegExp() {
        _wrapRegExp = function(re, groups) {
          return new BabelRegExp(re, void 0, groups);
        };
        var _super = RegExp.prototype, _groups = /* @__PURE__ */ new WeakMap();
        function BabelRegExp(re, flags, groups) {
          var _this = new RegExp(re, flags);
          return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
        }
        function buildGroups(result, re) {
          var g = _groups.get(re);
          return Object.keys(g).reduce(function(groups, name) {
            var i = g[name];
            if ("number" == typeof i)
              groups[name] = result[i];
            else {
              for (var k = 0; void 0 === result[i[k]] && k + 1 < i.length; )
                k++;
              groups[name] = result[i[k]];
            }
            return groups;
          }, /* @__PURE__ */ Object.create(null));
        }
        return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(str) {
          var result = _super.exec.call(this, str);
          return result && (result.groups = buildGroups(result, this)), result;
        }, BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
          if ("string" == typeof substitution) {
            var groups = _groups.get(this);
            return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function(_, name) {
              return "$" + groups[name];
            }));
          }
          if ("function" == typeof substitution) {
            var _this = this;
            return _super[Symbol.replace].call(this, str, function() {
              var args = arguments;
              return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
            });
          }
          return _super[Symbol.replace].call(this, str, substitution);
        }, _wrapRegExp.apply(this, arguments);
      }
      function getDevPrefix(_ref) {
        var {
          debugId,
          debugFileName
        } = _ref;
        var parts = debugId ? [debugId.replace(/\s/g, "_")] : [];
        if (debugFileName) {
          var {
            filePath
          } = fileScope_dist_vanillaExtractCssFileScope.getFileScope();
          var matches = filePath.match(/* @__PURE__ */ _wrapRegExp(/((?:(?![\/\\])[\s\S])*)?[\/\\]?((?:(?![\/\\])[\s\S])*)\.css\.(ts|js|tsx|jsx|cjs|mjs)$/, {
            dir: 1,
            file: 2
          }));
          if (matches && matches.groups) {
            var {
              dir,
              file
            } = matches.groups;
            parts.unshift(file && file !== "index" ? file : dir);
          }
        }
        return parts.join("_");
      }
      function generateIdentifier(arg) {
        var {
          debugId,
          debugFileName = true
        } = transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, typeof arg === "string" ? {
          debugId: arg
        } : null), typeof arg === "object" ? arg : null);
        var refCount = fileScope_dist_vanillaExtractCssFileScope.getAndIncrementRefCounter().toString(36);
        var {
          filePath,
          packageName
        } = fileScope_dist_vanillaExtractCssFileScope.getFileScope();
        var fileScopeHash = hash__default["default"](packageName ? "".concat(packageName).concat(filePath) : filePath);
        var identifier = "".concat(fileScopeHash).concat(refCount);
        if (adapter_dist_vanillaExtractCssAdapter.getIdentOption() === "debug") {
          var devPrefix = getDevPrefix({
            debugId,
            debugFileName
          });
          if (devPrefix) {
            identifier = "".concat(devPrefix, "__").concat(identifier);
          }
        }
        return identifier.match(/^[0-9]/) ? "_".concat(identifier) : identifier;
      }
      var normaliseObject = (obj) => _private.walkObject(obj, () => "");
      function validateContract(contract, tokens) {
        var theDiff = deepObjectDiff.diff(normaliseObject(contract), normaliseObject(tokens));
        var valid = Object.keys(theDiff).length === 0;
        return {
          valid,
          diffString: valid ? "" : renderDiff(contract, theDiff)
        };
      }
      function diffLine(value, nesting, type) {
        var whitespace = [...Array(nesting).keys()].map(() => "  ").join("");
        var line = "".concat(type ? type : " ").concat(whitespace).concat(value);
        if (true) {
          if (type === "-") {
            return chalk__default["default"].red(line);
          }
          if (type === "+") {
            return chalk__default["default"].green(line);
          }
        }
        return line;
      }
      function renderDiff(orig, diff) {
        var nesting = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        var lines = [];
        if (nesting === 0) {
          lines.push(diffLine("{", 0));
        }
        var innerNesting = nesting + 1;
        var keys = Object.keys(diff).sort();
        for (var key of keys) {
          var value = diff[key];
          if (!(key in orig)) {
            lines.push(diffLine("".concat(key, ": ...,"), innerNesting, "+"));
          } else if (typeof value === "object") {
            lines.push(diffLine("".concat(key, ": {"), innerNesting));
            lines.push(renderDiff(orig[key], diff[key], innerNesting));
            lines.push(diffLine("}", innerNesting));
          } else {
            lines.push(diffLine("".concat(key, ": ...,"), innerNesting, "-"));
          }
        }
        if (nesting === 0) {
          lines.push(diffLine("}", 0));
        }
        return lines.join("\n");
      }
      function createVar(debugId) {
        var cssVarName = cssesc__default["default"](generateIdentifier({
          debugId,
          debugFileName: false
        }), {
          isIdentifier: true
        });
        return "var(--".concat(cssVarName, ")");
      }
      function fallbackVar() {
        var finalValue = "";
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }
        values.reverse().forEach((value) => {
          if (finalValue === "") {
            finalValue = String(value);
          } else {
            if (typeof value !== "string" || !/^var\(--.*\)$/.test(value)) {
              throw new Error("Invalid variable name: ".concat(value));
            }
            finalValue = value.replace(/\)$/, ", ".concat(finalValue, ")"));
          }
        });
        return finalValue;
      }
      function assignVars(varContract, tokens) {
        var varSetters = {};
        var {
          valid,
          diffString
        } = validateContract(varContract, tokens);
        if (!valid) {
          throw new Error("Tokens don't match contract.\n".concat(diffString));
        }
        _private.walkObject(tokens, (value, path) => {
          varSetters[_private.get(varContract, path)] = String(value);
        });
        return varSetters;
      }
      function createThemeContract(tokens) {
        return _private.walkObject(tokens, (_value, path) => {
          return createVar(path.join("-"));
        });
      }
      function createGlobalThemeContract(tokens, mapFn) {
        return _private.walkObject(tokens, (value, path) => {
          var rawVarName = typeof mapFn === "function" ? mapFn(value, path) : value;
          var varName = typeof rawVarName === "string" ? rawVarName.replace(/^\-\-/, "") : null;
          if (typeof varName !== "string" || varName !== cssesc__default["default"](varName, {
            isIdentifier: true
          })) {
            throw new Error('Invalid variable name for "'.concat(path.join("."), '": ').concat(varName));
          }
          return "var(--".concat(varName, ")");
        });
      }
      function createGlobalTheme(selector, arg2, arg3) {
        var shouldCreateVars = Boolean(!arg3);
        var themeVars = shouldCreateVars ? createThemeContract(arg2) : arg2;
        var tokens = shouldCreateVars ? arg2 : arg3;
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "global",
          selector,
          rule: {
            vars: assignVars(themeVars, tokens)
          }
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
        if (shouldCreateVars) {
          return themeVars;
        }
      }
      function createTheme(arg1, arg2, arg3) {
        var themeClassName = generateIdentifier(typeof arg2 === "object" ? arg3 : arg2);
        adapter_dist_vanillaExtractCssAdapter.registerClassName(themeClassName);
        var vars = typeof arg2 === "object" ? createGlobalTheme(themeClassName, arg1, arg2) : createGlobalTheme(themeClassName, arg1);
        return vars ? [themeClassName, vars] : themeClassName;
      }
      var _templateObject;
      function composedStyle(rules, debugId) {
        var className = generateIdentifier(debugId);
        adapter_dist_vanillaExtractCssAdapter.registerClassName(className);
        var classList = [];
        var styleRules = [];
        for (var rule of rules) {
          if (typeof rule === "string") {
            classList.push(rule);
          } else {
            styleRules.push(rule);
          }
        }
        var result = className;
        if (classList.length > 0) {
          result = "".concat(className, " ").concat(transformCss_dist_vanillaExtractCssTransformCss.dudupeAndJoinClassList(classList));
          adapter_dist_vanillaExtractCssAdapter.registerComposition({
            identifier: className,
            classList: result
          });
          if (styleRules.length > 0) {
            adapter_dist_vanillaExtractCssAdapter.markCompositionUsed(className);
          }
        }
        if (styleRules.length > 0) {
          var _rule = deepmerge__default["default"].all(styleRules, {
            arrayMerge: (_, sourceArray) => sourceArray
          });
          adapter_dist_vanillaExtractCssAdapter.appendCss({
            type: "local",
            selector: className,
            rule: _rule
          }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
        }
        return result;
      }
      function style2(rule, debugId) {
        if (Array.isArray(rule)) {
          return composedStyle(rule, debugId);
        }
        var className = generateIdentifier(debugId);
        adapter_dist_vanillaExtractCssAdapter.registerClassName(className);
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "local",
          selector: className,
          rule
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
        return className;
      }
      function composeStyles() {
        var compose = fileScope_dist_vanillaExtractCssFileScope.hasFileScope() ? composedStyle : transformCss_dist_vanillaExtractCssTransformCss.dudupeAndJoinClassList;
        for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
          classNames[_key] = arguments[_key];
        }
        return compose(classNames);
      }
      function globalStyle(selector, rule) {
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "global",
          selector,
          rule
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
      }
      function fontFace(rule, debugId) {
        var fontFamily = '"'.concat(cssesc__default["default"](generateIdentifier(debugId), {
          quotes: "double"
        }), '"');
        if ("fontFamily" in rule) {
          throw new Error(outdent__default["default"](_templateObject || (_templateObject = taggedTemplateLiteral._taggedTemplateLiteral([`
          This function creates and returns a hashed font-family name, so the "fontFamily" property should not be provided.
  
          If you'd like to define a globally scoped custom font, you can use the "globalFontFace" function instead.
        `]))));
        }
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "fontFace",
          rule: transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, rule), {}, {
            fontFamily
          })
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
        return fontFamily;
      }
      function globalFontFace(fontFamily, rule) {
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "fontFace",
          rule: transformCss_dist_vanillaExtractCssTransformCss._objectSpread2(transformCss_dist_vanillaExtractCssTransformCss._objectSpread2({}, rule), {}, {
            fontFamily
          })
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
      }
      function keyframes(rule, debugId) {
        var name = cssesc__default["default"](generateIdentifier(debugId), {
          isIdentifier: true
        });
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "keyframes",
          name,
          rule
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
        return name;
      }
      function globalKeyframes(name, rule) {
        adapter_dist_vanillaExtractCssAdapter.appendCss({
          type: "keyframes",
          name,
          rule
        }, fileScope_dist_vanillaExtractCssFileScope.getFileScope());
      }
      function styleVariants() {
        if (typeof (arguments.length <= 1 ? void 0 : arguments[1]) === "function") {
          var _data = arguments.length <= 0 ? void 0 : arguments[0];
          var _mapData = arguments.length <= 1 ? void 0 : arguments[1];
          var _debugId = arguments.length <= 2 ? void 0 : arguments[2];
          var _classMap = {};
          for (var _key2 in _data) {
            _classMap[_key2] = style2(_mapData(_data[_key2], _key2), _debugId ? "".concat(_debugId, "_").concat(_key2) : _key2);
          }
          return _classMap;
        }
        var styleMap = arguments.length <= 0 ? void 0 : arguments[0];
        var debugId = arguments.length <= 1 ? void 0 : arguments[1];
        var classMap = {};
        for (var _key3 in styleMap) {
          classMap[_key3] = style2(styleMap[_key3], debugId ? "".concat(debugId, "_").concat(_key3) : _key3);
        }
        return classMap;
      }
      var createContainer = (debugId) => generateIdentifier(debugId);
      exports.assignVars = assignVars;
      exports.composeStyles = composeStyles;
      exports.createContainer = createContainer;
      exports.createGlobalTheme = createGlobalTheme;
      exports.createGlobalThemeContract = createGlobalThemeContract;
      exports.createTheme = createTheme;
      exports.createThemeContract = createThemeContract;
      exports.createVar = createVar;
      exports.fallbackVar = fallbackVar;
      exports.fontFace = fontFace;
      exports.generateIdentifier = generateIdentifier;
      exports.globalFontFace = globalFontFace;
      exports.globalKeyframes = globalKeyframes;
      exports.globalStyle = globalStyle;
      exports.keyframes = keyframes;
      exports.style = style2;
      exports.styleVariants = styleVariants;
    }
  });

  // src/styles/index.ts
  var import_css = __toESM(require_vanilla_extract_css_browser_cjs());
  var myStyle = (0, import_css.style)({
    padding: 10,
    marginTop: 25,
    flexGrow: 1,
    opacity: 0.5
  });
  var styles_default = { myStyle };
})();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! @license MediaQueryParser - MIT License - Tom Golden (github@tbjgolden.com) */
/*! https://mths.be/cssesc v3.0.0 by @mathias */
