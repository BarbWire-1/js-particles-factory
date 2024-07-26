import { ParticlesFactory } from './minified/particles-factory.es.js'; //- using cdn instead
//init with defaults
const test = new ParticlesFactory();

// TESTING IMAGES
setTimeout(rotateImages, 5000);

function rotateImages() {
	test.particles.shape = "image";
	test.particles.size = 80;
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
		triangleConfiguration();
	}, 5000 * num - 1);

	updateImageAndColor();
}


//set to any other configuration
function triangleConfiguration() {
	test.particles.shape = "triangle";
	test.particles.fillStyle = test.main.fillStyle;
	test.lines.strokeStyle = '#ffffff';
	test.particles.collision = false;
	test.setSpeed(2)// baseSpeed
	test.setFillMode('fill') // common fil
}