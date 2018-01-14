import FlagTypes from '../constants/FlagTypes';

const initialState = {
  devices: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FlagTypes.ADD_DEVICE:
      return { ...state,
        devices: [{
          ...action.payload.device,
        },
        ...state.devices,
        ] };
    case FlagTypes.REMOVE_DEVICE: {
      const devices = state.devices.filter(device => device.id !== action.payload.id);
      return { ...state,
        devices,
      };
    }
    case FlagTypes.REQUEST_DEVICES:
      return { ...state,
        ...action.payload,
        isLoading: true,
      };
    case FlagTypes.RECEIVE_DEVICES:
      return { ...state,
        ...action.payload,
        devices: [
          ...state.devices,
          ...action.payload.devices,
        ],
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getDevices = state => state.devices;

export default reducer;
