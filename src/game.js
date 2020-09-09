import Line from './line'

const COLORS = [
  'red',
  'blue',
  'purple',
  'green'
]

export default class ColorBreak {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  animate() {
    this.line.animate(this.ctx);

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  restart() {
    this.running = false;
    this.line = new Line(COLORS[Math.floor(Math.random() * COLORS.length)]);

    this.animate();
  }

  play() {
    this.running = true;
    this.animate();
  }

  click(e) {
    if (!this.running) {
      this.play();
    }
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }
}