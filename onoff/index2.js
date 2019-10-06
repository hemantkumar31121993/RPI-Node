var gpio = require("rpi-gpio")
var gpiop = gpio.promise

gpio.setMode(gpio.MODE_RPI)

gpiop.setup(11, gpio.DIR_OUT)
	.then(() => {return gpiop.write(11, false)})
	.then(() => setTimeout(_ => gpiop.write(11, true), 2000))
	.catch((e) => console.log("Error", e))
