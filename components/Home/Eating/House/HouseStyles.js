// components/Home/Eating/House/HouseStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  changeCategoryButton: {
    backgroundColor: '#f1f3f5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  changeCategoryButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  restaurantList: {
    paddingBottom: 30,
  },
  restaurantCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 2,
  },
  specialties: {
    fontSize: 14,
    color: '#868e96',
    marginTop: 6,
  },
});

export default styles;
