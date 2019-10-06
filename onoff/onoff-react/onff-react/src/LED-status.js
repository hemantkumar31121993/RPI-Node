import React from 'react';

class LEDStatus extends React.Component {
	constructor() {
		super()
		this.state = {
			received: false
		}
		this.checkStatus = this.checkStatus.bind(this)
	}

	checkStatus(event) {
		let led = this.props.led
		this.setState({received: false, ok: false, error: false})
		fetch(`localhost:4000/status/${led}`)
		.then( res => {
			if(res.ok)
				this.setState({received: true, ok: true, error: false})
			else
				this.setState({received: true, ok: false, error: `could not check the status, error:${res.status}`})
		})
	}

	render() {
		<div>
			<button onClick={this.checkStatus}>Check LED {this.props.led}</button> <span> </span>
		</div>
	}
}
