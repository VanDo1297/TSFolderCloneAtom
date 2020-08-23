import React, { Component } from "react";
import { injectStripe, ReactStripeElements } from "react-stripe-elements";
import Spinner from "react-bootstrap/Spinner";
import "../../sass/components/CardEntryForm.scss";
// import "../../sass/common.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as yup from "yup";
import Input from "../input";
import { state as State } from "../../utils/helper";
import Grid from "@material-ui/core/Grid";

import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC,
} from "./commonTextFields";
// import { Card, CardUpdate } from "../../api_clients/bp_client/responses/Models";

import NumberFormat from "react-number-format";
interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}
function NumberFormatCustomZip(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format="#####"
    />
  );
}

interface CardEntryFormProps extends ReactStripeElements.InjectedStripeProps {
  paymentHandler?: (paymentMethod: stripe.PaymentMethodResponse, saveCard: boolean) => void;
  exitingCardUpdateHandler?: any;
  existingCard?: any | undefined;
  saveOptional?: boolean;
  onCancel?: (() => void) | null | undefined;
  history: any;
  paymentInfo: any;
  updatePaymentInfo: any;
}

interface CardEntryFormState {
  submitting: boolean;
  saveCard: boolean;

  creditCardNumberComplete: boolean;
  expirationDateComplete: boolean;
  cvcComplete: boolean;
  cardNameError: boolean;
  cardNumberError: boolean;
  expiredError: boolean;
  cvcError: boolean;
  zip: string;
  isFocusAddress1: boolean;
  isFocusAddress2: boolean;
  isFocusCity: boolean;
  isFocusState: boolean;
  isFocusZip: boolean;
  isFocusCardNumber: boolean;
  isFocusExp: boolean;
  isFocusCVC: boolean;
  paymentInfo: any;
}

const billingSchema = yup.object({
  // name: yup.string().required(),
  address_line1: yup.string().required(),
  address_line2: yup.string(),
  address_city: yup.string().required(),
  address_state: yup.string().required(),
  // address_zip: yup.string().required(),
  address_country: yup.string().required(),
});

const existingBillingSchema = yup.object({
  name: yup.string().required(),
  address_line1: yup.string().required(),
  address_line2: yup.string(),
  address_city: yup.string().required(),
  address_state: yup.string().required(),
  address_zip: yup.string().required(),
  address_country: yup.string().required(),
  exp_month: yup.number().min(1).max(12).required(),
  exp_year: yup.number().min(getThisYear()).required(),
});

function getThisYear(): number {
  let date = new Date();
  return date.getFullYear();
}

class CardEntryForm extends Component<CardEntryFormProps, CardEntryFormState> {
  state = {
    submitting: false,
    saveCard: false,

    creditCardNumberComplete: false,
    expirationDateComplete: false,
    cvcComplete: false,
    cardNameError: false,
    cardNumberError: false,
    expiredError: false,
    cvcError: false,
    zip: "",
    isFocusAddress1: false,
    isFocusAddress2: false,
    isFocusCity: false,
    isFocusState: false,
    isFocusZip: false,
    isFocusCardNumber: false,
    isFocusCVC: false,
    isFocusExp: false,
    paymentInfo: {
      address_line1: "",
      address_line2: "",
      address_city: "",
      address_state: "",
      address_country: "US",
    },
  };

  componentDidMount(): void {
    if (this.props.paymentInfo.length > 0) {
      this.setState({
        paymentInfo: this.props.paymentInfo[0],
        zip: this.props.paymentInfo[0].address_zip,
      });
    }
  }
  componentDidUpdate() {
    if (this.props.paymentInfo[0] !== this.state.paymentInfo) {
    }
  }

  submit = async (formData: any) => {
    if (!this.state.submitting) {
      this.setState({ submitting: true }, async () => {
        if (
          this.props.existingCard !== null &&
          this.props.existingCard !== undefined
        ) {
          if (
            this.props.exitingCardUpdateHandler !== null &&
            this.props.exitingCardUpdateHandler !== undefined
          ) {
            let cardUpdateData = {
              name: formData.name,
              addressLine1: formData.address_line1,
              addressLine2: formData.address_line2,
              addressCity: formData.address_city,
              addressState: formData.address_state,
              addressZip: formData.address_zip,
              addressCountry: formData.address_country,
              expMonth: formData.exp_month,
              expYear: formData.exp_year,
              // } as CardUpdate;
            };

            // this.props.exitingCardUpdateHandler(cardUpdateData);
          }
        } else {
          if (
            this.props.paymentHandler !== null &&
            this.props.paymentHandler !== undefined
          ) {
            if (this.props.stripe) {
              let options = Object.assign(formData, {
                address_zip: this.state.zip,
              });
              let payload = await this.props.stripe.createPaymentMethod('card',
                {
                  billing_details: {
                    name: options.name,
                    address :{
                      city: options.address_city,
                      line1:options.address_line1,
                      line2:options.address_line2,
                      postal_code: options.address_zip,
                      state: options.address_state,
                      country: options.address_country
                    }
                  }
                }
              );
              console.log(payload);
              if (
                !(
                  payload.error === null ||
                  payload.error === undefined
                )
              ) {
                toast.error(payload.error.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              } else {
                if (payload.paymentMethod !== undefined) {
                  let save =
                    this.props.saveOptional === true
                      ? this.state.saveCard
                      : true;
                  this.props.paymentHandler(payload, save);
                  this.props.updatePaymentInfo([options]);
                }
              }
            }
          }
        }
        this.setState({
          submitting: false,
        });
      });
    }
  };

  onCancel = () => {
    if (!(this.props.onCancel === undefined || this.props.onCancel === null)) {
      this.props.onCancel();
    }
  };

  getButtonDisplay = (): React.ReactNode => {
    if (this.state.submitting) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return <span>Continue</span>;
  };

  getCancelButton = () => {
    if (!(this.props.onCancel === null || this.props.onCancel === undefined)) {
      return (
        <Button className="cancel" variant={"danger"} onClick={this.onCancel}>
          Cancel
        </Button>
      );
    }
  };

  getInitialCardValues = () => {
    let values;
    if (Object.keys(this.state.paymentInfo).length > 0) {
      let card = this.state.paymentInfo;
      values = {
        address_line1: card.address_line1,
        address_line2: card.address_line2,
        address_city: card.address_city,
        address_state: card.address_state,
        address_country: "US",
      };
    } else {
      values = {
        address_line1: "",
        address_line2: "",
        address_city: "",
        address_state: "",
        address_country: "US",
      };
    }
    return values;
  };

  getFormSchema = () => {
    if (
      this.props.existingCard !== null &&
      this.props.existingCard !== undefined
    ) {
      return existingBillingSchema;
    } else {
      return billingSchema;
    }
  };

  getCardInputs = (
    values: FormikValues,
    errors: FormikErrors<FormikValues>,
    handleChange: any
  ) => {
    const { cardNumberError, expiredError, cvcError } = this.state;
    if (
      this.props.existingCard !== null &&
      this.props.existingCard !== undefined
    ) {
      return (
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationFormikExisting01">
            <Form.Label>Expiration Month</Form.Label>
            <Form.Control
              type="number"
              name="exp_month"
              value={values.exp_month ? values.exp_month : 0}
              onChange={handleChange}
              isInvalid={!!errors.exp_month}
            />
            <Form.Control.Feedback type="invalid">
              {errors.exp_month}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormikExisting02">
            <Form.Label>Expiration Year</Form.Label>
            <Form.Control
              type="number"
              name="exp_year"
              value={values.exp_year ? values.exp_year : 0}
              onChange={handleChange}
              isInvalid={!!errors.exp_year}
            />
            <Form.Control.Feedback type="invalid">
              {errors.exp_year}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
      );
    } else {
      return (
        <>
          <Grid style={{ paddingRight: "10px" }} container>
            <Grid item xs={6} md={6}>
              <StripeTextFieldNumber
                // placeholder='Card number'
                value="value"
                error={Boolean(cardNumberError)}
                labelErrorMessage={cardNumberError}
                handleBlur={() => {
                  this.setState({
                    isFocusCardNumber: true,
                  });
                }}
                isFocus={this.state.isFocusCardNumber}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StripeTextFieldExpiry
                // placeholder='MM/YY'
                value="value"
                error={Boolean(expiredError)}
                labelErrorMessage={expiredError}
                handleBlur={() => {
                  this.setState({
                    isFocusExp: true,
                  });
                }}
                isFocus={this.state.isFocusExp}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StripeTextFieldCVC
                // placeholder='CVC'
                value="value"
                error={Boolean(cvcError)}
                labelErrorMessage={cvcError}
                handleBlur={() => {
                  this.setState({
                    isFocusCVC: true,
                  });
                }}
                isFocus={this.state.isFocusCVC}
              />
            </Grid>
          </Grid>
        </>
      );
    }
  };

  renderFooter = (handleSubmit: any, errors: any) => {
    return (
      <div className="w-100 payment-footer d-flex flex-row justify-content-between align-items-center">
        <div
          onClick={() => {
            this.props.history.push("/onboarding/atom-store/pricing");
          }}
          className="payment-footer-button-back ml-5 pointer"
        />
        <div className="payment-footer-button d-flex justify-content-center">
          <div className="payment-footer-button-continue d-flex align-items-center">
            <Button
              onClick={() => {
                this.setState({
                  isFocusAddress1: true,
                  isFocusAddress2: true,
                  isFocusCity: true,
                  isFocusState: true,
                  isFocusZip: true,
                  isFocusCVC: true,
                  isFocusExp: true,
                  isFocusCardNumber: true,
                });
                handleSubmit();
              }}
              className="payment-footer-button"
            >
              Review & pay
            </Button>
          </div>
        </div>
        <div className="payment-footer-button-back ml-5 hide" />
      </div>
    );
  };

  render() {
    return (
      <Container className="checkout-form ">
        <Row className="w-100">
          <Col xs={12} lg={12} className="w-100 ">
            <Formik
              validationSchema={this.getFormSchema()}
              onSubmit={this.submit}
              enableReinitialize={true}
              initialValues={this.getInitialCardValues()}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form
                  className="w-100 d-flex flex-column align-items-center"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="bussiness-form ">
                    <div className="bussiness-label">Credit Card Number</div>
                    {this.getCardInputs(values, errors, handleChange)}

                    <div className="bussiness-details mt-5">
                      <span className="bussiness-label">Bussiness Address</span>
                      <div className="bussiness-address">
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationPassword"
                        >
                          <Input
                            placeholder="Address line 1"
                            type="text"
                            name="address_line1"
                            value={values.address_line1}
                            onChange={handleChange}
                            onBlur={(e: any) => {
                              handleBlur(e);
                              this.setState({
                                isFocusAddress1: true,
                              });
                            }}
                            isInvalid={
                              (!!errors.address_line1 &&
                                this.state.isFocusAddress1) ||
                              (this.state.isFocusAddress1 &&
                                values.address_line1.length === 0)
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationPassword"
                        >
                          <Input
                            placeholder="Address line 2"
                            type="text"
                            name="address_line2"
                            value={values.address_line2}
                            onChange={handleChange}
                            onBlur={(e: any) => {
                              handleBlur(e);
                              this.setState({
                                isFocusAddress2: true,
                              });
                            }}
                            isInvalid={
                              (!!errors.address_line2 &&
                                this.state.isFocusAddress2) ||
                              (this.state.isFocusAddress2 &&
                                values.address_line2.length === 0)
                            }
                          />
                        </Form.Group>
                      </div>
                      <div className="bussiness-address-code">
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationPassword"
                        >
                          <Input
                            placeholder="City"
                            type="text"
                            name="address_city"
                            value={values.address_city}
                            onChange={handleChange}
                            onBlur={(e: any) => {
                              handleBlur(e);
                              this.setState({
                                isFocusCity: true,
                              });
                            }}
                            isInvalid={
                              (!!errors.address_city &&
                                this.state.isFocusCity) ||
                              (this.state.isFocusCity &&
                                values.address_city.length === 0)
                            }
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationPassword"
                        >
                          <div className="d-flex bussiness-details-code-more">
                            <Form.Group
                              as={Col}
                              xs="6"
                              controlId="validationPassword"
                            >
                              <Input
                                placeholder="State"
                                type="text"
                                name="address_state"
                                value={values.address_state}
                                onChange={handleChange}
                                select
                                currencies={State}
                                onBlur={(e: any) => {
                                  handleBlur(e);
                                  this.setState({
                                    isFocusState: true,
                                  });
                                }}
                                isInvalid={
                                  (!!errors.address_state &&
                                    this.state.isFocusState) ||
                                  (this.state.isFocusState &&
                                    values.address_state.length === 0)
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              xs="6"
                              controlId="validationPassword"
                            >
                              <Input
                                placeholder="Zip"
                                type="text"
                                name="zip"
                                value={this.state.zip}
                                onChange={(e: any) => {
                                  this.setState({
                                    zip: e.target.value,
                                  });
                                }}
                                inputProps={{
                                  inputComponent: NumberFormatCustomZip as any,
                                }}
                                onBlur={(e: any) => {
                                  handleBlur(e);
                                  this.setState({
                                    isFocusZip: true,
                                  });
                                }}
                                isInvalid={
                                  this.state.zip.length === 0 &&
                                  this.state.isFocusZip
                                }
                              />
                            </Form.Group>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  {this.renderFooter(handleSubmit, errors)}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectStripe(CardEntryForm);
