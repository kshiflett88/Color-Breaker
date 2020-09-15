import Line from './line'
import LineUp from './lineup'
// const Menu = require('./menu')


const COLORS = [
  'red',
  'rgb(4, 0, 255)', //blue
  'rgb(128, 0, 255)', //purple
  'rgb(4, 211, 4)' //green
]

export default class ColorBreak {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.lines = [];
    this.shotlines = [];
    this.strikes = [];
    this.speed = 1;
    this.score = 0;
    this.registerEvents();
    this.restart();
   

  }


  animate() {
    
    
    this.createLines(this.speed)
    

    this.lines.forEach((line, idx) => {
      if (idx === 0) { 
        line.animate(this.ctx)
        

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
      this.restart()
    }

    // this.drawScore();
    this.updateScore();
   
    
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  
  }

  

  restart(e) {
    if (this.gameOver && e.key === 'r') {
     e.preventDefault();
     location.reload();
     return false
      
    }
  }
  
  play() {
    this.running = true;
    this.modalEl.classList.remove('modal-on');
    this.modalEl.classList.add('modal-off')
    // this.createLines(this.speed)
    this.animate();
  }


  handlestart(e) {
    if (!this.running && e.key === ' ') {
      e.preventDefault()
      this.play();
    }
  }

  gameOver() {
    if (this.strikes.length >= 3) {
      this.gameOverEl.classList.remove('game-over-off');
      this.gameOverEl.classList.add('game-over-on');
      return true 
    }
    return false
  }
  
  shootLine(color) {
    // debugger
    this.lineup = new LineUp(color);
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

  handleMusic(e) {
    e.preventDefault()
    if (this.musicBtn.classList.contains('fa-volume-mute')) {
      this.music.play();
      this.musicBtn.classList.remove('fa-volume-mute')
      this.musicBtn.classList.add('fa-volume-up')
      
    } else if (this.musicBtn.classList.contains('fa-volume-up')) {
      this.music.pause();
      this.musicBtn.classList.remove('fa-volume-up')
      this.musicBtn.classList.add('fa-volume-mute')
      
    }

  }

  setDifficulty(e) {
    e.preventDefault()
    if (this.difficulty.classList.contains('easy')) {
      this.difficulty.classList.remove('easy')
      this.difficulty.classList.add('medium')
      this.difficulty.innerHTML = "Good Challenge"
      this.speed = 2
      console.log(this.difficulty)
    } else if (this.difficulty.classList.contains('medium')) {
      this.difficulty.classList.remove('medium')
      this.difficulty.classList.add('hard')
      this.difficulty.innerHTML = "YOU'RE INSANE!"
      this.speed = 4
      console.log(this.difficulty)
    } else if (this.difficulty.classList.contains('hard')) {
      this.difficulty.classList.remove('hard')
      this.difficulty.classList.add('easy')
      this.difficulty.innerHTML = "Welcome Back To Easy"
      this.speed = 1
      console.log(this.difficulty)
    } 
  }

  registerEvents() {
    this.modalEl = document.getElementById('modal')
    this.music = document.getElementById('music')
    this.musicBtn = document.getElementById('music-btn')
    this.level = document.getElementById('level')
    this.difficulty = document.getElementById('difficulty')
    this.scoreEl = document.getElementById('score')
    this.gameOverEl = document.getElementById('game-over')
    

    this.handleDifficulty = this.setDifficulty.bind(this);
    this.level.addEventListener('click', this.handleDifficulty)
    
    this.musicEvent = this.handleMusic.bind(this)
    this.musicBtn.addEventListener('click', this.musicEvent)
    
    this.startGameHandler = this.handlestart.bind(this);
    window.addEventListener("keydown", this.startGameHandler);

    this.restartGameHandler = this.restart.bind(this);
    window.addEventListener("keydown", this.restartGameHandler);
    
    this.keydownEvent = this.handlekey.bind(this)         
    window.addEventListener("keydown", this.keydownEvent)
  }

  updateScore(){
    if (this.scoreEl.innerHTML !== `Your Score: ${this.score}`) {
      this.scoreEl.innerHTML = `Your Score: ${this.score}`
    }
  }

  // drawScore() {
  //   //loc will be the location 
  //   const loc = { x: 730, y: 80 }
  //   this.ctx.font = "bold 40pt serif";
  //   this.ctx.fillStyle = "white";
  //   this.ctx.fillText(this.score, loc.x, loc.y);
  //   this.ctx.strokeStyle = "black";
  //   this.ctx.lineWidth = 2;
  //   this.ctx.strokeText(this.score, loc.x, loc.y);
  // }

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

  createLines(speed) {
    let line = null;
    line = this.lines.push(this.line = new Line(COLORS[Math.floor(Math.random() * COLORS.length)], speed)) 
  }


}