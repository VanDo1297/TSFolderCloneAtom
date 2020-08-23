export interface SystemState {
  token: string;
  setupScreen: number;
}
export interface RegisterState {
  registerAdmin: any;
}

export interface AccountState {
  email: string;
  password: string;
}
export interface ProductState {
  products: any;
  paymentInfo: any;
}
export interface ProfileState {
  businessType: any;
}

export const UPDATE_SYSTEM_TOKEN = "UPDATE_SYSTEM_TOKEN";
export const REGISTER_ADMIN = "REGISTER_ADMIN";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_SETUP_SCREEN = "UPDATE_SETUP_SCREEN";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_PAYMENT_INFO = "UPDATE_PAYMENT_INFO";
export const UPDATE_BUSINESS_TYPE = "UPDATE_BUSINESS_TYPE";

interface UpdateBusinessType {
  type: typeof UPDATE_BUSINESS_TYPE;
  payload: any;
}
interface UpdatePaymentStateAction {
  type: typeof UPDATE_PAYMENT_INFO;
  payload: any;
}

interface UpdatePlanStateAction {
  type: typeof UPDATE_PRODUCT;
  payload: any;
}

interface UpdateAccoutStateAction {
  type: typeof UPDATE_ACCOUNT;
  payload: any;
}
interface UpdateSystemStateAction {
  type: typeof UPDATE_SYSTEM_TOKEN;
  payload: string;
}
interface HandleRegister {
  type: typeof REGISTER_ADMIN;
  payload: any;
}

interface UpdateSetupScreen {
  type: typeof UPDATE_SETUP_SCREEN;
  payload: number;
}
export type AccountActionTyes = UpdateAccoutStateAction;
export type SystemActionTypes = UpdateSystemStateAction | UpdateSetupScreen;
export type RegisterTypes = HandleRegister;
export type ProductTypes = UpdatePlanStateAction | UpdatePaymentStateAction;
export type ProfileTypes = UpdateBusinessType;
