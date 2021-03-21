import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyEntryScreen = props => {
    
    return (
        <View style={styles.centered}>
          <Text>
              Daily Entry List
          </Text>
        </View>        
    );
};

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },    
});

export default DailyEntryScreen;

export const screenOptions = navData => {
    return {
        headerTitle: 'Customer Daily Entry'        
    };
};
