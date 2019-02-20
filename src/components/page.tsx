import React, { Component } from 'react';
import {ClusterItemConfig} from '../config';
import Sparkline from './sparklineGauge';

interface Props {
  items: Array<ClusterItemConfig>,
}

export default class Page extends Component<Props> {

  render() {
    const gaugeComponents = this.props.items.map((cfg, idx) => {
      switch(cfg.type) {
        case 'sparkline':
          return <Sparkline key={idx} {...cfg} />;
      }
      console.error(`Could not render gauge item of type ${cfg.type}`);
      return null;
    });

    return (
      <div>
        {gaugeComponents}
      </div>
    );
  }

}
