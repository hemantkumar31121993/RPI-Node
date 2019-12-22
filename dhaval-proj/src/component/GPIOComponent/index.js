import React from 'react';
import {Card, CardHeader, CardContent, Slider, Switch, IconButton, Grid} from '@material-ui/core';
import Close from '@material-ui/icons/Close';

export default class GPIOComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _switch: true,
            slider: 32,
        }

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }

    handleSwitchChange(event) {
        const {slider} = this.state;
        const value = event.target.checked
        const {pin} = this.props;
        fetch(`http://192.168.29.164/${pin}/${value?slider/32:0}`, {mode: 'no-cors'})
        .then(() => 
        this.setState({
            _switch: value
        }));
    }

    handleSliderChange(event, value) {
        const {pin} = this.props;
        fetch(`http://192.168.29.164/${pin}/${value/32}`, {mode: 'no-cors'})
        this.setState({
            slider: value
        })
    }

    render() {
        const {name, pin, removeDevice} = this.props;
        const {slider, _switch} = this.state;
        return (
            <Card>
                <CardHeader title={name} subheader={`control the channel ${pin}`}
                    action={<IconButton onClick={removeDevice}><Close /></IconButton>}
                />
                <CardContent>
                <Grid container>
                    <Grid item md={2}>
                        <Switch color="primary" checked={_switch} onChange={this.handleSwitchChange}/>
                    </Grid>
                    <Grid item md={10}>
                        <Slider defaultValue={slider}
                            // valueLabelDisplay="auto"
                            step={32}
                            min={0}
                            max={224} 
                            onChange={this.handleSliderChange}
                            marks={[
                                {value: 0, label:'off'},
                                {value:32, label:1},
                                {value:64, label:2},
                                {value:96, label:3},
                                {value:128, label:4},
                                {value:160, label:5},
                                {value:192, label:6},
                                {value:224, label:7},
                            
                            ]}
                            disabled={!_switch}
                        />
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        );
    }
}