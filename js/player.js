const Player = function(){

	const users = [];


	return {
		users,
		create(user={}){
			user.rate = 0;
			user.animationDuration = 500;
			users.push(user);

			const sprite = Sprite.create({
				name:'player-kumiko',
				el:loadedImages[0],
				ratio:25,
				// spriteX:0,
				w:1,
				h:1,
				x:1,
				y:1,
			});

			user.sprite = sprite;

			Input.addListener('fire',()=>{

				Fire.create({
					x:sprite.x,
					y:sprite.y,
					direction: sprite.spriteY
				});
			});

			Input.addListener('change',()=>{
				let nextImageIndex = 0;
				let nowImageIndex = 3;

				if(sprite.el === loadedImages[0]){
					nextImageIndex = 3;
					nowImageIndex = 0;
				}

				const time = 200;

				Animation.sequence(sprite,[
					cb=>{
						sprite.el = loadedImages[nextImageIndex];
						setTimeout(cb,time)
					},
					cb=>{
						sprite.el = loadedImages[nowImageIndex];
						setTimeout(cb,time)
					},
					cb=>{
						sprite.el = loadedImages[nextImageIndex];
						setTimeout(cb,time)
					},
					cb=>{
						sprite.el = loadedImages[nowImageIndex];
						setTimeout(cb,time)
					},
					cb=>{
						sprite.el = loadedImages[nextImageIndex];
						setTimeout(cb,time)
					},
				]);
			});

			return user;

		},
		run(){
			users.forEach(user=>{
				const sprite = user.sprite;

				if(!Sprite.haveAnimation(sprite)){

					// sprite.spriteY = 0;
					sprite.spriteX = 0;

					if(Input.actions['up']){

						if(Map.checkPass(sprite.x,sprite.y - 1)){
							// Animation.task(sprite,'up');
							sprite.spriteY = 4;
							Animation.c(sprite,'y',-1,user.animationDuration).callback=()=>{
								// sprite.spriteY = 0;
							};
						}
					}else if(Input.actions['down']){


						if(Map.checkPass(sprite.x,sprite.y + 1)){
							sprite.spriteY = 1;
							Animation.c(sprite,'y',1,user.animationDuration).callback=()=>{
								// sprite.spriteY = 0;
							};
						}

					}else if(Input.actions['left']){


						if(Map.checkPass(sprite.x - 1,sprite.y)){
							sprite.spriteY = 3;
							Animation.c(sprite,'x',-1,user.animationDuration).callback=()=>{
								// sprite.spriteY = 0;
							};
						}
					}else if(Input.actions['right']){


						if(Map.checkPass(sprite.x + 1,sprite.y)){
							sprite.spriteY = 2;
							Animation.c(sprite,'x',1,user.animationDuration).callback=()=>{
								// sprite.spriteY = 0;
							};
						}
					}
					else if(Input.actions['test']){

						Animation.sequence(sprite,[
							['a',-.5,500/3],
							['y',1,500],
							_=>( sprite.spriteY = 3 ) && true,
							Animation.c(sprite,'x',1,500,false),
							['a',0.5,500/3],
							['y',1,500],
							['s',1,300],
							['r',60,500],
							Animation.create({
								sprite,
								name:'a',
								start:1,
								end:.5,
								time:1000,
								alive:false
							}),
							_=>( sprite.spriteY = 0 ) || true,
							['r',120,500],
							['x',2,500],
							['s',-1,300],
							['r',180,500],
							_=>( sprite.spriteY = 2 ) && true,
							['x',-1,500/3],
							['s',10,300],
							['y',3,500],
							['s',-10,300],
							['r',-360,100],
							_=>( sprite.spriteY = 1 ) && true,
							['y',-1,500/3],
							cb=>setTimeout(cb,500),
							['y',-3,500/2],
							['a',0.5,500/3],
							['x',-1,500/2],
							['y',-1,500],
							_=>confirm('继续播放么？'),
							['x',2,1000],
							_=>alert('播放结束')
						]);
					}
				}
			})
		}
	}
}();
