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
import "../../../sass/pages/AddPaymentPage.scss";
import CardPage from "../../CardPage";
import { ResponsesAtomProductPrice } from '../../../api_clients/atom_client/src/api';

//#region State and Adapter
import AddPaymentState from './State/AddPaymentState';
import apiAddPayment from '../../../api-adapters/AtomAddPaymentAPIAdapter';
//#endregion

//getAtomProducts
interface AddPaymentPageBaseProps {
  history: H.History;
}

type AddPaymentPageProps = AddPaymentPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;



class AddPaymentPage extends React.Component<
  AddPaymentPageProps,
  AddPaymentState
  > {
  state = {
    price: {} as ResponsesAtomProductPrice,
    productId: "",
    totalPayment: 0,
    bill: {
      name: "",
    },
    numberLocation: 1,
    paymentInfo: [],
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      const newState = apiAddPayment.fillState(this.props.history.location.state)
      this.setState(newState);
    }
  }

  renderTitle = () => {
    return (
      <div className="add-payment-page-title my-5">
        <p className="add-payment-page-title-content">Payment</p>
      </div>
    );
  };

  renderContent = () => {
    return (
      <div className="add-payment-page-section">
        <CardPage
          productId={this.state.productId}
          price={this.state.price}
          bill={this.state.bill}
          totalPayment={this.state.totalPayment}
          numberLocation={this.state.numberLocation}
        />
      </div>
    );
  };

  render() {
    return (
      <>
        <Header color="#F3EFEB" lines></Header>
        <div className="add-payment-page">
          <div className="add-payment-page-content">
            {this.renderTitle()}
            {this.renderContent()}
          </div>
        </div>
      </>
    );
  }
}

export default withSystemState(
  withApiHandler(AddPaymentPage, ErrorHandler.TOAST)
);
