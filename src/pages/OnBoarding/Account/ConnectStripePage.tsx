import React from 'react';
import * as H from "history";
import withApiHandler, { ErrorHandler, InjectedApiHandlerProps } from "../../../components/hocs/WithApiHandler";
import withSystemState, { InjectedSystemStateProps } from "../../../components/hocs/WithSystemState";
import Header from '../../../components/headers';
import Sliders from '../../../components/sliders';
import '../../../sass/pages/SetupPricingPage.scss'
import '../../../sass/common.scss';
import '../../../sass/pages/SetupConnectStripePage.scss'
import Button from 'react-bootstrap/Button';
import stripeIcon from '../../../images/stripe.png';
import _ from 'lodash';
//getAtomProducts
interface SetupPricingPageBaseProps {
    history: H.History;
}

type SetupPricingPageProps = SetupPricingPageBaseProps & InjectedApiHandlerProps & InjectedSystemStateProps

interface SetupPricingPageState {

}

class SetupPricingPage extends React.Component<SetupPricingPageProps, SetupPricingPageState> {
    state = {

    }

    handleNext = () => {
        this.props.history.push('/dashboard')
    }
    handleBack = () => {
        this.props.updateSetupScreen(this.props.systemState.setupScreen - 1)
    }

    renderContent = () => {
        return (
            <div className='setup-pricing-content-section w-100 d-flex flex-row'>
                <div className='w-50 d-flex flex-column p-5 setup-pricing-left mt-5'>
                    <p className=' setup-pricing-left-title'>
                        Connect with Stripe
                   </p>
                    <p className='setup-pricing-left-sub-title mt-4'>
                        <span> Stripe is our preferred payment servicer</span><br />
                        <span> because they make virtual payments</span><br />
                        <span> secure, seamless and easy.</span>
                    </p>
                </div>
                <div className='w-50 d-flex flex-column p-5 setup-pricing-right mt-5'>
                    <div className='setup-pricing-line' />
                    <div className='setup-stripe mt-5 '>
                        <img src={stripeIcon} />
                        <p className='setup-stripe-sub-title mt-3'>
                            <span>Strip's Atom Integration allows online payments with credit</span><br />
                            <span>and debit cards, recurring payments and more.</span>
                        </p>
                        <Button className='mt-3 setup-stripe-button'>Activate</Button>
                    </div>
                </div >
            </div >
        )
    }
    renderFooter = () => {
        return (
            <div className='setup-pricing-footer d-flex justify-content-center align-items-center'>
                <div onClick={this.handleBack} className='ml-5 setup-button-back-container'>
                    <Button className='setup-button-back'></Button>
                </div>
                <div className='ml-auto setup-button mr-3'>
                    <Button onClick={this.handleNext} className='setup-button-next'>Next</Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                <Header color='#F3EFEB' ></Header>
                <Sliders history={this.props.history} handleSkip={this.handleNext} index={this.props.systemState.setupScreen}></Sliders>
                <div className='w-100 setup-pricing-container d-flex justify-content-center flex-column align-items-center'>
                    <div className='setup-pricing-section'>
                        {this.renderContent()}
                    </div>
                    {this.renderFooter()}
                </div>
            </>
        )
    }


}

export default withSystemState(withApiHandler(SetupPricingPage, ErrorHandler.TOAST));