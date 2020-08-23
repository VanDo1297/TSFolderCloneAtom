import React, { Fragment } from "react";
import * as H from "history";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../components/hocs/WithSystemState";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../sass/pages/SignInPage.scss";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import Loading from "../components/loading";
import Header from "../components/headers";
import Input from "../components/input";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import atomApiClient from "../api_clients/atom_client/AtomApiClient";
import _ from "lodash";


//#region Apdater + State
import SignInPageState from './State/SignInState';
import apiSignIn, { SignInResponse } from '../api-adapters/SignInAPIAdapter';

//#endregion


interface SignInPageBaseProps {
  history: H.History;
  location: any;
}

type SignInPageProps = SignInPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;



const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
  state = {
    email: "",
    password: "",
    isFocusEmail: false,
    isFocusPassword: false,
    isRegister: false,
    isLoading: false,
    errMessage: "",
    shownInfo: {
      title: "Sign In",
      otherTitle: "Sign In",
      otherLabel: "Sign Up",
    },
    isPage: "sign-in",
  };
  submit = (formData: any) => {
    this.setState({
      isLoading: true,
      errMessage: "",
    });
    if (this.state.isPage === "sign-in") {
      const data = apiSignIn.getFormLogin(formData)
      this.props.handleRequest(
        atomApiClient.adminsAPI.adminLogin(data),
        (response: AxiosResponse<SignInResponse>) => {
          this.handleLoginResponse(response, data);
        },
        undefined,
        () => {
          this.setState({
            isLoading: false,
          });
        }
      );
    } else {
      const data = apiSignIn.getFormRegister(formData)
      this.props.handleRequest(
        atomApiClient.adminsAPI.adminSignUp(data),
        (response: AxiosResponse<SignInResponse>) => {
          this.handleRegisterResponse(response, data);
        },
        undefined,
        () => {
          this.setState({
            isLoading: false,
          });
        }
      );
    }
  };

  componentDidMount() {
    if(!!localStorage.getItem('token')){
      this.props.history.push('/dashboard')
    }
    if (this.props.location.pathname === "/sign-in") {
      this.setState({
        shownInfo: {
          title: "Sign In",
          otherTitle: "Sign In",
          otherLabel: "Sign Up",
        },
        isPage: "sign-in",
      });
    } else if (this.props.location.pathname === "/sign-up") {
      this.setState({
        shownInfo: {
          title: "Sign Up",
          otherTitle: "Sign In",
          otherLabel: "Sign In",
        },
        isPage: "sign-up",
      });
    }
  }

  getInitalValue = () => {
    let values;
    if (!_.isNull(localStorage.getItem("email"))) {
      values = {
        email: localStorage.getItem("email"),
        password: "",
      };
    } else {
      values = {
        email: "",
        password: "",
      };
    }
    return values;
  };

  handleLoginResponse = (response: AxiosResponse<SignInResponse>, formData: any) => {
    if (response.data.data.token) {
      this.props.updateToken(response.data.data.token);
      this.props.updateAccount(formData);
      if (!response.data.data.onBoarding.paid) {
        this.props.history.push("/onboarding/atom-store/pricing");
      } else if(!response.data.data.onBoarding.createdGym) {
        this.props.history.push("/onboarding/gym");
      } else if(!response.data.data.onBoarding.addedProducts){
        this.props.history.push("/onboarding/gym", {
          pathname: "/onboarding/gym",
          state: {
            isAddProduct: false
          },
        });
      }else{
        this.props.history.push("/dashboard");
      }
    }
  };

  handleRegisterResponse = (response: any, formData: any) => {
    if (this.props.updateToken !== undefined) {
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.token
      ) {
        this.props.updateAccount(formData);
        this.props.updateToken(response.data.data.token);
        this.props.handleRegister(response.data.data);
      }
      this.setState({
        isRegister: true,
      });
    }
  };

  handleSignin = () => {
    this.setState({
      errMessage: "",
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
      if (this.props.location.pathname === "/sign-in") {
        this.props.history.push("/sign-up");
      } else if (this.props.location.pathname === "/sign-up") {
        this.props.history.push("/sign-in");
      }
    }, 1000);
    window.clearTimeout();
  };

  componentDidUpdate() {
    if (this.state.isRegister) {
      setTimeout(() => {
        this.props.history.push(
          `/onboarding/profile`
        );
        window.clearTimeout();
      }, 2000);
    }
  }

  renderToButtonNext = (handleSubmitForm: any) => {
    return (
      <div className="sign-in-btn-next-container">
        <Button
          variant="success"
          size="lg"
          block
          onClick={handleSubmitForm}
          className="sign-in-btn-next"
        >
          {" "}
          {this.state.isPage === "sign-in" ? "Login" : "Create account"}
        </Button>
      </div>
    );
  };

  renderToRegistrationComfirm = () => {
    return (
      <div className="sign-in-page-confirm-content">
        <p className="sign-in-page-confirm-title">Register Confirmation</p>
        <p className="sign-in-page-confirm-subtitle mb-3">
          Thank you for Registering!
        </p>
        <p className="sign-in-page-confirm-subtitle">
          {" "}
          Please check your email and click on the Confirmation Link to complete
          your Registration.
        </p>
      </div>
    );
  };

  renderToRegistrationForm = () => {
    return (
      <>
        <div className="sign-in-content">
          <p className="sign-in-title">{this.state.shownInfo.title}</p>
          <p className="sign-in-sub-title">as gym owner</p>

          <Formik
            validationSchema={loginSchema}
            onSubmit={this.submit}
            initialValues={this.getInitalValue()}
            validateOnBlur={false}
          // validateOnChange={false}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              resetForm,
            }) => (
                <>
                  <div className="sign-in-section">
                    <Form
                      className="sign-in-form"
                      noValidate
                      onSubmit={this.submit}
                    >
                      <div className="sign-in-form-input">
                        <Form.Row>
                          <Form.Group
                            as={Col}
                            xs="12"
                            controlId="validationEmail"
                          >
                            <Input
                              type={"text"}
                              name={"email"}
                              value={values.email}
                              onChange={handleChange}
                              placeholder="Email*"
                              onBlur={(e: any) => {
                                handleBlur(e);
                                this.setState({
                                  isFocusEmail: true,
                                });
                              }}
                              isInvalid={
                                (!!errors.email && this.state.isFocusEmail) ||
                                (this.state.isFocusEmail &&
                                  values.email &&
                                  values.email.length === 0)
                              }
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            xs="12"
                            controlId="validationPassword"
                          >
                            <Input
                              type={"password"}
                              name={"password"}
                              placeholder="Password*"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={(e: any) => {
                                handleBlur(e);
                                this.setState({
                                  isFocusPassword: true,
                                });
                              }}
                              isInvalid={
                                (!!errors.password &&
                                  this.state.isFocusPassword) ||
                                (this.state.isFocusPassword &&
                                  values.password.length === 0)
                              }
                            />
                          </Form.Group>
                        </Form.Row>
                        {this.state.errMessage.length > 0 && (
                          <p
                            style={{
                              marginBottom: "3px",
                              width: "100%",
                              color: "red",
                              fontSize: "14px",
                            }}
                          >
                            {this.state.errMessage}
                          </p>
                        )}
                      </div>

                      {this.renderToButtonNext(() => {
                        this.setState({
                          isFocusPassword: true,
                          isFocusEmail: true,
                        });
                        handleSubmit();
                      })}
                    </Form>
                    <div className="sign-in-form-other">
                      <p className="sign-in-form-other-title">{`or ${this.state.shownInfo.otherTitle} with existing account:`}</p>
                      <div className="sign-in-form-login-other-button mt-3">
                        <div className="sign-in-item-form-login-other-button-fb ">
                          <div className="sign-in-icon-fb mr-2 " />
                          <Button className="sign-in-item-form-login-other-fb ">
                            connect with Facebook
                        </Button>
                        </div>
                        <div className="sign-in-item-form-login-other-button-gg">
                          <div className="sign-in-icon-gg-bg mr-2">
                            <div className="sign-in-icon-gg"></div>
                          </div>
                          <Button className="sign-in-item-form-login-other-gg">
                            connect with Google
                        </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sign-in-footer mt-2">
                    <div className="sign-in-btn">
                      <div className="sign-in-btn-back-bg">
                        <Button
                          onClick={() => {
                            // this.props.history.goBack();
                            this.props.history.push("/");
                          }}
                          className="sign-in-btn-back"
                          variant="danger"
                        ></Button>
                      </div>
                    </div>
                    &nbsp;
                  <div className="label-signin">
                      {`Already ${
                        this.state.isPage === "sign-in" ? `haven't` : "have"
                        } an account? `}
                      <span
                        onClick={() => {
                          this.handleSignin();
                          resetForm({ email: "", password: "" });
                        }}
                        className="ml-1 label-sign-text"
                      >
                        {`${this.state.shownInfo.otherLabel}`}
                      </span>
                      .
                  </div>
                    <div className="sign-in-btn hide">
                      <div
                        onClick={() => {
                          // this.props.history.goBack();
                          this.props.history.push("/");
                        }}
                        className="sign-in-btn-back-bg"
                      >
                        <Button
                          className="sign-in-btn-back"
                          variant="danger"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </Formik>
        </div>
      </>
    );
  };

  render() {
    const { isRegister, isLoading } = this.state;

    return (
      <>
        <div
          className={`${isRegister ? "sign-in-page-confirm" : "sign-in-page"}`}
        >
          <Loading isLoading={isLoading} />
          <Header></Header>
          {isRegister && this.renderToRegistrationComfirm()}
          {!isRegister && this.renderToRegistrationForm()}
        </div>
      </>
    );
  }
}

export default withSystemState(withApiHandler(SignInPage, ErrorHandler.TOAST));
