# React Gauge Cluster

This project is intended to allow users to build highly customizable performant gauge clusters for use in embedded applications where webkit is available

I test this project on a Raspberry Pi running the [wpe-buildroot](https://github.com/WebPlatformForEmbedded/buildroot) environment
Data is supplied the the react gauge cluster from a websocket
[logger/streamer](https://github.com/boxidau/megasquirt_node_logger) server process
which in this case is compatible with megasquirt devices however any backend could be swapped out


## Features
- Declarative configuration in src/config.ts (no react coding experience required)
- Multiple pages of gauges is supported (click or tap to go to next page)
- Layout fully configurable to suit cropped screen installations or other tricky layout issues

## Gauge Types
- Sparkline ![Sparkline Example](https://raw.githubusercontent.com/boxidau/react-gauge-cluster/master/docs/images/sparkline_screenshot.png)
- Radial ![Radial Example](https://raw.githubusercontent.com/boxidau/react-gauge-cluster/master/docs/images/radial_screenshot.png)

## TODO
- "LED strip" AFR gauge
- "LED strip" Shift Light
- 7 segment display digits

## Websockets i.e. known issues
A websocket connection being a TCP communication mechanism is bound to run into head of line blocking issues at some point.
In this scenario messages from the backend data provider become more and more delayed as a queue of messages builds up until the front end display is essentially useless.
Running the server and client on the same device means this is less likely to be an issue, however if it becomes problematic WebRTC could potentially be used instead. File an issue or better yet a PR if you want this fixed :)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
