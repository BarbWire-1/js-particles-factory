import { ParticlesFactory } from "./ParticlesFactory.js";
//export ParticlesFactory
// minimal instantion with default settings
// requires your canvas having an id of 'particles-camvas')
const myParticles = new ParticlesFactory();

// instantion with full custom-settings
// downloaded config from https://particles-factory.netlify.app/ after having changed the settings
// const config = {
//   "canvas": {
//     "id": "particles-canvas",
//     "width": 500,
//     "height": 500
//   },
//   "main": {
//     "frameRate": 40,
//     "numParticles": 100,
//     "speed": 1,
//     "mouseDistance": 100,
//     "fillStyle": "#000",
//     "isFullScreen": true,
//     "isResponsive": true
//   },
//   "particles": {
//     "shape": "circle",
//     "fillStyle": "#ff0000",
//     "randomFill": true,
//     "noFill": false,
//     "stroke": false,
//     "size": 24,
//     "randomSize": true,
//     "draw": true,
//     "collision": true,
//     "opacity": 1
//   },
//   "lines": {
//     "connectDistance": 150,
//     "strokeStyle": "#f7f7f7",
//     "draw": true,
//     "lineWidth": 1,
//     "opacity": 0.7
//   },
//   "numParticles": 50
// }
//
// //const myParticles = new ParticlesFactory(config);
// myParticles.particles.randomSize = false;
// myParticles.particles.randomFill = false;
// myParticles.setNumParticles(10);
// myParticles.setSpeed(10);
// // IF randomsize - adjusts all randomsizes to new baseSize
// myParticles.setBaseSize(40);


//myParticles.toggleAnimation()
export default ParticlesFactory;
