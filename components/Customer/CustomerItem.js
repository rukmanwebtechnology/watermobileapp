import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const CustomerItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.custItem}>      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.firstName} {props.lastName}</Text>
        <Text style={styles.address1}>{props.address1} {props.address2}</Text>
        <Text style={styles.address}>{props.mobileNo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  custItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  }
});

export default CustomerItem;
