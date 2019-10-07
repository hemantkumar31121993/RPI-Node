import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LEDStatus from './LED-status'
import LEDBlink from './LED-blink'
import * as serviceWorker from './serviceWorker';

import {Card} from 'primereact/card'
import {Panel} from 'primereact/panel';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

ReactDOM.render(
    <div className="p-grid" style={{width: "1100px", position: "relative", margin: "10px auto"}}>
        <div className="p-col">
            <Card title="Red LED" className="ui-card-shadow">
                <LEDStatus led="red"></LEDStatus>
                <LEDBlink led="red"></LEDBlink>
            </Card>
        </div>

        <div className="p-col">
            <Card title="Yellow LED" className="ui-card-shadow">
                <LEDStatus led="yellow"></LEDStatus>
                <LEDBlink led="yellow"></LEDBlink>
            </Card>
        </div>
        
        <div className="p-col">
            <Card title="Green LED" className="ui-card-shadow">
                <LEDStatus led="green"></LEDStatus>
                <LEDBlink led="green"></LEDBlink>
            </Card>
        </div>
    </div>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
