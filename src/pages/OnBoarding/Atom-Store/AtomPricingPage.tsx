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
import Button from "react-bootstrap/Button";
import "../../../sass/pages/AtomPricingPage.scss";
// import { payments } from '../../utils/helper';
import { toast } from "react-toastify";
import Loading from "../../../components/loading";
import atomApiClient from "../../../api_clients/atom_client/AtomApiClient";
import { ResponsesAtomProductPrice,ResponsesAtomProductsResponse } from '../../../api_clients/atom_client/src/api';
import { AxiosResponse } from 'axios';
//#region State and Adapter
import { PricingPageState } from './State/AtomPricingState';
import apiPricing, { AtomPricingResponse } from '../../../api-adapters/AtomPricingAPIAdapter';
import { number } from "yup";

//#endregion
interface IBill {
  id: number,
  name: string,
  base: number,
}

const Bills = [
  {
    id: 1,
    name: "Quaterly",
    base: 3,
  },
  {
    id: 2,
    name: "Monthly",
    base: 1,
  },
  {
    id: 3,
    name: "Annually",
    base: 12,
  },
];
//getAtomProducts
interface PricingPageBaseProps {
  history: H.History;
}

type PricingPageProps = PricingPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;
class PricingPage extends React.Component<
  PricingPageProps,
  PricingPageState
  > {
  state = {
    userInfo: {},
    isLoading: false,
    priceExists: {} as ResponsesAtomProductPrice,
    prices: [],
    productId: "",
    isShowPaymentModal: false,
    billFocus: {
      id: 2,
      name: "Monthly",
      base: 1,
    } as IBill,
    numberLocation: 1,
    totalPayment: 0,
    subscription: false
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.props.handleRequest(
      atomApiClient.adminsAPI.getAtomProducts(this.props.systemState.token),
      (response:  AxiosResponse<ResponsesAtomProductsResponse>) => {
        const responseData: AtomPricingResponse = response.data
        const prices = apiPricing.getPrices(responseData)
        this.setState({
          subscription: responseData.data.products[0].subscription,
          prices: prices,
          productId: responseData.data.products[0].unid,
        });
      },
      undefined,
      () => {
        this.setState({
          isLoading: false,
        });
      }
    );
    if (this.props.productState.products && this.props.productState.products.length > 0) {
      const products = this.props.productState.products;
      const newState = apiPricing.getPriceFocus({ ...this.state }, products[0])
      this.setState({
        priceExists : newState.priceExists,
        billFocus: newState.billFocus,
        numberLocation: newState.numberLocation,
        totalPayment: newState.totalPayment,
      });
    }
  }

  handleClickContinue=()=>{
    if (this.state.priceExists.unid) {
      this.props.updateProduct([
        {
          productId: this.state.productId,
          priceExists: this.state.priceExists, //ResponsesAtomPlanOutModel
          totalPayment: this.state.totalPayment,
          bill: this.state.billFocus,
          numberLocation: this.state.numberLocation,
        },
      ]);
      this.props.history.push({
        pathname: "/onboarding/atom-store/add-payment",
        state: {
          productId: this.state.productId,
          price: this.state.priceExists,
          totalPayment: this.state.totalPayment,
          bill: this.state.billFocus,
          numberLocation: this.state.numberLocation,
        },
      });
    } else {
      toast.error("Please select a product.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  handleClickProduct=(price: any)=>{
      this.setState({
        priceExists: price,
      });
      
      this.handleCalcTotal(
        price,
        this.state.numberLocation,
        this.state.billFocus.base
      );
      if(price.intervalType ==='year'){
        this.setState({
          billFocus: Bills[2]
        })
      }
  }

  handleClickLocation=(type: string)=>{
    let numberLocation = this.state.numberLocation;
    if(type ==='subtraction' && this.state.numberLocation > 1){
      numberLocation= this.state.numberLocation - 1;
    }
    if(type ==='sum' ){
      numberLocation= this.state.numberLocation + 1;
    }
    this.setState({
      numberLocation:numberLocation
    });
    this.handleCalcTotal(
      this.state.priceExists,
      numberLocation,
      this.state.billFocus.base
    );    
  }

  handleClickBill=(bill: any)=>{
    this.setState({
      billFocus: bill,
    });
    this.handleCalcTotal(
      this.state.priceExists,
      this.state.numberLocation,
      bill.base
    );
  }

  renderBillItem=(Bills: any)=>{
    return Bills.map((bill: any) => {
      return (
        <div
          onClick={this.state.priceExists.intervalType ==='year' ?()=>{}:()=> {
            this.handleClickBill(bill)
          }}
          style={{
            color : this.state.billFocus && bill.name === this.state.billFocus.name ? 'red':this.state.priceExists.intervalType ==='year' ? '#bdc3c7':'',
            }
          }
          className="atom-pricing-page-bill-item"
        >
          {bill.name}
        </div>
      );  
    })
  }

  renderTitle = () => {
    return (
      <div className="atom-pricing-page-title my-5">
        <p className="atom-pricing-page-title-content">
          Lastly, confirm payment
        </p>
        <div className="d-flex align-items-end">
          <p className="atom-pricing-page-title-info">
            Now, confirm your plan selection and payment details. We won’t
            charge you until your membnership begins.
          </p>
        </div>
      </div>
    );
  };
  renderPaymentItem = (prices: any) => {
    return prices.map((price: any, index: number) => {
      return (
        <div
          onClick={() => {
            this.handleClickProduct(price)
          }}
          key={index.toString()}
          className="d-flex align-items-center atom-pricing-page-item col-md-4 col-sm-12"
          style={
            this.state.priceExists.name === price.name
              ? {
                  border: "5px solid #FF4D35",
                  color: "#FF4D35",
                  boxShadow: "0px 24px 54px rgba(0, 0, 0, 0.25)",
                }
              : {}
          }
        >
          <div className="atom-pricing-page-name text-break text-truncate">{price.name}</div>
          <div className="atom-pricing-page-price">${price.price}</div>
          <div style={{ textAlign: "center", fontSize: "16px" }} >
            per athlete
          </div>
          <div className="atom-pricing-page-desc">
            {price.desc ||
              "Some light information about what this plan includes. Some light information about what this plan includes."}
          </div>
        </div>
      );
    });
  };
  renderContent = (prices: any) => {
    return (
      <div className="atom-pricing-page-section">
        <div className="container">
          <div className="row justify-content-center">
            {prices.length > 0 && this.renderPaymentItem(prices)}
            {prices.length === 0 && !this.state.isLoading && (
              <p>No product.</p>
            )}
          </div>       
        </div>

        <hr style={{ width: "80%"}}/>
        <div className="w-100 d-flex justify-content-center">
          <div className="atom-pricing-page-location">
            <div className="atom-pricing-page-location-text">
              <div className="number-of-location">Number of locations</div>
              <div className="number-of-location-sub-text">
                Do not include virtual locations
              </div>
            </div>
            <div
              className="item d-flex align-items-center justify-content-center mr-2 rounded-circle border border-dark"
              onClick={() => {
                this.handleClickLocation('subtraction')
              }}
            >
                -
            </div>
            <div className="atom-pricing-page-location-number d-flex align-items-center justify-content-center">
              {this.state.numberLocation}
            </div>
            <div
              className="item d-flex align-items-center justify-content-center ml-2 rounded-circle border border-dark"
              onClick={() => {
                this.handleClickLocation('sum')
              }}
            >
            +
            </div>
          </div>
        </div>

        <hr style={{ width: "80%"}}/>

        <div className="w-100 d-flex justify-content-center">
          <div className="atom-pricing-page-bill">
            <div className="atom-pricing-page-bill-text">
              Please bill me:
            </div>
            <div className="d-flex flex-row">
              {this.renderBillItem(Bills)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <div className="atom-pricing-page-footer d-flex flex-row justify-content-center align-items-center">
        <div
          onClick={() => {
            this.props.history.goBack();
          }}
          className="atom-pricing-page-footer-button-back ml-5 pointer"
        />
        <div className="atom-pricing-page-footer-button ml-auto d-flex flex-row">
          <div className="atom-pricing-page-footer-total d-flex justify-content-center flex-column">
            <div className="ml-4 atom-pricing-page-footer-text">
              ${this.state.totalPayment}
            </div>
            <div className="ml-4 atom-pricing-page-footer-text text-lowercase">
              per {this.state.billFocus.name && this.state.billFocus.name.split("ly")[0]}
            </div>
          </div>
          <div className="atom-pricing-page-footer-button-continue d-flex align-items-center p-4">
            <Button
              onClick={() => {
                this.handleClickContinue()
              }}
              className="atom-pricing-page-footer-button"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    );
  };
  handleOpenModal = () => {
    this.setState({
      isShowPaymentModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isShowPaymentModal: false,
    });
  };

  handleCalcTotal = (
    price: ResponsesAtomProductPrice,
    numberLocation: number,
    billBase: number
  ) => {
    let iPrice = price.price || 0
    let bill = billBase || 1
    let interval = price.interval || 1
    switch(price.intervalType){
      case 'day':
        this.setState({
          totalPayment: Number((iPrice / interval * 30 * numberLocation * bill).toFixed(2)),
        });
        break;
      case 'week':
        this.setState({
          totalPayment: Number((iPrice / interval * 4 * numberLocation * bill).toFixed(2)),
        });
        break;
      case 'month':
        this.setState({
          totalPayment: Number((iPrice / interval * numberLocation * bill).toFixed(2)),
        });
        break;
      case 'year':
        this.setState({
          totalPayment: Number((iPrice / interval * numberLocation).toFixed(2)),
        });
        break;
      default:
        break;
    }

  };

  render() {
    const { isLoading, prices, totalPayment } = this.state;
    return (
      <>
        <Loading isLoading={isLoading}></Loading>
        <Header color="#F3EFEB" lines></Header>
        {!isLoading && (
          <div className="atom-pricing-page">
            <div className="atom-pricing-page-content">
              {this.renderTitle()}
              {this.renderContent(prices)}
              {this.renderFooter()}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withSystemState(withApiHandler(PricingPage, ErrorHandler.TOAST));
