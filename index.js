import { ParticlesFactory } from './src/ParticlesFactory.js';
const test = new ParticlesFactory({ particles: { shape: 'image', imageSrc: "./public/assets/images/sunflower.png" } });

test.particles.imageSrc = "./public/assets/images/sunflower.png"
