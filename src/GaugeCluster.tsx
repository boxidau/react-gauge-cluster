import React, { Component } from 'react';
import './GaugeCluster.css';
import {config} from './config';
import DataStream from './datastream';
import Page from './components/page';
const Gauge = require('react-radial-gauge');

interface State {
  data: {[key: string]: number};
  connected: boolean;
  page: string;
}

class GaugeCluster extends Component<{}, State> {
  state = {
    connected: false,
    page: 'default',
  } as State;

  componentDidMount() {
    DataStream.initialize(
      () => this.setState({connected: true}),
      () => this.setState({connected: false})
    );
  }

  _nextPage = () => {
    const pageList = Object.keys(config.pages);
    let nextPageIdx = pageList.indexOf(this.state.page) + 1;
    if (nextPageIdx >= pageList.length) {
      nextPageIdx = 0;
    }
    this.setState({page: pageList[nextPageIdx]});
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
      <div
        className="GaugeCluster"
        style={{backgroundColor: config.backgroundColor || '#000000'}}
        onClick={this._nextPage}
      >
        <div
          className="ClusterFrame"
          style={{top: config.clusterPosition.y, left: config.clusterPosition.x}}
        >
          <Page items={config.pages[this.state.page]} />
        </div>
      </div>
    );
  }
}

export default GaugeCluster;
