import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
	await imagemin(['src/assets/images/*.{jpg,png}'], {
		destination: 'dist/assets/images',
		plugins: [
			imageminWebp({quality: 80})
		]
	});
	console.log('Imágenes optimizadas');
})();