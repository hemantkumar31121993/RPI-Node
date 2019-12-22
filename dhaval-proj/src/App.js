import React from 'react';
import './App.css';
import GPIOComponent from './component/GPIOComponent';
import {Grid, Container,Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,Card, CardContent} from '@material-ui/core';
import Add from '@material-ui/icons/Add'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      devices:[],
      modalOpen: false,
      deviceName: null,
      gpiopin: null,
    }
    this.createNewDevice = this.createNewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.savetoLocalStorage = this.savetoLocalStorage.bind(this);
  }

  componentDidMount() {
    const devices = localStorage.getItem('devices');
    if(devices) {
      try {
        this.setState({devices: JSON.parse(devices)});
      } catch(e) {
        console.log(e);
      }
    }
  }

  openModal() {
    this.setState({modalOpen: true})
  }
  closeModal() {
    this.setState({modalOpen: false})
  }

  savetoLocalStorage() {
    const {devices} = this.state;
    console.log(devices);
    localStorage.setItem('devices', JSON.stringify(devices));
  }

  createNewDevice() {
    const {deviceName, gpiopin, devices} = this.state;
    this.setState({devices:[...devices, {name: deviceName, pin: gpiopin}]}, this.savetoLocalStorage);
    this.closeModal();
  }

  removeDevice(index) {
    return () => {
      console.log(index);
    }
  }

  render() {
    const {modalOpen, devices} = this.state;
    // console.log(this.state);
    return (
      <div>
        <Container fluid="true" style={{display:"flex", 'flexDirection':'column', padding:'2rem'}}>
          <Grid container spacing={2}>
            {devices.length === 0 && (
              <Grid item md={12}>
                <Card>
                  <CardContent>
                    no devices
                  </CardContent>
                </Card>
              </Grid>
            )}
            {devices.map((device, index) => (
              <Grid item md={6} key={index}>
                <GPIOComponent name={device.name} pin={device.pin} removeDevice={this.removeDevice(index)}></GPIOComponent>
              </Grid>
            ))}
          </Grid>
          {/* <Grid container spacing={2}>
            <Grid item md={6}>
              <GPIOComponent name={'pp'} pin={4}></GPIOComponent>
            </Grid>
            <Grid item md={6}>
              <GPIOComponent name={'qq'} pin={5}></GPIOComponent>
            </Grid>
          </Grid> */}
          <Fab style={{position:'relative', 'marginLeft':'auto','marginTop':'2rem'}} color="primary"
            onClick={this.openModal}
          >
            <Add />
          </Fab>
          <Dialog open={modalOpen} onClose={this.closeModal} fullWidth>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogContent>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <TextField variant="outlined" label="Device name" fullWidth onChange={(e) => this.setState({deviceName: e.target.value})}/>
                </Grid>
                <Grid item md={12}>
                  <TextField variant="outlined" label="GPIO Pin" fullWidth onChange={(e) => this.setState({gpiopin: e.target.value})}/>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.createNewDevice}>Create New Device</Button>
              <Button onClick={this.closeModal}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    );
  }
}

export default App;
