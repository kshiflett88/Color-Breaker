# Color-Breaker
[Color Breaker](https://kshiflett88.github.io/Color-Breaker/) is a simple and fun game that is a mixture of Guitar Hero and Space Invaders. Destroy the color lines before they reach the bottom. 

## Technologies
* JavaScript
* CSS
* HTML 5

## Game Logic 
The games logic is pure JavaScript. Lines falling from the top are animated to move down the y axis of the canvas.
Using the logic of the fallings is same logic for the lines that the user sends upwards using the 'A', 'S', 'D' and 'F' keys. The color for each key is as seen on game screen, making it easy for user recall.


There are two main collision detections happening, One checks the collision of the lines and whether they are the same color and have both reached overlaped each other on the y axis. 
<img src="https://github.com/kshiflett88/Color-breaker/blob/master/read_me/gameplay.gif" width="1000" height="600">

`if (this.lineup && this.collidedWith(line, this.lineup)) {
        let shotIdx = this.shotlines.indexOf(this.lineup)
        this.removeLines(line, idx, this.lineup, shotIdx)
      }
      if (this.lineup && this.collidedWithWrongColor(line, this.lineup)) {
        let shotIdx = this.shotlines.indexOf(this.lineup)
        this.removeLineStrike(this.lineup, shotIdx)
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
  } `

The other is checking for if a falling line has reached out of bounds on the bottom of the canvas. Once 3 lines reach the bottom the game is over and you can then press the 'R' button to restart a new game.
<img src="https://github.com/kshiflett88/Color-breaker/blob/master/read_me/gameover.gif" width="1000" height="600">


For this game there are 3 different difficulty levels that determine the speed a falling line moves along the y axis. When each new difficulty is chosen the wording will change to show you what level you're on and alter the speed passed into the falling line when created. You must select a level before the game begins, you cannot try to change the speed once the game has started.
<img src="https://github.com/kshiflett88/Color-breaker/blob/master/read_me/speedchange.gif" width="1000" height="600">


  

