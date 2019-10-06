import React from 'react';

class LEDBlink extends React.Component {
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
		fetch(`http://192.168.0.109:3000/blink/${led}`)
		.then( res => {
			if(res.ok)
				this.setState({received: true, ok: true, error: false})
			else
				this.setState({received: true, ok: false, error: `could not blink the led, error:${res.status}`})
		})
	}

	render() {
		let error = ""
		if(this.state.error !== false) { 
			error = <span>{this.state.error}</span> 
		}
		return(
			<div>
				<button onClick={this.checkStatus}>Blink LED {this.props.led}</button> {error}
			</div>
		)
	}
}

export default LEDBlink