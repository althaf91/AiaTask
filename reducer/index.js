export const getaccount = state => state.account;

const initialState = {account: {}};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, account: action.payload};
    default:
      return state;
  }
};

export default appReducer;
