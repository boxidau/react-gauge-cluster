import React, { Component } from 'react';
import logo from './logo.svg';
import './GaugeCluster.css';
import config from './config.json';
import ReconnectingWebSocket from 'reconnecting-websocket';
const Gauge = require('react-radial-gauge');

interface State {
  data: {[key: string]: number};
  connected: boolean;
}

class App extends Component<{}, State> {
  state = {
    data: {},
    connected: false,
  } as State;

  socket: ReconnectingWebSocket | null = null;

  componentDidMount() {
    this.socket = new ReconnectingWebSocket(config.websocketURI);
    this.socket.onopen = ev => this.setState({connected: true});
    this.socket.onclose = ev => this.setState({connected: false});
    this.socket.onmessage = message => this.setState(
      {data: JSON.parse(message.data)}
    );
  }

  render() {

    if (!this.state.connected) {
      return (
        <div className="GaugeCluster">
          Connecting to {config.websocketURI}
        </div>
      );
    }

    return (
      <div className="GaugeCluster">
        <Gauge currentValue={this.state.data['tps'] || 0} />
      </div>
    );
  }
}

export default App;
