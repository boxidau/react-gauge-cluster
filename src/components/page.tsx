import React, { Component } from 'react';
import {ClusterItemConfig} from '../config';
import Sparkline from './sparklineGauge';
import RadialGaugeBase from './radialGaugeBase';

interface Props {
  items: Array<ClusterItemConfig>,
}

export default class Page extends Component<Props> {

  render() {
    const gaugeComponents = this.props.items.map((cfg, idx) => {
      switch(cfg.type) {
        case 'sparkline':
          return <Sparkline key={idx} {...cfg} />;
        case 'radial':
          return <RadialGaugeBase key={idx} {...cfg}/>
      }
      return null;
    });

    return (
      <div>
        {gaugeComponents}
      </div>
    );
  }

}
