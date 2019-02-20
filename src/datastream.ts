import {config} from './config';
import ReconnectingWebSocket from 'reconnecting-websocket';
import uuid from "uuid/v4";

export type DataMap = {[key: string]: number};
type DataCallback = (data: DataMap) => void

export default class DataStream {
  static messageCallbacks: Map<string, DataCallback> = new Map();

  static initialize(onConnect: () => void, onClose: () => void) {
    const socket = new ReconnectingWebSocket(config.websocketURI);
    socket.onopen = ev => onConnect();
    socket.onclose = ev => onClose();
    socket.onmessage = DataStream.handleMessage;
  }

  static subscribe(callback: DataCallback): string {
    const id = uuid();
    DataStream.messageCallbacks.set(id, callback);
    return id;
  }

  static unsubscribe(callbackId: string): void {
    DataStream.messageCallbacks.delete(callbackId);
  }

  static handleMessage(message: MessageEvent) {
    const data = JSON.parse(message.data)
    DataStream.messageCallbacks.forEach(cb => {
      cb(data);
    });
  }

}
