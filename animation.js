const shapes = document.querySelectorAll('.shape');
const canvas = document.querySelector('#canvas');
const svgRect = canvas.getBoundingClientRect();
const shapesArr = [];

// create a Shape class to encapsulate the shape's state and behaviour
class Shape {
	constructor(el) {
          this.el = el;
          this.x = Math.random() * (svgRect.width - el.getBBox().width);
          this.y = Math.random() * (svgRect.height - el.getBBox().height);
          this.dx = Math.random() * 2 - 1;
          this.dy = Math.random() * 2 - 1;
          this.freeze = false;
          this.updatePosition();
        }

        updatePosition() {
          this.el.setAttribute('transform', `translate(${this.x}, ${this.y})`);
        }

        move() {
          if (!this.freeze) {
            this.x += this.dx;
            this.y += this.dy;

            // check for collision with the edges of the canvas
            if (this.x < 0 || this.x + this.el.getBBox().width > svgRect.width) {
              this.dx = -this.dx;
            }
            if (this.y < 0 || this.y + this.el.getBBox().height > svgRect.height) {
              this.dy = -this.dy;
            }

            this.updatePosition();
          }
        }
}

// create a Shape object for each SVG element with the "shape" class
shapes.forEach(shape => {
        const s = new Shape(shape);
        shapesArr.push(s);
});

// set up an animation loop to move the shapes
setInterval(() => {
        shapesArr.forEach(shape => shape.move());
}, 10);

// freeze a shape on click
shapes.forEach(shape => {
        shape.addEventListener('click', () => {
          const s = shapesArr.find(s => s.el === shape);
          s.freeze = !s.freeze;
          shape.classList.toggle('frozen');
        });
});
