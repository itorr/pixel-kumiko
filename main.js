







let canvas = document.querySelector('canvas');
let zoom = +canvas.style.zoom||2;
canvas.width = Math.floor(document.documentElement.offsetWidth / zoom);
canvas.height = Math.floor(document.documentElement.offsetHeight / zoom);

let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;






const createCanvasRect = (w=10,h=10,fillStyle = 'red')=>{
	let canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;

	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.fillStyle = fillStyle;
	ctx.fillRect(0,0,w,h);
	return canvas;
}






const loadAllImage = (images,callback)=>{
	const length = images.length;
	let i = 0;
	let loaded = 0;
	let concurrent = 3;
	const loadedImage = [];

	const _run = ()=>{
		if(i++ >= length) return;

		let el = new Image();
		loadedImage.push(el);
		el.onload = ()=>{
			if(++loaded === length) return callback(loadedImage);

			_run();
		};
		el.src = images[i-1];
	}

	while(--concurrent) _run();
}

const inputEngine = Input.init();

let startTime;
let frame = 0;
let frameTime = 1000/50;
let spriteX = 0;
let animationDuration = 500;
let iOS = /ip(od|ad|hone)/i.test(navigator.userAgent);

loadAllImage([
	'kumiko-sprite.png',
	'notice.png',
	'maps.png',
	'ayanami-sprite.png',
	'item.png',
],(loadedImages)=>{

	window.loadedImages = loadedImages;


	const kumikoPlayer = Player.create();

	// Sprite.create({
	// 	el:createCanvasRect(30,1,'#ccc2b7'),
	// 	x:1,
	// 	y:1
	// });

	const progressSprite = Sprite.create({
		name:'progress-move-sleep',
		el:loadedImages[1],//createCanvasRect(30,1,'#600'),
		spriteY:6,
		x:1,
		y:1,
		w:25,
		h:1
	});

	Map.init();


	const run = ()=>{
		requestAnimationFrame(_=>{
			run();

			ctx.clearRect(0,0,canvas.width,canvas.height);

			let nowTime = +new Date();

			frame = Math.floor( (nowTime - startTime)/frameTime);

			spriteX = Math.floor(frame / 10) % 4;

			kumikoPlayer.sprite.spriteX = spriteX;

			progressSprite.w = Math.ceil(progressSprite.el.width * (kumikoPlayer.sprite.rate || 0) );


			Animation.run();

			Map.run();

			Player.run();
			Sprite.run();
			// Input.removeAllActions();
		})
	}



	startTime = +new Date();

	run();
});
