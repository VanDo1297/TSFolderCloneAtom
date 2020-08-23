import React from "react";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../components/hocs/WithSystemState";
import Spinner from "react-bootstrap/Spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CardEntryForm from "../components/misc/CardEntryForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import config from "../config/config";
import "../sass/pages/CardsPage.scss";

//#region Apdater + State
import CardPageState from './State/CardState';

//#endregion
interface CardsPageBaseProps {
  productId: string;
  price: any;
  totalPayment: number;
  bill: any;
  numberLocation: number;
}

type CardsPageProps = CardsPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps &
  RouteComponentProps;

class CardsPage extends React.Component<CardsPageProps, CardPageState> {
  state = {
    userCards: [],
    loading: false,
    enteringCard: false,
    updatingCard: null,
    paymentInfo: [],
  };

  componentDidMount(): void {
    this.loadCards();
  }
  componentWillMount(): void {
    if (this.props.productState.paymentInfo.length > 0) {
      this.setState({
        paymentInfo: this.props.productState.paymentInfo,
      });
    }
  }

  loadCards = () => {
    this.setState({
      loading: false,
      enteringCard: false,
    });
  };

  paymentHandler = (paymentMethod: stripe.PaymentMethodResponse) => {
    if (
      this.state.updatingCard !== null &&
      this.state.updatingCard !== undefined
    ) {
      this.setState({ updatingCard: null });
      this.loadCards();
    } else {
      if (paymentMethod.paymentMethod && paymentMethod.paymentMethod.id) {
        const data = {
          cardID: undefined,
          newCard: {
            paymentMethodID: paymentMethod.paymentMethod.id,
            save: true
          },
          priceUnid: this.props.price.unid,
          productUnid: this.props.productId,
        };
        console.log(data);
        this.props.history.push({
          pathname: "/onboarding/atom-store/checkout",
          state: {
            totalPayment: this.props.totalPayment,
            data: data,
            bill: this.props.bill,
            price: this.props.price,
            numberLocation: this.props.numberLocation,
          },
        });
      }
    }
  };

  onCardUpdate = (card: any) => {
    this.setState({ updatingCard: card, enteringCard: true });
  };

  updatePaymentInfo = (data: any) => {
    this.props.updatePaymentInfo(data);
  };
  getPageContent = () => {
    return (
      <>
        <StripeProvider apiKey={config.stripe.key}>
          <Elements>
            <CardEntryForm
              paymentInfo={this.state.paymentInfo}
              history={this.props.history}
              paymentHandler={this.paymentHandler}
              existingCard={this.state.updatingCard}
              exitingCardUpdateHandler={""}
              onCancel={() => {
                this.setState({ enteringCard: false, updatingCard: null });
              }}
              updatePaymentInfo={this.updatePaymentInfo}
            />
          </Elements>
        </StripeProvider>
      </>
    );
  };

  render() {
    return (
      <div className="mt-5 d-flex align-items-center flex-column">
        <p className="d-block text-description mb-5">
          <span>You will be billed on the 4th of every month for your </span>
          <br />
          <span>quarterly plan. You my cancel any time with no fees.</span>
        </p>
        {this.getPageContent()}
      </div>
    );
  }
}

export default withSystemState(
  withApiHandler(withRouter(CardsPage), ErrorHandler.TOAST)
);
