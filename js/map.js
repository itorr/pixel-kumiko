const Map = function(){
	const canvasMap = document.createElement('canvas');
	const ctxMap = canvasMap.getContext('2d');
	ctxMap.imageSmoothingEnabled = false;


	const BitmapData = {
		0:{// 0
			pass:false,
		},
		1:{// 1
			pass:true,
		},
		10:{// 10
			pass:true,
		},
	};
	const checkPass = (x,y)=>{
		const rows = maps[y];
		if(!rows) return false;

		const point = rows[x];
		if(!point) return false;

		if(!BitmapData[point]) return false;

		return BitmapData[point].pass;
	};


	const maps = [
		[1, 1,1,1,1,1,1,1,1,0],
		[1, 1,1,1,1,1,1,1,1,0],
		[1, 0,0,1,1,1,1,1,1,0],
		[1, 1,0,1,0,1,1,1,1,0],
		[1,10,1,1,1,1,1,1,1,0],
		[1, 1,1,1,1,1,0,1,1,0],
		[1, 1,1,1,1,1,1,1,1,0],
		[1, 1,1,1,1,1,1,1,1,0],
		[1, 1,1,1,1,1,1,1,1,0],
		[0, 0,0,0,0,0,0,0,0,0],
	];
	const Map = {
		row:11,
		col:11,
		ratio:25,
		init(){
			canvasMap.width  = this.row * this.ratio;
			canvasMap.height = this.col * this.ratio;

			maps.forEach((cols,y)=>{
				cols.forEach((point,x)=>{
					let spriteX = point % 10;
					let spriteY = Math.floor( point / 10 );

					ctxMap.drawImage(
						loadedImages[2],

						spriteX * this.ratio,
						spriteY * this.ratio,

						this.ratio,
						this.ratio,

						x * this.ratio,
						y * this.ratio,

						this.ratio,
						this.ratio,
					);
				});

			});

		},
		run(){
			ctx.drawImage(canvasMap,0,0);
		},
		checkPass
	}

	return Map
}();
