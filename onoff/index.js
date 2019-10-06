const Express = require("express");
const RGB = require("./rgb.js");

const app = Express();
const LED = {"red":RGB.red, "yellow": RGB.yellow, "green": RGB.green}

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
	res.render("index");	
});

app.get("/status/:led", function(req, res) {
	let c = req.params.led
	if(LED[c]) {
		RGB.glowp(LED[c], 1000)
		.then(_=>res.send(`status LED ${c} ${Math.random()}`))
	} else {
		res.send("no such LED");
	}
});

app.get("/blink/:led", function(req, res) {
	let c = req.params.led
	if(LED[c]) {
		RGB.blinkp(LED[c], 5, 200, 1000)
		.then(_=>res.send(`blink LED ${c} ${Math.random()}`))
	} else {
		res.send("no such LED");
	}
});

app.listen(3000,"0.0.0.0", function() {console.log("running on port 3000")});
