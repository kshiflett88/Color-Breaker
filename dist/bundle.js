/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorBreak; });
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./line */ "./src/line.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var COLORS = ['red', 'blue', 'purple', 'green'];

var ColorBreak = /*#__PURE__*/function () {
  function ColorBreak(canvas) {
    _classCallCheck(this, ColorBreak);

    this.ctx = canvas.getContext("2d");
    this.dimensions = {
      width: canvas.width,
      height: canvas.height
    };
    this.registerEvents();
    this.restart();
  }

  _createClass(ColorBreak, [{
    key: "animate",
    value: function animate() {
      this.line.animate(this.ctx);

      if (this.running) {
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }, {
    key: "restart",
    value: function restart() {
      this.running = false;
      this.line = new _line__WEBPACK_IMPORTED_MODULE_0__["default"](COLORS[Math.floor(Math.random() * COLORS.length)]);
      this.animate();
    }
  }, {
    key: "play",
    value: function play() {
      this.running = true;
      this.animate();
    }
  }, {
    key: "click",
    value: function click(e) {
      if (!this.running) {
        this.play();
      }
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      this.boundClickHandler = this.click.bind(this);
      this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }
  }]);

  return ColorBreak;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
console.log('yo');

var canvas = document.getElementById('game-canvas');
new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);

/***/ }),

/***/ "./src/line.js":
/*!*********************!*\
  !*** ./src/line.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LINE_CONSTANTS = {
  width: 800,
  height: 20,
  speed: 2,
  endY: 640
};

var Line = /*#__PURE__*/function () {
  function Line(color) {
    _classCallCheck(this, Line);

    this.x = 40;
    this.y = 0;
    this.dimensions = {
      width: LINE_CONSTANTS.width,
      height: LINE_CONSTANTS.height
    };
    this.color = color;
    this.endY = LINE_CONSTANTS.endY;
  }

  _createClass(Line, [{
    key: "animate",
    value: function animate(ctx) {
      this.moveLine(ctx);
      this.drawLine(ctx);
    }
  }, {
    key: "moveLine",
    value: function moveLine(ctx) {
      ctx.clearRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
      this.y = this.y + LINE_CONSTANTS.speed;
    }
  }, {
    key: "drawLine",
    value: function drawLine(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
      ctx.closePath();
    }
  }, {
    key: "bounds",
    value: function bounds() {
      return {
        left: this.x,
        right: this.x + LINE_CONSTANTS.width,
        top: this.y,
        bottom: this.y + LINE_CONSTANTS.height
      };
    }
  }, {
    key: "outOfBounds",
    value: function outOfBounds() {
      return this.y > 700;
    }
  }]);

  return Line;
}();



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map