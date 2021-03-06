export interface ItemConfigBase {
  type: string;
  // position of gauge relative to the cluster position
  position: {x: number, y: number}
  // output channel name or getter function
  channel: string | ((data: {[key: string]: number}) => number);
  label?: null | string;
  valueFormatString?: string;
}

export interface SparklineItemConfig extends ItemConfigBase {
  type: 'sparkline';
  scale: {max: number, min: number};
  width: number;
  height: number;
  history: number; // number of milliseconds worth of history to display
  color?: string;
  labelPosition?: 'left' | 'right'; // right is default
  axes?: boolean; // default is off
}

export interface RadialItemConfig extends ItemConfigBase {
  type: 'radial',
  size: number,
  scale: {max: number, min: number};
  majorTicks: Array<number>;
  minorTicks?: number;
  warningValue?: number;
  criticalValue?: number;
  theme?: 'dark' | 'light'; // light is default
}

export type ClusterItemConfig = SparklineItemConfig | RadialItemConfig;

export interface Configuration {
  websocketURI: string;

  // CSS compatible color string e.g. #000000 or 'red'
  backgroundColor: string | null;

  // Alignment of cluster relative to top left top left of screen
  clusterPosition: {x: number, y: number};

  // pages allow multiple screens of gauges
  // tapping the screen will go to the next page
  pages: {[key: string]: Array<ClusterItemConfig>};
}


export const config: Configuration = {
  websocketURI: "ws://localhost:8088",
  backgroundColor: '#000000',
  clusterPosition: {
    x: 50,
    y: 50
  },
  pages: {
    default: [
      // sparklines on the left
      {
        type: 'sparkline',
        channel: 'map',
        scale: {max: 200, min: 0},
        position: {x: 0, y: 90},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "MAP",
        valueFormatString: "%d kPa",
        labelPosition: 'right'
      },
      {
        type: 'sparkline',
        channel: 'afr1',
        scale: {max: 10, min: 20},
        position: {x: 0, y: 180},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "AFR",
        valueFormatString: "%.1f",
        labelPosition: 'right'
      },
      // big radial in the middle
      {
        type: 'radial',
        channel: 'rpm',
        size: 300,
        position: {x: 220, y: 30},
        label: '1000/min',
        scale: {max: 7000, min: 0},
        majorTicks: [0, 1, 2, 3, 4, 5, 6, 7],
        minorTicks: 4,
        warningValue: 5700,
        criticalValue: 6400,
        theme: 'dark',
      },
      // sparklines on the right
      {
        type: 'sparkline',
        channel: 'coolant',
        scale: {max: 100, min: 0},
        position: {x: 570, y: 90},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "CLT",
        valueFormatString: "%d °C",
        labelPosition: 'left'
      },
      {
        type: 'sparkline',
        channel: 'tps',
        scale: {max: 100, min: 0},
        position: {x: 570, y: 180},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "TPS",
        valueFormatString: "%d °C",
        labelPosition: 'left',
      },
    ],
  }
};
