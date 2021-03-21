import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import CustomerItem from "../../components/Customer/CustomerItem";
import * as customerAction from '../../store/actions/customer';
import Colors from '../../constants/Colors';

const CustomerListScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const customers = useSelector(state => state.customers.customers);
    const dispatch = useDispatch();
  
    const loadCustomers = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(customerAction.fetchCustomers());
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
      const willFocusSub = props.navigation.addListener(
        'willFocus',
        loadCustomers
      );
  
      return () => {
       // willFocusSub.remove();
      };
    }, [loadCustomers]);
  
    useEffect(() => {
      setIsLoading(true);
      loadCustomers().then(() => {
        setIsLoading(false);
      });
    }, [dispatch, loadCustomers]);
  
    useEffect(() => {
      setIsLoading(true);
      loadCustomers().then(() => {
        setIsLoading(false);
      });
    }, [dispatch, loadCustomers]);
  
    // const selectItemHandler = (id, title) => {
    //   props.navigation.navigate('ProductDetail', {
    //     productId: id,
    //     productTitle: title
    //   });
    // };
  
    if (error) {
      return (
        <View style={styles.centered}>
          <Text>An error occurred!</Text>
          <Button
            title="Try again"
            onPress={loadCustomers}
            color={Colors.primary}
          />
        </View>
      );
    }
  
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  
    if (!isLoading && customers.length === 0) {
      return (
        <View style={styles.centered}>
          <Text>No customers found. Maybe start adding some!</Text>
        </View>
      );
    }

    return (
        <FlatList data={customers} keyExtractor={item => item.custId}
            renderItem={itemData =>
                <CustomerItem
                    firstName={itemData.item.firstName}
                    lastName={itemData.item.lastName}
                    address1={itemData.item.address1}
                    address2={itemData.item.address2}
                    mobileNo={itemData.item.mobileNo}
                    onSelect={() => {
                        props.navigation.navigate('EditCustomer',
                            {
                                firstName: itemData.item.firstName,
                                custId: itemData.item.custId
                            })
                    }} />
            } />
    );
};

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default CustomerListScreen;

export const screenOptions = navData => {
    return {
        headerTitle: 'All Customer',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-person-add' : 'ios-person-add'}
                onPress={() => {
                  navData.navigation.navigate('EditCustomer', { custId: 0 });
                }}
              />
            </HeaderButtons>
          )
    };
};
