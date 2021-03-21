import {
    DELETE_CUSTOMER,
    CREATE_CUSTOMER,
    UPDATE_CUSTOMER,
    SET_CUSTOMERS
} from '../actions/customer';
import Customer from '../../models//customer';

const initialState = {
  customers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      return {
        customers: action.customers
      };
    case CREATE_CUSTOMER:
      const newCustomer = new Customer(
        action.customerData.custId,	
        action.customerData.firstName,
        action.customerData.lastName,
        action.customerData.address1,
        action.customerData.address2,
        action.customerData.mobileNo,
        action.customerData.jarPrice,
        action.customerData.capsulePrice
      );
      return {
        ...state,
        customers: state.customers.concat(newCustomer)
      };
    case UPDATE_CUSTOMER:
      const custIndex = state.customers.findIndex(
        prod => prod.custId === action.custId
      );

      const updatedCustomer = new Customer(
        action.custId,
        action.customerData.firstName,
        action.customerData.lastName,
        action.customerData.address1,
        action.customerData.address2,
        action.customerData.mobileNo,
        action.customerData.jarPrice,
        action.customerData.capsulePrice
      );
      const updatedCustomers = [...state.customers];
      updatedCustomers[custIndex] = updatedCustomer;      
      return {
        ...state,
        customers: updatedCustomers
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          cust => cust.custId !== action.custId
        )
      };
  }
  return state;
};
