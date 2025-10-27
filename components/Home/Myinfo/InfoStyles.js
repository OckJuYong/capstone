import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#212529',
  },
  menuItem: {
    backgroundColor: '#f1f3f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#343a40',
  },
  logoutButton: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
