import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as customersActions from '../../store/actions/customer';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditCustomerScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const custId = props.route.params.custId;
  const editedCustomer = useSelector(state =>
    state.customers.customers.find(cust => cust.custId === custId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
        firstName: editedCustomer ? editedCustomer.firstName : '',
        lastName: editedCustomer ? editedCustomer.lastName : '',
        address1: editedCustomer ? editedCustomer.address1 : '',
        address2: editedCustomer ? editedCustomer.address2 : '',
        mobileNo: editedCustomer ? editedCustomer.mobileNo : '',
        jarPrice: editedCustomer ? editedCustomer.jarPrice : '',
        capsulePrice: editedCustomer ? editedCustomer.capsulePrice : ''
    },
    inputValidities: {
        firstName: editedCustomer ? true : false,
        lastName: editedCustomer ? true : false,
        address1: editedCustomer ? true : false,
        address2: editedCustomer ? true : false,
        mobileNo: editedCustomer ? true : false,
        jarPrice: editedCustomer ? true : false
    },
    formIsValid: editedCustomer ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedCustomer) {
        await dispatch(
            customersActions.updateCustomer(
            custId,
            formState.inputValues.firstName,
            formState.inputValues.lastName,
            formState.inputValues.address1,
            formState.inputValues.address2,
            formState.inputValues.mobileNo,
            +formState.inputValues.jarPrice,
            +formState.inputValues.capsulePrice
          )
        );
      } else {
        await dispatch(
            customersActions.createCustomer(
            formState.inputValues.firstName,
            formState.inputValues.lastName,
            formState.inputValues.address1,
            formState.inputValues.address2,
            formState.inputValues.mobileNo,
            +formState.inputValues.jarPrice,
            +formState.inputValues.capsulePrice
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    
  }, [dispatch, custId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={2}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="firstName"
            label="First Name *"
            errorText="Please enter a valid First Name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCustomer ? editedCustomer.firstName : ''}
            initiallyValid={!!editedCustomer}
            required
            minLength={3}
          />
          <Input
            id="lastName"
            label="Last Name"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCustomer ? editedCustomer.lastName : ''}
          />         
          <Input
            id="address1"
            label="Address Line 1"            
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={2}
            onInputChange={inputChangeHandler}
            initialValue={editedCustomer ? editedCustomer.address1 : ''}
          />
          <Input
            id="address2"
            label="Address Line 2"            
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={2}
            onInputChange={inputChangeHandler}
            initialValue={editedCustomer ? editedCustomer.address2 : ''}
          />
        <Input
              id="mobileNo"
              label="Mobile No"
              errorText="Please enter a valid Mobile No!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedCustomer ? editedCustomer.mobileNo : ''}
              required
              min={10}
            />

        <Input
              id="jarPrice"
              label="Jar Price"
              errorText="Please enter a valid jarPrice!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedCustomer ? editedCustomer.jarPrice.toString() : ''}
              required
              min={0.1}
            />
        <Input
              id="capsulePrice"
              label="Capsule Price"
              errorText="Please enter a valid capsulePrice!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedCustomer ? editedCustomer.capsulePrice.toString() : ''}
              required
              min={0.1}
            />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
    const submitFn = navData.route ? navData.route.params.submit: {};
    const custId = navData.route.params.custId;
    return {
        headerTitle: custId
            ? 'Edit Customer'
            : 'Add Customer',
        headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title="Save"
            iconName={
                Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitFn}
            />
        </HeaderButtons>
        )
      };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditCustomerScreen;
