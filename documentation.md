js-particles-factory Documentation
Overview
js-particles-factory is a JavaScript library for creating particle effects in a canvas element. It provides a customizable and efficient way to animate particles with various shapes, sizes, and behaviors.

Installation
To use this library, you need to install it via npm. Assuming the package is published:

bash
Code kopieren
npm install js-particles-factory
Alternatively, you can include it directly in your HTML using a <script> tag:

html
Code kopieren
<script type="module">
  import { ParticlesFactory } from 'https://unpkg.com/js-particles-factory@1.0.2/dist/particles-factory.es.js';
  // Attach to global window object
  window.ParticlesFactory = ParticlesFactory;
</script>
Classes
Particle
The Particle class represents a single particle in the particle system.

Constructor
javascript
Code kopieren
new Particle(canvas, x, y, size, speed, fillStyle)
canvas: The canvas element where the particle is drawn.
x: The x-coordinate of the particle.
y: The y-coordinate of the particle.
size: The size (diameter) of the particle.
speed: The speed of the particle's movement.
fillStyle: The color of the particle.
Methods
drawParticle(fillColor, opacity, size, shape, strokeStyle)

Draws the particle on the canvas.

fillColor: The color to fill the particle.
opacity: The opacity of the particle.
size: The size of the particle.
shape: The shape of the particle ('circle', 'square', 'rhombus', 'hexagon', 'triangle').
strokeStyle: The stroke color of the particle (optional).
keepInBoundaries(drawParticles)

Ensures the particle stays within the canvas boundaries.

particlesCollision(isRandomSize, commonSize, particle, otherParticle, distance)

Handles the collision between particles.

updateCoords(drawParticles)

Updates the particle's coordinates based on its speed.

updateSpeed(speed)

Updates the particle's speed and direction.

handleMouseMove(event, mouseDistance, canvasX, canvasY)

Handles the particle's behavior when the mouse moves near it.

ParticlesFactory
The ParticlesFactory class manages the particle system, including the creation, updating, and rendering of particles.

Constructor
javascript
Code kopieren
new ParticlesFactory(options)
options: Configuration object to customize the particle system.
Default Configuration
javascript
Code kopieren
{
  canvas: {
    id: 'particles-canvas',
    width: 500,
    height: 500,
  },
  main: {
    frameRate: 30,
    numParticles: 80,
    speed: 0.2,
    mouseDistance: 80,
    fillStyle: '#000',
    isFullScreen: true,
    isResponsive: true,
  },
  particles: {
    shape: 'triangle',
    fillStyle: '#ff0000',
    randomFill: true,
    noFill: true,
    stroke: true,
    size: 44,
    randomSize: true,
    draw: true,
    collision: false,
    opacity: 1,
  },
  lines: {
    connectDistance: 100,
    strokeStyle: '#ffffff',
    draw: true,
    lineWidth: 0.5,
    opacity: 1,
  },
}
Methods
setFillMode(mode)

Sets the fill mode for particles. Possible modes: "noFill", "random", "fill".

setSpeed(newSpeed)

Updates the speed of the particles.

setNumParticles(newValue)

Updates the number of particles in the system.

setBaseSize(newBaseSize)

Updates the base size of the particles.

toggleFullScreen()

Toggles between fullscreen and fixed-size canvas.

toggleAnimation()

Starts or stops the particle animation.

Private Methods
#setupCanvas()

Initializes the canvas and its context.

#initListeners()

Sets up event listeners for mouse movement and window resizing.

#randomHex()

Generates a random hex color.

#randomCoords(width, height, size)

Generates random coordinates for particle placement.

#randomSize(size)

Generates a random size for particles.

#calculateDistance(x1, y1, x2, y2)

Calculates the distance between two points.

#getDistance(particle, otherParticle)

Gets the distance between two particles.

#calculateCanvasSize()

Calculates the canvas size based on screen dimensions.

#setCanvasSize(width, height)

Sets the size of the canvas.

#createParticle()

Creates a new particle with random properties.

#createParticles(count)

Creates multiple particles.

#updateCanvas()

Updates and renders the canvas.

#renderOffscreenCanvas()

Draws the offscreen canvas to the main canvas.

#drawLine(ctx, particle, otherParticle, distance)

Draws a line between two particles if within connection distance.

#handleLinesAndCollision(particle, startIndex, len)

Handles drawing lines and collisions between particles.

#throttle(func)

Throttles the execution rate of a function.

#startAnimation()

Starts the animation loop.

#stopAnimation()

Stops the animation loop.

This documentation provides an overview of the Particle and ParticlesFactory classes, their methods, and how to use them. Adjust the details as needed based on additional features or changes in your implementation.






