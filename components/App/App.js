import { StackNavigator } from 'react-navigation';
import Device from '../Device';
import Scanner from '../Scanner';
import SmartConfig from '../SmartConfig';
import DeviceList from '../DeviceList';

const App = StackNavigator({
  DeviceList: { screen: DeviceList },
  Device: { screen: Device },
  Scanner: { screen: Scanner },
  SmartConfig: { screen: SmartConfig },
});

export default App;
