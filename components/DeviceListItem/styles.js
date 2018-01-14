import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 1,
    padding: 10,
    paddingLeft: 15,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
  },
});
