import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LEDStatus from './LED-status'
import LEDBlink from './LED-blink'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <LEDStatus led="red"></LEDStatus>
        <LEDStatus led="yellow"></LEDStatus>
        <LEDStatus led="green"></LEDStatus>
        <LEDBlink led="red"></LEDBlink>
        <LEDBlink led="yellow"></LEDBlink>
        <LEDBlink led="green"></LEDBlink>
    </div>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
