import Customer from '../../models/customer';

export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';

export const fetchCustomers = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://rn-complete-guide-9c5ee-default-rtdb.europe-west1.firebasedatabase.app/customer.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedCustomers = [];

      for (const key in resData) {        
        loadedCustomers.push(
          new Customer(
            key,
            resData[key].firstName,
            resData[key].lastName,
            resData[key].address1,
            resData[key].address2,
            resData[key].mobileNo,
            resData[key].jarPrice,
            resData[key].capsulePrice
          )
        );
      }

      dispatch({ type: SET_CUSTOMERS, customers: loadedCustomers });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteCustomer = custId => {
  return async dispatch => {
    await fetch(
      `https://rn-complete-guide-9c5ee-default-rtdb.europe-west1.firebasedatabase.app/customer/${custId}.json`,
      {
        method: 'DELETE'
      }
    );
    dispatch({ type: DELETE_CUSTOMER, custId: custId });
  };
};

export const createCustomer = (firstName, lastName, address1, address2, mobileNo, jarPrice, capsulePrice) => {
  
  return async dispatch => {
    // any async code you want!
    const response = await fetch(
      'https://rn-complete-guide-9c5ee-default-rtdb.europe-west1.firebasedatabase.app/customer.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            address1,
            address2,
            mobileNo,
            jarPrice,
            capsulePrice
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_CUSTOMER,
      customerData: {
        id: resData.name,
        firstName,
        lastName,
        address1,
        address2,
        mobileNo,
        jarPrice,
        capsulePrice
      }
    });
  };
};


export const updateCustomer = (custId, firstName, lastName, address1, address2, mobileNo, jarPrice, capsulePrice) => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide-9c5ee-default-rtdb.europe-west1.firebasedatabase.app/customer/${custId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            address1,
            address2,
            mobileNo,
            jarPrice,
            capsulePrice
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_CUSTOMER,
      custId: custId,
      customerData: {
        firstName,
        lastName,
        address1,
        address2,
        mobileNo,
        jarPrice,
        capsulePrice
      }
    });
  };
};