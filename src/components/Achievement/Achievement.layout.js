import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    padding: 10,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: 100,
  },
  modal: {
    width: '90%',
    marginTop: 150,
  },
  imageBackground: {
    width: '100%',
    height: 200,
  },
  congrats: {
    textAlign: 'center',
    fontSize: 20,
  },
  cross: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default styles;
