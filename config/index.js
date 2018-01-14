import RNFS from 'react-native-fs';

const IP_ADDRESS = 'YOUR_IP_ADDRESS';
const PORT = '8080';

export const WS_FLAG_URI = `ws://${IP_ADDRESS}:${PORT}`;
export const DEVICES_FILE_PATH = `${RNFS.DocumentDirectoryPath}/venepe_devices.txt`;
