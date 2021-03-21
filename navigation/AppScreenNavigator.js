import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomerListScreen, {screenOptions as CustomerListScreenOptions} from '../screens/customer/CustomerListScreen';
import EditCustomerScreen, {screenOptions as EditCustomerScreenOptions} from '../screens/customer/EditCustomerScreen';
import Colors from '../constants/Colors';

const ScreenStackNavigator = createStackNavigator();
const ScreenDrawerNavigator = createDrawerNavigator();

const CustomerNavigator = props => {
  return <ScreenStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
              <ScreenStackNavigator.Screen name="CustomerList" 
                  component={ CustomerListScreen } options={CustomerListScreenOptions} />
              <ScreenStackNavigator.Screen name="EditCustomer" 
                  component={ EditCustomerScreen } options={EditCustomerScreenOptions} />
    </ScreenStackNavigator.Navigator>;
};

const AppScreenNavigator = props => {
    return <ScreenDrawerNavigator.Navigator
                 drawerContentOptions={defaultContentOptions}>
                <ScreenStackNavigator.Screen name="Customer List" 
                    component={ CustomerNavigator } 
                    options={{
                        drawerIcon: props => (
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
                            size={23}
                            color={props.color}
                        />
                        )
                    }} /> 
      </ScreenDrawerNavigator.Navigator>;
  };

const defaultNavigationOptions = {
  headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: { fontFamily: 'open-sans-bold' }
};

const defaultContentOptions = {
    activeTintColor: Colors.primary
  };

export default AppScreenNavigator;
