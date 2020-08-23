import React from "react";
import * as H from "history";
import withApiHandler, {
  ErrorHandler,
  InjectedApiHandlerProps,
} from "../components/hocs/WithApiHandler";
import withSystemState, {
  InjectedSystemStateProps,
} from "../components/hocs/WithSystemState";
import Header from "../components/headers";
import Loading from "../components/loading";
//getAtomProducts
interface DashboardPageBaseProps {
  history: H.History;
}

type DashboardPageProps = DashboardPageBaseProps &
  InjectedApiHandlerProps &
  InjectedSystemStateProps;

interface DashboardPagePageState {
  isLoading: boolean;
}

class DashboardPage extends React.Component<
  DashboardPageProps,
  DashboardPagePageState
  > {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Loading isLoading={isLoading}></Loading>
        <Header color="#F3EFEB" lines></Header>
        <nav style={{marginTop:'60px'}} className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li onClick={()=>{
                localStorage.removeItem('token')
                this.props.history.push('/sign-in')
              }}  style={{cursor:'pointer'}} className="nav-item active">
                <span className="nav-link" >Logout</span>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default withSystemState(
  withApiHandler(DashboardPage, ErrorHandler.TOAST)
);
