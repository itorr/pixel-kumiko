const Fire = function(){

	let count = 0;

	return {
		create({x,y,direction}){

			if(direction === 0) return; //没方向 不能发射

			switch(direction){
				case 1: //down
					y = Math.ceil(y);
					break;
				case 2: //left
					x = Math.ceil(x);
					break;
				case 3: //right
					x = Math.floor(x);
					break;
				case 4: //up
					y = Math.floor(y);
					break;
			}

			count++;

			const fireSprite = Sprite.create({
				el:loadedImages[4],
				spriteX: Math.floor(count % 22 % 10),
				spriteY: Math.floor(count % 22 / 10),
				x:x,
				y:y,
				w:1,
				h:1,
				ratio:25
			});

			let power = Math.ceil(2 + Math.random() * 3 );
			let time = Math.ceil(100 * power);
			let c = [
				null,
				['y',power,time],//down
				['x',power,time],//left
				['x',-power,time],//right
				['y',-power,time],//up
			][direction];

			console.log(x,y,c,direction);

			Animation.sequence(fireSprite,[
				c,
				cb=>Animation.spawn(fireSprite,[
					['s',2,300],
					['a',-1,300],
				],cb),
				_=>Sprite.destroy(fireSprite)
			])


		}
	}
}();
