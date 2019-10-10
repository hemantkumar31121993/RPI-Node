var gpio = require("onoff").Gpio
var red = new gpio(17, 'out')
var yellow = new gpio(27, 'out')
var green = new gpio(22, 'out')
var button = new gpio(21, 'in', 'both')

function statusCheck(led) {
	led.writeSync(1)
	setTimeout(_=>led.writeSync(0), 1000)
}

function blink(led,time) {
	led.write(1)
	.then(setTimeout(_=>led.write(0), time))
	.catch(e => console.log(e))
}

function check() {
	setInterval(_=>blink(red,200), 400)
	setInterval(_=>blink(green,500), 1000)
	setInterval(_=>blink(yellow,350), 700)
}

function series(turn, time) {
	console.log(turn, time)
	if(turn > 0) {
		red.writeSync(1)
		setTimeout(_=> {
			red.writeSync(0)
			yellow.writeSync(1)
			setTimeout(_ => {
				yellow.writeSync(0)
				green.writeSync(1)
				setTimeout(_=> {
					green.writeSync(0)
					series(turn-1, time)
				},time)
			}, time)
		},time)
	}
}

function glowp(led, time) {
	return led.write(1)
	.then( res =>  new Promise( function(resolve){
		setTimeout(_=> {led.write(0).then(resolve())}, time)
		})
	      , rej => new Promise(function(r, q){q()}))
}

function blinkp(led, turn, time, period) {
	if(turn <= 0)
		return new Promise( (res, rej) => res())
	else
		return led.write(1)
			.then(_ => new Promise( res => { setTimeout(_=> {led.write(0).then(res())}, time)}))
			.then(_ => new Promise( res => { setTimeout(_ => {res(blinkp(led, turn-1, time, period))}, period-time) }))
}

function seriesp(turn, time) {
	console.log(turn, time)
	if(turn <= 0)
		return new Promise( (res, rej) => res() )
	else return glowp(red, time)
	.then(_ => glowp(yellow, time))
	.then(_ => glowp(green, time))
	.then(_ => seriesp(turn-1, time))
}

function run(time) {
	if(time > 32) {
		seriesp(5, time)
		.then(_ => run(time-50) )
	}
}

//blinkp(red, 5, 500, 1000)
//.then(_ => blinkp(green, 5, 500, 1000))

//glowp(red, 1000)
//.then(r => glowp(yellow, 1000))
//.then(r => glowp(green, 1000))
//.then(r => run(500))
//run(1000)
//series(20, 200)
//series(1000, 200)
//

button.watch ( function(err, val) {
	if(err) {
		throw err;
	}
	blink(red, 10, 300, 1000)
});

module.exports = {red, yellow, green, run, seriesp, glowp, blinkp}
