import React, { Component } from 'react';
import { RadialGauge, RadialGaugeOptions } from 'canvas-gauges'
import { RadialItemConfig } from '../config';
import DataStream, { DataMap } from '../datastream';
import {sprintf} from 'voca';

interface State {
  value: number;
}

class RadialGaugeBase extends Component<RadialItemConfig> {
  gauge: RadialGauge | null = null;
  subscriptionId: string | null = null;
  options: RadialGaugeOptions;

  state = {
    value: 0
  } as State;

  constructor(props: RadialItemConfig) {
    super(props);

    const theme = RadialGaugeBase.getTheme(props);

    this.options = {
      ...theme,
      renderTo: '',
      borderShadowWidth: 0,
      borders: false,
      animationDuration: 10,
      animationRule: 'debounce',
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      needleCircleOuter: true,
      needleCircleInner: false,
      width: this.props.size,
      height: this.props.size,
      units: this.props.label || '',
      minValue: this.props.scale.min,
      maxValue: this.props.scale.max,
      majorTicks: this.props.majorTicks,
      minorTicks: this.props.minorTicks || 2,
      valueBox: this.props.valueFormatString != null,
      highlights: RadialGaugeBase.getHighlights(props),
      highlightsWidth: 10,
    }

  }

  static getHighlights(props: RadialItemConfig) {
    const highlights = [];
    if (props.warningValue != null) {
      highlights.push({
        from: props.warningValue,
        to: props.criticalValue || props.scale.max,
        color: '#efdb00',
      });
    }
    if (props.criticalValue != null) {
      highlights.push({
        from: props.criticalValue,
        to: props.scale.max,
        color: '#de1f00',
      })
    }
    return highlights;
  }

  static getTheme(props: RadialItemConfig) {
    if (props.theme == 'dark') {
      return {
        colorPlate: '#000000',
        needleShadow: false,
        colorMajorTicks: '#AAAAAA',
        colorMinorTicks: '#888888',
        colorUnits: '#999999',
        colorNumbers: '#AAAAAA'
      }
    }
    return {};
  }

  componentDidMount() {
    this.gauge = new RadialGauge(this.options).draw()
    this.subscriptionId = DataStream.subscribe(this.recieveValue);
  }

  componentWillUnmount() {
    if (this.subscriptionId != null) {
      DataStream.unsubscribe(this.subscriptionId);
    }
  }

  recieveValue = (data: DataMap) => {
    let value = 0;
    if (typeof this.props.channel === 'string') {
      value = data[this.props.channel] || 0;
    } else {
      // getter function
      value = this.props.channel(data);
    }
    this.setState({value});
  }

  render () {
    let valueText = '';
    if (this.props.valueFormatString) {
      valueText = sprintf(this.props.valueFormatString, this.state.value);
    }

    if (this.gauge != null) {
      this.gauge.update({
        ...this.options,
        value: this.state.value,
        valueText
      });
    }
    return (
      <div style={{
        position: 'absolute',
        top: this.props.position.y,
        left: this.props.position.x}}>
          <canvas ref={(canvas) => {
            if (canvas != null) {
              this.options.renderTo = canvas;
            }
          }} />
        </div>
    )
  }
}

export default RadialGaugeBase
