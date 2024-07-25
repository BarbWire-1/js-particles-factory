export class Particle {
	constructor (canvas, x, y, size, speed, fillStyle, imageSrc = null) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.fillStyle = fillStyle;
		this.imageSrc = imageSrc;

		if (imageSrc) {

			this.loadImage(imageSrc); // Load the image if provided
		}

		this.updateSpeed(speed);
	}

	// Load an image and store it in the particle
	// TODO move this to factory and then pass
	loadImage(src) {
		this.image = new Image();
		this.image.src = src;

		this.image.onload = () => {
			this.imageLoaded = true;
		};
		this.imageLoaded = false;
	}

	drawParticle(fillColor, opacity, size, shape, strokeStyle) {
		const ctx = this.ctx;
		strokeStyle && (ctx.strokeStyle = strokeStyle);
		ctx.globalAlpha = opacity;
		ctx.fillStyle = fillColor;
		//console.log(this.fillStyle)
		ctx.beginPath();

		switch (shape) {
			case 'circle':
				this.createCircle(ctx, size);
				break;
			case 'square':
				this.createPolygon(ctx, size, 4, -Math.PI / 4, 1, 'square');
				break;
			case 'rhombus':
				this.createPolygon(ctx, size, 4, 0, 2 / 3, 'rhombus');
				break;
			case 'hexagon':
				this.createPolygon(ctx, size, 6, 0, 1, 'hexagon');
				break;
			case 'triangle':
				this.createPolygon(ctx, size, 3, -Math.PI / 2, 1, 'triangle');
				break;
			case 'image':
				if (this.imageLoaded && this.image) {
					//console.log('should draw image')
					this.drawImage(ctx, size);
				}
				break;
			default:
				break;
		}
		ctx.fill();

		if (strokeStyle) {
			ctx.strokeStyle = strokeStyle;
			ctx.stroke();
		}
	}

	drawImage(ctx, size) {
		if (!this.image) return;

		// Draw the image centered at the particle's position
		ctx.drawImage(
			this.image,
			this.x - size / 2, // x position
			this.y - size / 2, // y position
			size, // width
			size  // height
		);
	}

	createCircle(ctx, size) {
		ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
	}

	createPolygon(ctx, size, sides, rotate, squeeze) {
		const angle = (Math.PI * 2) / sides;
		const radius = size / 2;


		ctx.moveTo(
			this.x + radius * Math.cos(rotate),
			this.y + radius * Math.sin(rotate / squeeze)
		);

		for (let i = 1; i <= sides; i++) {
			ctx.lineTo(
				this.x + radius * Math.cos(angle * i + rotate),
				this.y + radius * Math.sin(angle * i + rotate) / squeeze
			);
		}

		ctx.closePath();
	}

	keepInBoundaries(drawParticles) {
		let { x, y, size } = this;
		const { width, height } = this.canvas;

		drawParticles ? (size /= 2) : (size = 0);
		if (x <= size || x >= width - size) {
			this.x = x <= size ? size : width - size;
			this.xSpeed *= -1;
		}

		if (y <= size || y >= height - size) {
			this.y = y <= size ? size : height - size;
			this.ySpeed *= -1;
		}
	}

	particlesCollision(isRandomSize, commonSize, particle, otherParticle, distance) {
		const dist = isRandomSize ? particle.size + otherParticle.size : 2 * commonSize;

		if (Math.abs(distance) < dist / 2) {
			[ particle, otherParticle ].forEach(p => {
				for (let speed of [ 'xSpeed', 'ySpeed' ]) {
					p[ speed ] *= (p[ speed ] >= 6 ? -0.01 : -1.001);
				}
			});
		}
	}

	updateCoords(drawParticles) {
		this.size = this.size;
		this.keepInBoundaries(drawParticles);
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	updateSpeed(speed) {
		this.xSpeed = speed * (Math.random() * 2 - 1);
		this.ySpeed = speed * (Math.random() * 2 - 1);
	}

	handleMouseMove(event, mouseDistance, canvasX, canvasY) {
		if (!+mouseDistance) return;
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const { x, y } = this;

		let dx = mouseX - canvasX - x;
		let dy = mouseY - canvasY - y;

		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance && distance < mouseDistance) {
			dx /= distance;
			dy /= distance;
			const moveAmount = 2;
			this.x = x + dx * -moveAmount;
			this.y = y + dy * -moveAmount;
		}
	}
}
