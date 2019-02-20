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
}

export interface RadialItemConfig extends ItemConfigBase {
  type: 'radial'
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
    x: 300,
    y: 300
  },
  pages: {
    default: [
      {
        type: 'sparkline',
        channel: 'tps',
        scale: {max: 100, min: 0},
        position: {x: 0, y: 0},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "TPS",
        valueFormatString: "%d %%"
      },
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
        valueFormatString: "%d kPa"
      },
      {
        type: 'sparkline',
        channel: 'mat',
        scale: {max: 120, min: 0},
        position: {x: 0, y: 180},
        width: 200,
        height: 70,
        history: 2000,
        color: '#00AAFF',
        label: "MAT",
        valueFormatString: "%d ℃"
      }
    ],
  }
};
