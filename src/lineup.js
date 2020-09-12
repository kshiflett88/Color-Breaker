const LINE_CONSTANTS = {
  width: 800,
  height: 20,
  speed: 5,
  endY: 0
}

export default class LineUp {
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