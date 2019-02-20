import React, { Component } from 'react';
import { SparklineItemConfig } from '../config';
import DataStream, { DataMap } from '../datastream';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines';
import {sprintf} from 'voca';

interface State {
  values: Array<{timestamp: number, value: number}>,
}

export default class SparklineGauge extends Component<SparklineItemConfig, State> {
  labelWidth = 50;
  labelPadding = 5;
  subscriptionId: string | null = null;
  state = {
    values: []
  } as State;

  componentDidMount() {
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
    const values = this.state.values;
    values.push({timestamp: Date.now(), value});
    const clearBefore = Date.now() - this.props.history;
    this.setState({values: values.filter(v => v.timestamp >= clearBefore)});
  }

  render() {

    const sl = (
      <Sparklines
        data={this.state.values.map(v => v.value)}
        svgWidth={this.props.width - this.labelWidth - this.labelPadding}
        svgHeight={this.props.height}
        min={this.props.scale.min}
        max={this.props.scale.max}
      >
        <SparklinesLine style={{ strokeWidth: 2 }} color={this.props.color || 'red'} />
      </Sparklines>
    );

    let label = null;
    if (this.props.label != null) {
      label = (<div>{this.props.label}</div>);
    }

    let valueString = null;
    if (this.props.valueFormatString != null) {
      const lastPoint = this.state.values[this.state.values.length-1] || {value: 0};
      try {
        const formatted = sprintf(this.props.valueFormatString, lastPoint.value);
        valueString = (
          <div>{formatted}</div>
        );
      } catch(err) {
        console.error(err);
      }
    }

    let labelContainer = null;
    if (valueString != null || label != null) {
      labelContainer = (
        <div style={{
          height: this.props.height,
          width: this.labelWidth,
          textAlign: 'left',
          paddingLeft: this.labelPadding,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {label}
          {valueString}
        </div>
      );
    }

    return (
      <div style={{
        position: 'absolute',
        top: this.props.position.y,
        left: this.props.position.x}}>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          {sl}
          {labelContainer}
        </div>
      </div>
    );
  }
}
