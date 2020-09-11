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
/* harmony import */ var _lineup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lineup */ "./src/lineup.js");


// const Menu = require('./menu')


const COLORS = [
  'red',
  'rgb(4, 0, 255)', //blue
  'rgb(128, 0, 255)', //purple
  'rgb(4, 211, 4)' //green
]

class ColorBreak {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.lines = [];
    this.shotlines = [];
    this.strikes = [];
    this.registerEvents();
    this.restart();

  }


  animate() {
    
    this.createLines();
    
    this.lines.forEach((line, idx) => {
      if (idx === 0) { 
        line.animate(this.ctx)
        
        // console.log(line)

      } else if ( this.lines[idx - 1].y - this.lines[idx].y >= 130) {
        this.lines[idx].animate(this.ctx)
      }
      
      if (line.y > 640) {
        this.removeLine(line, idx)
        this.strikes.push(idx) 
      }
      
      if (this.lineup && this.collidedWith(line, this.lineup)) {
        let shotIdx = this.shotlines.indexOf(this.lineup)
        this.removeLines(line, idx, this.lineup, shotIdx)
      }
      if (this.lineup && this.collidedWithWrongColor(line, this.lineup)) {
        let shotIdx = this.shotlines.indexOf(this.lineup)
        this.removeLineStrike(this.lineup, shotIdx)
        // this.strikes.push("1")
        // debugger
      }

    })
        
    if (this.lineup) {
      this.shotlines.forEach((shot, idx) => {
        shot.animate(this.ctx)
        if (shot.y < 0 ) {
          this.removeShot(shot, idx)
        }
      })
    }

    if (this.gameOver()) {
      this.running = false;
    }

    this.drawScore();
    
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  
  }

  restart() {
    this.running = false;
    this.score = 0
    this.animate();
  }
  
  play() {
    this.running = true;
    this.modalEl.classList.remove('modal-on');
    this.modalEl.classList.add('modal-off')
    this.animate();
  }

  // click(e) {
  //   if (!this.running) {
  //     this.play();
  //   }
  // }

  handlestart(e) {
    if (!this.running && e.key === ' ') {
      e.preventDefault()
      this.play();
    }
  }

  gameOver() {
    if (this.strikes.length >= 5) {
      return true 
    }
    return false
  }
  
  shootLine(color) {
    // debugger
    this.lineup = new _lineup__WEBPACK_IMPORTED_MODULE_1__["default"](color);
    this.shotlines.push(this.lineup)
  }
  
  handlekey(e) {
    if (e.key === 'a') {
      e.preventDefault()
      this.shootLine('red')
    } else if (e.key === 's') {
      e.preventDefault()
      this.shootLine('rgb(4, 0, 255)')
    } else if (e.key === 'd') {
      e.preventDefault()
      this.shootLine('rgb(128, 0, 255)')
    } else if (e.key === 'f') {
      e.preventDefault()
      this.shootLine('rgb(4, 211, 4)')
    }
  }

  registerEvents() {
    this.modalEl = document.getElementById('modal')
  
    this.startGameHandler = this.handlestart.bind(this);
    window.addEventListener("keydown", this.startGameHandler);
    this.keydownEvent = this.handlekey.bind(this)         
    window.addEventListener("keydown", this.keydownEvent)
  }

  drawScore() {
    //loc will be the location 
    const loc = { x: 730, y: 80 }
    this.ctx.font = "bold 50pt serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.score, loc.x, loc.y);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText(this.score, loc.x, loc.y);
  }

  collidedWith(line1, line2) {
    //check to see if falling line bottom matches shooting lines top
    if (line1.y > line2.y && line1.color !== line2.color) {
      return false
    } else if (line1.y > line2.y && line1.color === line2.color) {
      return true
    } 
  }

  collidedWithWrongColor(line1, line2) {
    //check to see if falling line bottom matches shooting lines top
    if (line1.y < line2.y) {
      return false
    } else if (line1.y >= line2.y && line1.color !== line2.color) {
      return true
    }
  }


  removeLines(line1, idx, line2, shotIdx) {
    this.ctx.clearRect(line1.x, line1.y, line1.dimensions.width, line1.dimensions.height)
    this.ctx.clearRect(line2.x, line2.y, line2.dimensions.width, line2.dimensions.height)
    this.lines.splice(idx, 1)
    this.shotlines.splice(shotIdx, 1)
    this.score += 1
  }

  removeLineStrike(line1, idx) {
    this.ctx.clearRect(line1.x, line1.y, line1.dimensions.width, line1.dimensions.height)
    this.shotlines.splice(idx, 1)
    // this.strikes.push(idx)
  }

  removeLine(line, idx) {
    this.ctx.clearRect(line.x, line.y, line.dimensions.width, line.dimensions.height)
    this.lines.splice(idx, 1)
  }

  removeShot(shot, idx) {
    this.ctx.clearRect(shot.x, shot.y, shot.dimensions.width, shot.dimensions.height)
    this.shotlines.splice(idx, 1)
  }

  createLines() {
    let line = null;
    line = this.lines.push(this.line = new _line__WEBPACK_IMPORTED_MODULE_0__["default"](COLORS[Math.floor(Math.random() * COLORS.length)])) 
  }


}

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
console.log('yo')


  const canvas = document.getElementById('game-canvas');

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
const LINE_CONSTANTS = {
  width: 800,
  height: 20,
  speed: 1,
  endY: 640
}

class Line {
  constructor(color) {
    this.x = 40;
    this.y = 0;
    this.dimensions = {
      width: LINE_CONSTANTS.width,
      height: LINE_CONSTANTS.height
    }
    this.color = color;
    this.endY = LINE_CONSTANTS.endY
  }
  
  animate(ctx) {
   this.moveLine(ctx)
   this.drawLine(ctx)
  }

  moveLine(ctx) {
    ctx.clearRect(this.x, this.y, this.dimensions.width, this.dimensions.height)
    this.y = this.y + LINE_CONSTANTS.speed;
  }

  drawLine(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height)
    ctx.closePath();
  }

  bounds() {
    return {
      left: this.x,
      right: this.x + LINE_CONSTANTS.width,
      top: this.y,
      bottom: this.y + LINE_CONSTANTS.height
    }
  }


  outOfBounds() {
    (this.y > 660)
  }


}



/***/ }),

/***/ "./src/lineup.js":
/*!***********************!*\
  !*** ./src/lineup.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LineUp; });
const LINE_CONSTANTS = {
  width: 800,
  height: 20,
  speed: 3,
  endY: 0
}

class LineUp {
  constructor(color) {
    this.x = 40;
    this.y = 620;
    this.dimensions = {
      width: LINE_CONSTANTS.width,
      height: LINE_CONSTANTS.height
    }
    this.color = color;
    this.endY = LINE_CONSTANTS.endY
  }

  animate(ctx) {
    this.moveLine(ctx)
    this.drawLine(ctx)
    
  }

  moveLine(ctx) {
    ctx.clearRect(this.x, this.y, this.dimensions.width, this.dimensions.height)
    this.y = this.y - LINE_CONSTANTS.speed;
  }

  drawLine(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height)
    ctx.closePath();
  }

  bounds() {
    return {
      left: this.x,
      right: this.x - LINE_CONSTANTS.width,
      top: this.y,
      bottom: this.y - LINE_CONSTANTS.height
    }
  }


  outOfBounds() {
    return (this.y < 0)
  }


}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map