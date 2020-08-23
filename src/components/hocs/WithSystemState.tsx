import React from "react";
import {
  SystemState,
  RegisterState,
  AccountState,
  ProductState,
  ProfileState,
} from "../../store/system/types";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import {
  updateToken,
  handleRegister,
  updateAccount,
  updateSetupScreen,
  updateProduct,
  updatePaymentInfo,
  updateBusinessType,
} from "../../store/system/actions";
import { Subtract } from "utility-types";
import { AppState } from "../../store";

export interface InjectedSystemStateProps {
  systemState: SystemState;
  registerState: RegisterState;
  accountState: AccountState;
  productState: ProductState;
  profileState: ProfileState;
  updateToken: (token: string) => void;
  removeToken: () => void;
  handleRegister: (data: any) => void;
  updateAccount: (account: any) => void;
  updateSetupScreen: (screen: number) => void;
  updateProduct: (data: any) => void;
  updatePaymentInfo: (data: any) => void;
  updateBusinessType: (types: any) => void;
}

const withSystemStateFunc = <P extends InjectedSystemStateProps>(
  Component: React.ComponentType<P>
) =>
  class WithSystemState extends React.Component<P, any> {
    render() {
      return (
        <Component
          {...(this.props as P)}
          updateToken={this.props.updateToken}
          removeToken={this.props.removeToken}
          systemState={this.props.systemState}
          registerState={this.props.registerState}
          profileState={this.props.profileState}
          handleRegister={this.props.handleRegister}
          accountState={this.props.accountState}
          productState={this.props.productState}
          updateAccount={this.props.updateAccount}
          updateSetupScreen={this.props.updateSetupScreen}
          updateProduct={this.props.updateProduct}
          updatePaymentInfo={this.props.updatePaymentInfo}
          updateBusinessType={this.props.updateBusinessType}
        />
      );
    }
  };

const mapStateToProps = (state: AppState) => {
  return {
    systemState: { ...state.system },
    registerState: { ...state.register },
    accountState: { ...state.account },
    productState: { ...state.product },
    profileState: { ...state.profile },
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateToken: (token: string) => {
      dispatch(updateToken(token));
    },
    removeToken: () => {
      dispatch(updateToken(""));
    },
    handleRegister: (data: any) => {
      dispatch(handleRegister(data));
    },
    updateAccount: (account: any) => {
      dispatch(updateAccount(account));
    },
    updateSetupScreen: (screen: number) => {
      dispatch(updateSetupScreen(screen));
    },
    updateProduct: (data: any) => {
      dispatch(updateProduct(data));
    },
    updatePaymentInfo: (data: any) => {
      dispatch(updatePaymentInfo(data));
    },
    updateBusinessType: (types: any) => {
      dispatch(updateBusinessType(types));
    },
  };
};

const withSystemState = <P extends InjectedSystemStateProps>(
  Component: React.ComponentType<P>
) => {
  let composed = compose<
    React.ComponentType<Subtract<P, InjectedSystemStateProps>>
  >(connect(mapStateToProps, mapDispatchToProps), withSystemStateFunc);
  return composed(Component);
};

export default withSystemState;
