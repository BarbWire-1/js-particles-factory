import { Particle } from './Particle.js';

//console.time('factory')
class ParticlesFactory {
	#ctx;
	#particlesObjects;
	#animationId;
	#offscreenCanvas;
	#offscreenCtx;
	#originalBaseSize;
	#throttledUpdate;

	// Default configuration
	static defaultConfig = {
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
			shape: 'triangle', // default shape
			fillStyle: '#ff0000',
			randomFill: true,
			noFill: false,
			stroke: true,
			size: 44,
			randomSize: true,
			draw: true,
			collision: false,
			opacity: 1,
			imageSrc: null, // Add imageSrc to the default config
		},
		lines: {
			connectDistance: 100,
			strokeStyle: '#ffffff',
			draw: true,
			lineWidth: 0.5,
			opacity: 1,
		},
	};

	constructor (options = { canvas: { id: 'particles-canvas' } }) {
		const defaults = ParticlesFactory.defaultConfig;
		// Merge passed options with the default config
		for (const key in defaults) {
			Object.preventExtensions(
				(this[ key ] = {
					...defaults[ key ],
					...options[ key ],
				})
			);
		}


		if (!this.particles.draw && !this.lines.draw) {
			throw new Error(
				'You need to define at least either a particles- or a lines-object to draw.'
			);
		}

		this.#particlesObjects = []; // holding all active particles' data
		this.#originalBaseSize = this.particles?.size || 2; // store the original base size

		this.#throttledUpdate = this.#throttle(this.#updateCanvas); // throttle to custom frameRate

		// -----------------------------------------------------------INITIALISATION
		this.#setupCanvas();
		this.#initListeners();
		this.#createParticles();
		this.#startAnimation();
	}

	#setupCanvas() {
		this.canvasEl = document.getElementById(this.canvas.id);
		this.#ctx = this.canvasEl.getContext('2d');
		this.#offscreenCanvas = document.createElement('canvas');
		this.#offscreenCtx = this.#offscreenCanvas.getContext('2d');

		this.getCanvasSize();
	}

	#initListeners() {
		const { x, y } = this.canvasEl.getBoundingClientRect();
		this.canvasEl.addEventListener('pointermove', (event) => {
			this.#particlesObjects.forEach((particle) => {
				particle.handleMouseMove(event, this.main.mouseDistance, x, y);
			});
		});

		window.addEventListener('resize', () => {
			if (!this.main.isFullScreen) return;
			this.getCanvasSize();
			this.#updateCanvas(); // call update to bypass throttling
		});
	}

	// -----------------------------------------------------------------------HELPERS
	#randomHex() {
		let number = (Math.random() * 0xffffff) >> 0;
		return '#' + number.toString(16).padStart(6, '0');
	}

	#randomCoords(width, height, size) {
		return {
			x: Math.random() * (width - size / 2),
			y: Math.random() * (height - size / 2),
		};
	}

	#randomSize(size) {
		return size * Math.max(0.2, Math.random());
	}

	#calculateDistance(x1, y1, x2, y2) {
		const a = x2 - x1;
		const b = y2 - y1;
		const c = Math.sqrt(a ** 2 + b ** 2);
		return c;
	}

	#getDistance(particle, otherParticle) {
		if (!particle || !otherParticle) return;
		return this.#calculateDistance(
			particle.x,
			particle.y,
			otherParticle.x,
			otherParticle.y
		);
	}

	//------------------------------------------------------------------------------CANVASSIZE
	// update particles coords in relation to screen dimensions
	getCanvasSize = () => {
		const { width, height, prevDimensions } = this.#calculateCanvasSize();
		this.#setCanvasSize(width, height);

		if (this.main.isResponsive) {
			this.#updatePosOnResize(width, height, prevDimensions);
		}
	};

	// get the canvas size depending on flags and device-dimensions
	#calculateCanvasSize() {
		const { innerWidth, innerHeight } = window;
		const isFullScreen = this.main.isFullScreen;

		const sWidth = innerWidth;
		const sHeight = innerHeight;
		const width = isFullScreen ? sWidth : this.canvas.width;
		const height = isFullScreen ? sHeight : this.canvas.height;

		const prevDimensions = {
			width: this.canvasEl.width,
			height: this.canvasEl.height,
		};

		return { width, height, prevDimensions };
	}

	#setCanvasSize(width, height) {
		this.#offscreenCanvas.width = this.canvasEl.width = width;
		this.#offscreenCanvas.height = this.canvasEl.height = height;
	}

	// -------------------------------------------------------------------PARTICLES
	#createParticle() {
		// generate individual properties for a single particle based on configuration
		const { width, height } = this.#offscreenCanvas;
		const { size, randomSize, fillStyle, randomFill, shape, draw, imageSrc } = this.particles;


		let adjustedFill = fillStyle;
		let adjustedSize = size;
		if (draw) {
			if (randomFill) adjustedFill = this.#randomHex(); // individual fill
			if (randomSize) adjustedSize = this.#randomSize(size); // individual size (relative)
		}
		const { x, y } = this.#randomCoords(width, height, size);

		// Pass imageSrc if shape is 'image'
		const particle = new Particle(
			this.#offscreenCanvas,
			x,
			y,
			adjustedSize,
			this.main.speed,
			adjustedFill,
			shape === 'image' ? imageSrc : null
		);

		return particle;
	}

	#createParticles(count = this.main.numParticles) {
		while (count) {
			this.#particlesObjects.push(this.#createParticle());
			count--;
		}
	}

	// -----------------------------------------------------------------DRAWING
	// drawing
	// not nice, but keeps all operations on particles in one loop
	#updateCanvas() {
		const len = this.main.numParticles;

		const {
			draw: drawParticles,
			collision,
			randomFill,
			noFill,
			fillStyle,
			stroke,
			opacity,
			randomSize,
			size,
			shape,
			imageSrc
		} = this.particles;

		const strokeStyle = stroke ? this.lines.strokeStyle : undefined;
		const ctx = this.#offscreenCtx;

		// draw background rectangle
		ctx.fillStyle = this.main.fillStyle;
		ctx.globalAlpha = 1;
		ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

		//UGLY to loop twice here, but need to update ALL coords first to guarantee updated coords for otherParticle > i
		this.#particlesObjects.forEach((p) => p.updateCoords(this.particles.draw));

		this.#particlesObjects.forEach((particle, i) => {
			((this.lines.draw && +this.lines.connectDistance) || collision) &&
				this.#handleLinesAndCollision(particle, i, len); // loop over otherParticle

			if (drawParticles) {
				let adjustedFillStyle = noFill
					? 'transparent'
					: randomFill
						? particle.fillStyle
						: fillStyle; // default

				particle.drawParticle(
					adjustedFillStyle,
					opacity,
					randomSize ? particle.size : size,
					shape,
					strokeStyle,
					imageSrc
				);
			}
		});

		this.#renderOffscreenCanvas();
	}

	#renderOffscreenCanvas() {
		this.#ctx.drawImage(this.#offscreenCanvas, 0, 0);
	}

	#drawLine(ctx, particle, otherParticle, distance) {
		if (!particle || !otherParticle || !this.lines?.draw) return;

		const { strokeStyle, lineWidth, opacity, connectDistance } = this.lines;
		const isCloseEnough = distance <= connectDistance;

		// set coords of connection -lines if in connectionDistance
		if (isCloseEnough) {
			const { x: x1, y: y1 } = particle;
			const { x: x2, y: y2 } = otherParticle;

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = strokeStyle;
			ctx.lineWidth = lineWidth;
			ctx.globalAlpha = opacity;
			ctx.stroke();
		}
	}

	//-------------------------------------------------------------------UPDATES
	setFillMode(mode) {
		if (mode === "noFill") {
			this.particles.noFill = true;
			this.#particlesObjects.forEach(
				(p) => (p.fillStyle = "transparent")
			);
		} else {
			this.particles.noFill = false;
			if (mode === "random") this.particles.randomFill = true;
			if (mode === "fill") {
				this.particles.randomFill = true;
				this.#particlesObjects.forEach(
					(p) => (p.fillStyle = this.particles.fillStyle)
				);
			}
		}
	}

	// update on changes
	setSpeed(newSpeed) {
		this.main.speed = newSpeed;
		this.#particlesObjects.forEach((p) => {
			p.updateSpeed(newSpeed);
		});
	}

	// update instead of recreate by getting the difference old/new
	setNumParticles(newValue) {
		newValue = Math.round(newValue);
		const currentCount = this.#particlesObjects.length;
		let difference = newValue - currentCount;

		newValue && difference && difference > 0
			? this.#addParticles(difference)
			: this.#removeParticles(currentCount, -difference);

		this.main.numParticles = currentCount + difference;
	}

	#addParticles(difference) {
		this.#createParticles(difference);
	}

	#removeParticles(currentCount, difference) {
		this.#particlesObjects.splice(currentCount - difference, difference);
		this.numParticles = this.#particlesObjects.length;
	}

	// update particles coords by maintaining prev RELATIVE position
	#updatePosOnResize(width, height, prevDimensions) {
		const dWidth = width / prevDimensions.width;
		const dHeight = height / prevDimensions.height;

		this.#particlesObjects.forEach((particle) => {
			particle.x *= dWidth;
			particle.y *= dHeight;
		});
	}

	// update randomSize relative on each particle IF randomSize
	setBaseSize(newBaseSize) {
		newBaseSize = Math.round(newBaseSize);
		const scaleFactor = newBaseSize / this.#originalBaseSize;

		this.#particlesObjects.forEach((particle) => {
			particle.size *= scaleFactor;
		});
		this.#originalBaseSize = newBaseSize;
	}

	toggleFullScreen() {
		this.main.isFullScreen = !this.main.isFullScreen;
		this.getCanvasSize();
	}

	// --------------------------------------------------------------BEHAVIOUR
	// inner loop to get otherParticle - distance
	// check for flags and recalculate/draw in case
	#handleLinesAndCollision(particle, startIndex, len) {
		for (let j = startIndex + 1; j < len; j++) {
			const otherParticle = this.#particlesObjects[ j ];
			const distance = this.#getDistance(particle, otherParticle);

			const { randomSize: isRandomSize, size: commonSize } = this.particles;

			this.lines?.draw &&
				this.#drawLine(
					this.#offscreenCtx,
					particle,
					otherParticle,
					distance
				);

			this.particles?.collision &&
				particle.particlesCollision(
					isRandomSize,
					commonSize,
					particle,
					otherParticle,
					distance
				);
		}
	}

	// ANIMATION
	// Throttle function to control the execution rate of a function
	#throttle(func) {
		let inThrottle;

		return function () {
			const context = this;
			if (!inThrottle) {
				//console.log(inThrottle, this.main.frameRate)
				func.apply(context, arguments);
				inThrottle = true;
				setTimeout(
					() => (inThrottle = false),
					1000 / this.main.frameRate
				);
			}
		};
	}

	#startAnimation() {
		this.#throttledUpdate();
		this.#animationId = requestAnimationFrame(
			this.#startAnimation.bind(this)
		);
	}

	#stopAnimation() {
		cancelAnimationFrame(this.#animationId);
		this.#animationId = null;
	}

	toggleAnimation() {
		if (this.#animationId) {
			this.#stopAnimation();
		} else {
			this.#startAnimation();
		}
	}
}

// Export for ES module usage
export default ParticlesFactory;
export { ParticlesFactory };
