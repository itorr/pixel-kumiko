const Input = function() {

	const alias = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right',

		87: 'up',
		83: 'down',
		65: 'left',
		68: 'right',

		32: 'bomb',
		18: 'bomb',


		72: 'change',
		74:'test',
		75: 'fire',
	}
	const actions = {}
	const listeners = {}

	const isExtEvent = e => {
		return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey
	}
	const onKeyDown = (e) => {
		if (!isExtEvent(e))
			e.preventDefault();

		console.log( e.key, e.keyCode);
		actions[alias[e.keyCode] || e.keyCode] = true;

		const action = alias[e.keyCode];
		if (!action) return;

		const _listeners = listeners[action];
		if (!_listeners) return;

		_listeners.forEach(listener => listener());

	}
	const onKeyUp = (e) => {
		if (!isExtEvent(e))
			e.preventDefault();

		actions[alias[e.keyCode] || e.keyCode] = false;


	}
	const addListener = (action, callback) => {
		if (!listeners[action]) listeners[action] = [];

		listeners[action].push(callback);
	}
	const removeAllActions = () => {
		Object.keys(actions).forEach(key => {
			actions[key] = false;
		});
	}


	return {
		actions,
		addListener,
		init(){

			document.addEventListener('keydown', onKeyDown.bind(this));
			document.addEventListener('keyup', onKeyUp.bind(this));

			let startX, startY, moveEndX, moveEndY, X, Y;

			canvas.addEventListener('touchstart', e => {
				e.preventDefault();

				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;

			});

			let minPixel = 3;

			canvas.addEventListener('touchmove', e => {
				e.preventDefault();

				moveEndX = e.changedTouches[0].pageX;
				moveEndY = e.changedTouches[0].pageY;

				X = moveEndX - startX;
				Y = moveEndY - startY;

				removeAllActions();

				if (Math.abs(X) < minPixel || Math.abs(Y) < minPixel) {

				} else {
					if (Math.abs(X) > Math.abs(Y)) {
						if (X > 0) {
							actions['right'] = true;
						} else {
							actions['left'] = true;
						}
					} else {
						if (Y < 0) {
							actions['up'] = true;
						} else {
							actions['down'] = true;
						}
					}
				}


			});
			canvas.addEventListener('touchend', e => {
				e.preventDefault();

				removeAllActions();
			});

			document.addEventListener('mousedown', e=>{
				// console.log(e);
				e.clientX
				e.clientY
			});
			document.addEventListener('mouseup',e=>{

			});




			document.addEventListener('visibilitychange', removeAllActions);
			window.onblur = removeAllActions;
			return {
				actions,

			}
		},
		removeAllActions
	}
}();
