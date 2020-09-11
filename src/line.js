const LINE_CONSTANTS = {
  width: 800,
  height: 20,
  // speed: 1,
  endY: 640
}

export default class Line {
  constructor(color, speed) {
    this.x = 40;
    this.y = 0;
    this.speed = speed
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
    this.y = this.y + this.speed;
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

