js-particles-factory
js-particles-factory is a JavaScript library designed to create and animate particles on an HTML canvas element. This library allows you to customize particles with various shapes, sizes, and behaviors, and provides interactive and visually appealing effects for web applications.

Features
Customizable Particles: Define shapes (circle, square, rhombus, hexagon, triangle), sizes, and colors.
Collision Detection: Particles can interact with each other and respond to collisions.
Responsive Design: Adjusts to window resizing and fullscreen modes.
Mouse Interaction: Particles react to mouse movements.
Flexible Animation Controls: Start, stop, and adjust particle animation settings.
Installation
You can install js-particles-factory via npm:

```js
npm install js-particles-factory
```
Alternatively, include it directly in your HTML with a script tag:

![My animated logo](testHTML.svg)

Usage

Basic Setup
Create an HTML Canvas Element

```html
<canvas id="particles-canvas"></canvas>
```


Initialize the Particle System

```js
import { ParticlesFactory } from 'js-particles-factory';

// minimal initialisation with all default settings
// requires a canvas with the exact id "particles-canvas"
const particles = new ParticlesFactory();

const particles = new ParticlesFactory({
  canvas: { id: 'particles-canvas', width: 800, height: 600 },
  main: {
    frameRate: 30,
    numParticles: 100,
    speed: 0.5,
    fillStyle: '#000',
    isFullScreen: true
  },
  particles: {
    shape: 'circle',
    fillStyle: '#ff0000',
    randomSize: true,
    stroke: true,
    size: 20,
    opacity: 0.8
  },
  lines: {
    connectDistance: 100,
    strokeStyle: '#ffffff',
    draw: true,
    lineWidth: 1,
    opacity: 0.5
  }
});
```


API
ParticlesFactory
Constructor:

```js
new ParticlesFactory(options)
```
options: Configuration object for the particle system.
The above passed objects shows the defaultSettings.
Methods:

setFillMode(mode)
Set the fill mode for particles. Modes: "noFill", "random", "fill".

setSpeed(newSpeed)
Update the speed of particles.

setNumParticles(newValue)
Set the number of particles in the system.

setBaseSize(newBaseSize)
Update the base size of particles.

toggleFullScreen()
Toggle fullscreen mode.

toggleAnimation()
Start or stop the animation.

Particle
Constructor:

javascript
Code kopieren
new Particle(canvas, x, y, size, speed, fillStyle)
canvas: The canvas element.
x: X-coordinate of the particle.
y: Y-coordinate of the particle.
size: Size (diameter) of the particle.
speed: Movement speed of the particle.
fillStyle: Color of the particle.
Methods:

drawParticle(fillColor, opacity, size, shape, strokeStyle)
Draw the particle on the canvas.

keepInBoundaries(drawParticles)
Ensure the particle stays within the canvas boundaries.

particlesCollision(isRandomSize, commonSize, particle, otherParticle, distance)
Handle collisions between particles.

updateCoords(drawParticles)
Update the particle’s coordinates.

updateSpeed(speed)
Update the particle’s speed.

handleMouseMove(event, mouseDistance, canvasX, canvasY)
Handle the particle's behavior when the mouse moves nearby.

Configuration Options
Canvas
id: ID of the canvas element.
width: Width of the canvas.
height: Height of the canvas.
Main
frameRate: Animation frame rate.
numParticles: Number of particles to generate.
speed: Base speed of particles.
mouseDistance: Distance within which particles react to the mouse.
fillStyle: Background color of the canvas.
isFullScreen: Toggle fullscreen mode.
isResponsive: Adjust canvas size on window resize.
Particles
shape: Shape of the particles.
fillStyle: Base color of particles.
randomFill: Whether particles have random colors.
noFill: Whether particles are transparent.
stroke: Whether particles have a stroke.
size: Base size of particles.
randomSize: Whether particles have random sizes.
draw: Whether to draw particles.
collision: Whether to detect collisions.
opacity: Opacity of particles.
Lines
connectDistance: Distance within which lines are drawn between particles.
strokeStyle: Color of the lines.
draw: Whether to draw lines.
lineWidth: Width of the lines.
opacity: Opacity of the lines.
Contributing
Contributions are welcome! Please submit issues or pull requests via GitHub. For more information on how to contribute, see CONTRIBUTING.md.

License
This project is licensed under the MIT License - see the LICENSE file for details.
