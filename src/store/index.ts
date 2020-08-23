import {
  systemReducer,
  registerReducer,
  accountReducer,
  productReducer,
  profileReducer,
} from "./system/reducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  system: systemReducer,
  register: registerReducer,
  account: accountReducer,
  product: productReducer,
  profile: profileReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
