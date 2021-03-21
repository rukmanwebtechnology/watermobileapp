import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppScreenNavigator from './AppScreenNavigator';

const AppNavigator = props => {
    return (<NavigationContainer>
            <AppScreenNavigator />
        </NavigationContainer>);
    };

export default AppNavigator;
    