
import ParticlesFactory from './ParticlesFactory';

// Ensure it gets exported in UMD build
if (typeof window !== 'undefined') {
	window.ParticlesFactory = ParticlesFactory;
}


export { ParticlesFactory };
