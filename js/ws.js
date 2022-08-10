let wsServerURi = 'ws://192.168.31.174:60912/api/?room=1';


// wsServerURi = 'ws://socket.syouzyo.org/api/';
// wsServerURi = 'ws://47.240.16.42/api/';
// wsServerURi = 'wss://lab.magiconch.com/api/';

let ws = new WebSocket(wsServerURi);

let diffFrame = 0;

ws.onmessage = (e)=>{
	console.log(/msg/,e.data);

	let data = JSON.parse(e.data);

	if(data.type === 'ani'){
		const animation = data;

		const sprite = Sprite.Sprites[animation.spriteName];

		if(!sprite) return;

		animation.frame = animation.frame - diffFrame;
		animation.sprite = sprite;
		animation.alive = true;
		Animation.input(animation);
	}else if(data.type === 'frame'){
		diffFrame = data.frame;
	}
}

ws.onerror = e=>{
	console.log(/error/,e);
}

ws.onopen = e=>{
	console.log('open',e);
}


ws.onclose = e=>{
	console.log(/close/,e);
}


const WS = {
	ws,
	send(text){
		if(ws.readyState !== 1) return;

		ws.send(text);
	},
	sendJSON(json){
		if(json.frame) json.frame = json.frame + diffFrame;
		console.log(diffFrame,json)

		WS.send(JSON.stringify(json))
	}
}
