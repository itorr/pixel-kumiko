const Animation = function(){
	const animations = [];
	const presets = {
		up(animation){

		}
	};
	const sendToServer = (animation)=>{
		WS.sendJSON({
			type:'ani',
			spriteName:animation.sprite.name,

			name:animation.name,
			frame:animation.frame,
			start:animation.start,
			end:animation.end,
			time:animation.time
		});
	}
	const Tasks = {
		up:{
			onBefore(animation){
				let sprite = animation.sprite;
				sprite.spriteY = 4;
			},
			c:['y',-1,500]

		}
	};

	const task = (sprite,taskName)=>{

	};

	return {
		animations,
		input(animation){
			animations.push(animation);
		},
		create(animation){
			const sprite = animation.sprite;

			if(!sprite.animations){
				sprite.animations = [];
			}

			sprite.animations.push(animation);

			if(animation.alive === undefined)
				animation.alive = true;

			if(animation.alive){
				animation.frame = frame;
				sendToServer(animation);
			}

			this.input(animation);

			// console.log(frame,sprite.name,animation)
			return animation;
		},
		c(sprite,name,change,time,alive=true){ //change
			return this.create({
				sprite,
				name,
				start:sprite[name],
				end:sprite[name] + change,
				time,
				alive
			});
		},
		task,
		sequence(sprite,cs){
			let _c;
			let cb = ()=>{
				if(cs.length){
					let c = cs.shift();
					console.log(c);

					if(c instanceof Array){
						this.c.call(this,sprite,...c).callback = cb;
					}else if(c instanceof Function){
						if(c.call(this,cb)===true) setTimeout(cb);
					}else if(c && c.sprite && !c.alive){
						c.alive = true;
						c.callback = cb;
					}
				}
			};
			cb();
		},
		spawn(sprite,cs,callback){
			let length = cs.length;
			let over = 0;
			cs.forEach(c=>{
				this.c.call(this,sprite,...c).callback=()=>{
					over++;
					if(callback && length === over){
						callback();
					}
				};
			});
		},
		destroy(sprite,animation){
			// const sprite = animation.sprite;

			sprite[animation.name] = animation.end;

			sprite.rate = 0;

			if(sprite.animations){
				let index = sprite.animations.indexOf(animation);
				if(index !== -1){
					sprite.animations.splice(index,1);
				}
			}

			let animationIndex = animations.indexOf(animation);
			if(animationIndex !== -1) {
				animations.splice(animationIndex, 1);
			}

			if(animation.callback) animation.callback.call(animation);
		},
		run(){
			animations.forEach((animation,index)=>{
				if(!animation.alive) return;

				const sprite = animation.sprite;

				// if(!Sprite.isAlive(sprite)) return;

				if(!animation.frame){
					animation.frame = frame;
					sendToServer(animation);
				}

				if(animation.frame > frame) return;

				let _frame = frame - animation.frame;

				let rate =  _frame / (animation.time / frameTime);

				if(rate >= 1){
					// 运行结束，禁止超界
					animation.rate = 1;
					sprite.rate = 1;
					sprite[animation.name] = animation.end;
					this.destroy(sprite,animation);
					return;
				}

				animation.rate = rate;
				sprite.rate = rate;


				sprite[animation.name] = animation.start + rate * (animation.end - animation.start);

			})
		}
	}
}();
