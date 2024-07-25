import { ParticlesFactory } from './src/ParticlesFactory.js';
const test = new ParticlesFactory({
	particles: {
		shape: 'image',
		imageSrc: "assets/images/smiley.png",
		//randomSize: false
	}
});
//TODO not updating on runtime

// hmmmm not updating on runtime...look where it sticks
// TODO load the image once in factory and pass it the particleInstances in draw
test.particles.imageSrc = ".public/assets/images/sunflower.png"
test.setImageSrc("assets/images/sunflower.png")

// BUT can switch
//test.particles.shape = 'triangle'
