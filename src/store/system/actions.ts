import {
  UPDATE_SYSTEM_TOKEN,
  SystemActionTypes,
  REGISTER_ADMIN,
  RegisterTypes,
  UPDATE_ACCOUNT,
  AccountActionTyes,
  UPDATE_SETUP_SCREEN,
  UPDATE_PRODUCT,
  UPDATE_PAYMENT_INFO,
  UPDATE_BUSINESS_TYPE,
  ProfileTypes,
  ProductTypes,
} from "./types";

export function updateBusinessType(types: any): ProfileTypes {
  return {
    type: UPDATE_BUSINESS_TYPE,
    payload: types,
  };
}
export function updatePaymentInfo(data: any): ProductTypes {
  return {
    type: UPDATE_PAYMENT_INFO,
    payload: data,
  };
}

export function updateProduct(data: any): ProductTypes {
  return {
    type: UPDATE_PRODUCT,
    payload: data,
  };
}
export function updateSetupScreen(screen: number): SystemActionTypes {
  return {
    type: UPDATE_SETUP_SCREEN,
    payload: screen,
  };
}

export function updateAccount(account: any): AccountActionTyes {
  return {
    type: UPDATE_ACCOUNT,
    payload: account,
  };
}

export function updateToken(newToken: string): SystemActionTypes {
  return {
    type: UPDATE_SYSTEM_TOKEN,
    payload: newToken,
  };
}

export function handleRegister(data: any): RegisterTypes {
  return {
    type: REGISTER_ADMIN,
    payload: data,
  };
}
