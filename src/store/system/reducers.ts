import {
  UPDATE_SYSTEM_TOKEN,
  UPDATE_SETUP_SCREEN,
  SystemActionTypes,
  SystemState,
  REGISTER_ADMIN,
  RegisterTypes,
  RegisterState,
  UPDATE_ACCOUNT,
  AccountActionTyes,
  AccountState,
  UPDATE_PRODUCT,
  UPDATE_PAYMENT_INFO,
  ProductTypes,
  ProductState,
  UPDATE_BUSINESS_TYPE,
  ProfileState,
  ProfileTypes,
} from "./types";

const initialState: SystemState = {
  token: "",
  setupScreen: 1,
};
const productState: ProductState = {
  products: [],
  paymentInfo: [],
};
const registerState: RegisterState = {
  registerAdmin: {},
};
const accountState: AccountState = {
  email: "",
  password: "",
};
const profileState: ProfileState = {
  businessType: [],
};

export function productReducer(state = productState, action: ProductTypes): ProductState {
  switch (action.type) {
    case UPDATE_PRODUCT: {
      let newState = { ...state };
      newState.products = action.payload;
      return newState;
    }
    case UPDATE_PAYMENT_INFO: {
      let newState = { ...state };
      newState.paymentInfo = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case UPDATE_SETUP_SCREEN: {
      let newState = { ...state };
      newState.setupScreen = action.payload;
      return newState;
    }
    case UPDATE_SYSTEM_TOKEN: {
      let newState = { ...state };
      if (action.payload.length > 0) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
      newState.token = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

export function registerReducer(
  state = registerState,
  action: RegisterTypes
): RegisterState {
  switch (action.type) {
    case REGISTER_ADMIN: {
      let newState = { ...state };
      newState.registerAdmin = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

export function accountReducer(
  state = accountState,
  action: AccountActionTyes
): AccountState {
  switch (action.type) {
    case UPDATE_ACCOUNT: {
      let newState = { ...state };
      if (action.payload.email.length > 0) {
        localStorage.setItem("email", action.payload.email);
      } else {
        localStorage.removeItem("email");
      }
      newState.email = action.payload.email;
      newState.password = action.payload.password;
      return newState;
    }
    default:
      return state;
  }
}

export function profileReducer(
  state = profileState,
  action: ProfileTypes
): ProfileState {
  switch (action.type) {
    case UPDATE_BUSINESS_TYPE: {
      console.log(action);
      let newState = { ...state };
      newState.businessType = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
