/* global WebSocket */

import RNFS from 'react-native-fs';
import { WS_FLAG_URI, DEVICES_FILE_PATH } from '../config';
import FlagTypes from '../constants/FlagTypes';

let ws;

export const init = () =>
  () => {
    ws = new WebSocket(WS_FLAG_URI);
    // ws.onopen = () => {};
  };

export const requestDevices = payload => ({
  type: FlagTypes.REQUEST_DEVICES,
  ...payload,
});

export const receiveDevices = payload => ({
  type: FlagTypes.RECEIVE_DEVICES,
  ...payload,
});

export const addDevice = payload => ({
  type: FlagTypes.ADD_DEVICE,
  ...payload,
});

export const removeDevice = payload => ({
  type: FlagTypes.REMOVE_DEVICE,
  ...payload,
});

export const postDevice = payload =>
  (dispatch, getState) => {
    dispatch(requestDevices());

    dispatch(addDevice(payload));

    const { devices } = getState();

    return RNFS.writeFile(DEVICES_FILE_PATH, JSON.stringify(devices), 'utf8')
      .then(() => {
        console.log('did save:', devices);
      });
  };

export const deleteDevice = payload =>
  (dispatch, getState) => {
    dispatch(requestDevices());

    dispatch(removeDevice(payload));

    const { devices } = getState();

    return RNFS.writeFile(DEVICES_FILE_PATH, JSON.stringify(devices), 'utf8')
      .then(() => {
        console.log('did save:', devices);
      });
  };

export const fetchDevices = () =>
  (dispatch) => {
    dispatch(requestDevices());

    return RNFS.exists(DEVICES_FILE_PATH)
      .then((doesExist) => {
        if (doesExist) {
          return RNFS.readFile(DEVICES_FILE_PATH, 'utf8');
        }

        return JSON.stringify([]);
      })
      .then((result) => {
        const devices = JSON.parse(result);
        dispatch(receiveDevices({ payload: { devices } }));
      });
  };


export const down = () =>
  () => {
    ws.send('down:1');
  };

export const up = () =>
  () => {
    ws.send('up:1');
  };

export const stop = () =>
  () => {
    ws.send('stop:1');
  };

const actions = {
  requestDevices,
};

export default actions;
