import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a great product.',
    price: '$10.00',
    image: require('./assets/dress1.png'), // Replace with your actual image paths
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This product is even better.',
    price: '$20.00',
    image: require('./assets/dress2.png'),
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'You will love this product.',
    price: '$30.00',
    image: require('./assets/dress3.png'),
  },
  {
    id: '4',
    name: 'Product 3',
    description: 'You will love this product.',
    price: '$30.00',
    image: require('./assets/dress4.png'),
  },
  {
    id: '5',
    name: 'Product 3',
    description: 'You will love this product.',
    price: '$30.00',
    image: require('./assets/dress5.png'),
  },
  {
    id: '6',
    name: 'Product 3',
    description: 'You will love this product.',
    price: '$30.00',
    image: require('./assets/dress6.png'),
  },
  {
    id: '7',
    name: 'Product 3',
    description: 'You will love this product.',
    price: '$30.00',
    image: require('./assets/dress7.png'),
  },


];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.ourstory}>
          <Text style={styles.ourstorytext}>Our Story</Text>
          <View style={styles.ourstoryimage}>
            <Image source={require('./assets/Listview.png')} style={{ marginTop: 28, marginRight: 20 }} />
            <Image source={require('./assets/Filter.png')} style={{ marginTop: 28 }} />
          </View>
        </View>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  ourstory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ourstorytext: {
    fontSize: 24,
    fontWeight: 'light',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'sans-serif',
  },
  ourstoryimage: {
    flexDirection: 'row',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productList: {
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
