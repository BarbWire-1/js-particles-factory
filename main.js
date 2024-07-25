import { ParticlesFactory } from './src/ParticlesFactory.js';
const test = new ParticlesFactory({
	particles: {
		shape: 'image',
		imageSrc: "assets/images/smiley.png",
		//randomSize: false
	}
});

// TODO load the image once in factory and pass it the particleInstances in draw

test.setImageSrc("assets/images/sunflower.png");
test.setImageSrc("assets/images/snowFlake.png")

// BUT can switch
//test.particles.shape = 'triangle'

let i = 0;
let imageSwitchInterval;

function rotateImages() {
	const imageSources = [
		"assets/images/smiley.png",
		"assets/images/sunflower.png",
		"assets/images/snowFlake.png"
	];

	imageSwitchInterval = setInterval(() => {
		const newImageSrc = imageSources[ i++ % imageSources.length ];
		test.setImageSrc(newImageSrc);
	}, 5000);


	setTimeout(() => {
		clearInterval(imageSwitchInterval);
		console.log("stopped img rotation");
	}, 35000);
}

rotateImages();
