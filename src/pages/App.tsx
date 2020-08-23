import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInPage from './SignInPage'
import HomePage from './HomePage';
import SetupProfilePage from './OnBoarding/SetupProfilePage'
import AtomPricingPage from './OnBoarding/Atom-Store/AtomPricingPage';
import AddPaymentPage from './OnBoarding/Atom-Store/AddPaymentPage';
import AtomCheckoutPage from './OnBoarding/Atom-Store/AtomCheckoutPage';
import AtomPurchasedPage from './OnBoarding/Atom-Store/AtomPurchasedPage';
import UserRestrictedRoute from '../components/misc/UserRestrictedRoute';
import SetupAccountPage from './OnBoarding/Account/FinishProfilePage';
import SetupPricingPage from './OnBoarding/Account/PricingStructurePage';
import SetupAddMemberPage from './OnBoarding/Account/AddMembersPage';
import SetupConnectStripePage from './OnBoarding/Account/ConnectStripePage';
import AccountSetup from './OnBoarding/Account/AccountSetup';
import Dashboard from './DashboardPage';
import '../sass/common.scss';
class App extends React.Component {

    render() {
        return (
            <Router>
                <ToastContainer />
                <Route path="/" exact component={HomePage} />
                <Route path="/home" exact component={HomePage} />
                <Route path='/sign-in' exact component={SignInPage} />
                <Route path='/sign-up' exact component={SignInPage} />
                <UserRestrictedRoute path='/onboarding/profile' exact component={SetupProfilePage} />
                <UserRestrictedRoute path='/onboarding/atom-store/pricing' exact component={AtomPricingPage} />
                <UserRestrictedRoute path='/onboarding/atom-store/add-payment' exact component={AddPaymentPage} />
                <UserRestrictedRoute path='/onboarding/atom-store/checkout' exact component={AtomCheckoutPage} />
                <UserRestrictedRoute path='/onboarding/atom-store/purchased' exact component={AtomPurchasedPage} />
                <UserRestrictedRoute path='/dashboard' exact component={Dashboard} />
                <UserRestrictedRoute path='/onboarding/gym' component={AccountSetup} />
            </Router>
        );
    }
}

export default App;