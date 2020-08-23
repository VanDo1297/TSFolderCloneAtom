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
import "../../../sass/pages/AtomPurchasedPage.scss";
import Button from "react-bootstrap/Button";
import atomApiClient from "../../../api_clients/atom_client/AtomApiClient";
//getAtomProducts
interface PaymentReviewPageBaseProps {
  history: H.History;
}

type PaymentReviewPageProps = PaymentReviewPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;

interface PaymentReviewPagePageState {}

class PaymentReviewPage extends React.Component<
  PaymentReviewPageProps,
  PaymentReviewPagePageState
> {
  render() {
    return (
      <>
        <Header color="#F3EFEB" opacity={1}></Header>
        <div className="atom-purchased-page ">
          <div className="w-100 h-100  atom-purchased-page-content d-flex justify-content-center align-items-center">
            <div className="atom-purchased-section d-flex flex-row bg-white">
              <div className="atom-purchased-content-left d-flex">
                <div className="atom-purchased-clap" />
                <div className="atom-purchased-text">
                  <p className="atom-purchased-text-success">Success!</p>
                  <p className="atom-purchased-sub-text-success">
                    Welcome to Atom
                  </p>
                </div>
              </div>

              <div className="atom-purchased-content-right">
                <p className="atom-purchased-right-text">
                  <span> Now, confirm your plan selection and payment</span>
                  <br />
                  <span> details. We won’t charge you until your</span>
                  <br />
                  <span> membership begins.</span>
                </p>
                <Button
                  onClick={() => {
                    this.props.history.push("/onboarding/gym");
                  }}
                  className="atom-purchased-right-button"
                >
                  Finish Setup
                </Button>
                <p
                  onClick={() => {
                    this.props.history.push("/dashboard");
                  }}
                  className="atom-purchased-right-text mt-5 text-underline pointer"
                >
                  Jump to Dashboard {'>'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withSystemState(
  withApiHandler(PaymentReviewPage, ErrorHandler.TOAST)
);
