import React from "react";
import * as H from "history";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../../../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../../../components/hocs/WithSystemState";
import Header from "../../../components/headers";
import "../../../sass/pages/AtomCheckoutPage.scss";
import Button from "react-bootstrap/Button";
import atomApiClient from "../../../api_clients/atom_client/AtomApiClient";
import Loading from "../../../components/loading";
import _ from 'lodash';
import { ResponsesAtomProductPrice } from '../../../api_clients/atom_client/src/api';

//#region State and Adapter
import AtomCheckoutState from './State/AtomCheckoutState';
import apiAtomCheckout from '../../../api-adapters/AtomCheckoutAPIAdapter';
//#endregion
interface AtomCheckoutPageBaseProps {
  history: H.History;
}

type AtomCheckoutPageProps = AtomCheckoutPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;



class AtomCheckoutPage extends React.Component<
  AtomCheckoutPageProps,
  AtomCheckoutState
  > {
  state = {
    totalPayment: 0,
    saleTax: 0,
    data: {},
    price: {} as ResponsesAtomProductPrice,
    bill: {
      name: "",
      base: 0,
    },
    numberLocation: 1,
    isLoading: false,
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState(apiAtomCheckout.mapStateToProps({ ...this.state }, { ...this.props.history.location.state }));
    }
  }

  renderTitle = () => {
    return (
      <div className="atom-checkout-page-title my-5">
        <p className="atom-checkout-page-title-content">Payment</p>
      </div>
    );
  };

  handleClickReview = () => {
    this.setState({
      isLoading: true,
    });
    const data = apiAtomCheckout.getCardPaymentData(this.state.data)
    this.props.handleRequest(
      atomApiClient.adminsAPI.purchaseAtomProduct(
        data,
        undefined,
        this.props.systemState.token
      ),
      (response: any) => {
        this.props.history.push({
          pathname: "/onboarding/atom-store/purchased",
        });
      },
      undefined,
      () => {
        this.setState({
          isLoading: false,
        });
      }
    );
  };

  renderContent = () => {
    return (
      <div className="atom-checkout-page-section">
        <div className="mt-5 d-flex align-items-center flex-column">
          <p className="d-block text-description pb-5">
            <span className="atom-checkout-summary">Summary</span>
            <br />
            <span>Please review the content below before you proceed.</span>
          </p>
          <div className="atom-checkout-page-form d-flex flex-column pb-5">
            <div className="d-flex flex-row justify-content-center align-items-center pb-1">
              <p className="atom-checkout-text">{this.state.price && this.state.price.name} Plan</p>
              <p className="atom-checkout-sub-total ml-auto">
                ${this.state.totalPayment}
              </p>
            </div>
            <div className="pb-4">
              <p className="atom-checkout-sub-text">
                {`Per ${this.state.bill.name}, $${
                  this.state.totalPayment
                  } billed every ${
                  this.state.bill.base * this.state.numberLocation !== 1
                    ? this.state.bill.base * this.state.numberLocation +
                    " months"
                    : this.state.bill.base * this.state.numberLocation +
                    " month"
                  }`}{" "}
                &nbsp;&nbsp;{" "}
                <span
                  onClick={() => {
                    this.props.history.push("/onboarding/atom-store/pricing");
                  }}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  change
                </span>
              </p>
            </div>
            <div className="atom-checkout-line" />
            <div className="d-flex flex-row justify-content-center align-items-center pt-4">
              <p className="atom-checkout-text"> Sales Tax</p>
              <p className="atom-checkout-sub-total ml-auto">
                {_.isNumber(this.state.saleTax) ? Number(this.state.saleTax).toFixed(2) : 0}
              </p>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center pt-5">
              <p className="atom-checkout-text">Total</p>
              <p className="atom-checkout-total ml-auto">
                {" "}
                ${_.isNumber(this.state.saleTax) ? this.state.totalPayment - this.state.saleTax : this.state.totalPayment}
              </p>
            </div>
          </div>
          <p className="mt-5 atom-checkout-desc mb-3">
            By proceeding you agree to our{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              Terms of Service
            </span>
            .
          </p>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <div className="atom-checkout-footer w-100 d-flex flex-row align-items-center justify-content-between">
        <div
          onClick={() => {
            this.props.history.push("/onboarding/atom-store/add-payment");
          }}
          className="atom-checkout-footer-button-back ml-5 pointer"
        />
        <div className="h-100 d-flex align-items-center p-4">
          <Button
            onClick={() => {
              this.handleClickReview();
            }}
            className="atom-checkout-footer-button"
          >
            Review & Pay
          </Button>
        </div>
        <div className="atom-checkout-footer-button-back ml-5 hide" />
      </div>
    );
  };

  render() {
    return (
      <>
        <Header color="#F3EFEB" lines></Header>
        <Loading isLoading={this.state.isLoading}></Loading>
        <div className="atom-checkout-page">
          <div className="atom-checkout-page-content">
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderFooter()}
          </div>
        </div>
      </>
    );
  }
}

export default withSystemState(
  withApiHandler(AtomCheckoutPage, ErrorHandler.TOAST)
);
