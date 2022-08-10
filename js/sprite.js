const Sprite = function(){

	const sprites = [];
	const Sprites = {};

	const Sprite = {
		Sprites,
		sprites,
		create(values){
			const sprite = {
				alive:true,
				// local:true, //本地
				online:false, //不在线
				a:1, // alpha
				ratio:1, //单位倍数

				spriteX:0,
				spriteY:0,

				x:0,
				y:0,

				r:0,
				s:1,
				...values,
			};

			if(!sprite.w) sprite.w = values.el.width;
			if(!sprite.h) sprite.h = values.el.height;

			sprites.push(sprite);
			Sprites[sprite.name || sprites.length] = sprite;
			return sprite;
		},
		destroy(sprite) {
			sprite.alive = false;
			let index = sprites.indexOf(sprite);
			if(index !== -1){
				sprites.splice(index,1);
			}
			delete Sprites[sprite.name || index];
		},
		draw(){
			sprites.forEach(sprite=>{
				if(!Sprite.isAlive(sprite)) return;

				if(!sprite.a) return;

				ctx.globalAlpha = sprite.a;


				let sw = sprite.w * sprite.ratio;
				let sh = sprite.h * sprite.ratio;

				let x = Math.floor(sprite.x * sprite.ratio);
				let y = Math.floor(sprite.y * sprite.ratio);

				let rotate;
				let rectCenterPointX;
				let rectCenterPointY;
				if(( sprite.r || sprite.s !== 1 )){

					rotate = sprite.r * Math.PI/180;
					// console.log(sprite.r,rotate);

					rectCenterPointX = x + sw/2;
					rectCenterPointY = y + sh/2;

					ctx.translate(rectCenterPointX, rectCenterPointY);

					if(sprite.r){
						ctx.rotate(rotate);
					}
					if(sprite.s !== 1){
						ctx.scale(sprite.s,sprite.s)
					}
					ctx.translate(-rectCenterPointX, -rectCenterPointY);

				}


				ctx.drawImage(
					sprite.el,

					sprite.spriteX * sprite.ratio,
					sprite.spriteY * sprite.ratio,

					sw,
					sh,

					x,
					y,

					sw,
					sh,
				);

				ctx.globalAlpha = 1;

				if((sprite.r || sprite.s !== 1)){
					ctx.translate(rectCenterPointX, rectCenterPointY);

					if(sprite.r){
						ctx.rotate(-rotate);
					}
					if(sprite.s !== 1){
						ctx.scale(1/sprite.s,1/sprite.s)
					}
					ctx.translate(-rectCenterPointX, -rectCenterPointY);
				}
			})
		},
		run(){
			this.draw()
		},
		isAlive(sprite){
			if(!sprite.alive) return false;
			// if(!sprite.a) return false;

			return true;
		},
		haveAnimation(sprite){
			if(!sprite.animations) return false;
			if(!sprite.animations.length) return false;

			return true;
		}
	};

	// Sprite.prototype.isAlive = function(){
	// 	if(!this.alive) return false;
	// 	if(!this.a) return false;
	//
	// 	return true;
	// }

	return Sprite;
}();

