var gpio = require("pigpio").Gpio

var red = new gpio(17, {mode: gpio.OUTPUT})

var dutyCycle = 20;

red.pwmWrite(20)

setTimeout(_ => {red.pwmWrite(255)}, 3000)

