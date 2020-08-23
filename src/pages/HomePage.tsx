import React from "react";
import * as H from "history";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../components/hocs/WithSystemState";
import "../sass/pages/HomePage.scss";
import Header from "../components/headers";
import Button from "react-bootstrap/Button";
interface HomePageBaseProps {
  history: H.History;
}

type HomePageProps = HomePageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;

interface HomePageState {
  userInfo: {};
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  state = {
    userInfo: {},
  };

  // componentDidMount() {
  //     if (this.props.systemState.token.length > 0) {
  //         this.props.history.push('/dashboard')
  //     }
  // }
  render() {
    return (
      <>
        <Header
          opacity={0.9}
          isShowLoginButton
          handleRedirectToLogin={() => this.props.history.push("/sign-in")}
        ></Header>
        <div
          className="home-page"
          onClick={() => this.props.history.push("/sign-in")}
        >
          <div className="home-page-info">
            <div className="home-page-info-left">
              <div className="home-page-left-box"></div>
            </div>
            <div className="home-page-info-right">
              <div className="home-page-right-box"></div>
            </div>
            <div className="home-page-icon-top">
              <div className="home-page-icon-mask-group-top" />
              <div className="home-page-icon-line-top" />
            </div>
            <p className="home-page-title">
              <span>We power better gyms,</span>
              <br />
              <span>coaches and workouts.</span>
            </p>
            <p className="home-page-more-info d-block">
              <span> We build the technology that enables better </span>
              <br />
              <span> relationships between Coaches, Gym Owners and their</span>
              <br />
              <span> Athletes to deliver better performance.</span>
              <br />
            </p>
            <div className="home-page-icon-bottom">
              <div className="home-page-icon-line-bottom" />
              <div className="home-page-icon-mask-group-bottom" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withSystemState(withApiHandler(HomePage, ErrorHandler.TOAST));
