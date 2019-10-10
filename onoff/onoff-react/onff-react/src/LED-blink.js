import React from 'react';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Server from './server';

class LEDBlink extends React.Component {
	constructor() {
		super()
		this.state = {
			received: false,
			visible: false,
			pending: false
		}
		this.checkStatus = this.checkStatus.bind(this)
	}

	checkStatus(event) {
		let led = this.props.led
		this.setState({received: false, ok: false, error: false, pending: true})
		try {
			let controller = new AbortController();
			let signal = controller.signal;
			fetch(`${Server.address}:${Server.port}/blink/${led}`, {signal})
			.then( res => {
				if(res.ok)
					this.setState({received: true, ok: true, error: false, pending: false})
				else
					this.setState({received: true, ok: false, error: `could not blink the led, error:${res.status}`, visible: true, pending: false})
			},
			rej => {
				this.setState({received: true, ok: false, error: `action timed out, error:${rej}`, visible: true, pending: false})
			})
			setTimeout(_ => {controller.abort()}, 10000)
		} catch (e) {
			this.setState({received: true, ok: false, error: `could not blink the led, error:${e.message}`, visible: true, pending: false})
		}
	}

	render() {

		let error = ""
		let className = "p-button-secondary"
		let icon = ""
		if(!this.state.pending) {
			if(this.state.received && this.state.ok === true) { 
				switch(this.props.led) {
					case "red": className = "p-button-danger"; break;
					case "yellow": className = "p-button-warning"; break;
					case "green": className = "p-button-success"; break;
					default: break;
				}
				icon = "pi pi-check"
			} else {
				error = <Dialog header="error" modal={true} visible={this.state.visible} onHide={() => this.setState({visible: false})}>{this.state.error}</Dialog>
			}
		} else {
			icon = "pi pi-spin pi-spinner"
		}
		return(
			<span>
				<Button className={className} style={{marginLeft: "10px"}} onClick={this.checkStatus} icon={icon} label={`Blink LED`} />
				{error}
			</span>
		)
	}
}

export default LEDBlink
