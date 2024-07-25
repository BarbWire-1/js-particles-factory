import { ParticlesFactory } from './src/ParticlesFactory.js'; //- using cdn instead
const test = new ParticlesFactory({
	particles: {
		shape: 'image',
		opacity: 1,
		size: 80
	},
	lines: {
		strokeStyle: "white",
		lineWidth: .5,
		opacity: 1

	}
});
// TESTING IMAGES
let i = 0;
let imageSwitchInterval;

function rotateImages() {
	const rotations = {
		'smiley': 'yellow',
		'sunflower': 'limegreen',
		'snowflake': 'lightblue',
		'smiley2': 'red',
		'ghosty': 'orange',
		'tongue': 'white',
		'monster': 'pink'
	};

	const names = Object.keys(rotations);
	let i = 0;
	const num = names.length;
	function updateImageAndColor() {
		const name = names[ i ];
		const newImageSrc = `assets/images/${name}.png`;
		const newColor = rotations[ name ];

		test.setImageSrc(newImageSrc);
		test.lines.strokeStyle = newColor;

		i = (i + 1) % num;
	}

	const imageSwitchInterval = setInterval(updateImageAndColor, 5000);

	setTimeout(() => {
		clearInterval(imageSwitchInterval);
		console.log("stopped img rotation");
	}, 5000 * num - 1);

	updateImageAndColor();
}

rotateImages();
test.particles.shape="triangle"