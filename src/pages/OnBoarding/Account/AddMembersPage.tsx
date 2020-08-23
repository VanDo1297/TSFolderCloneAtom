import React from 'react';
import * as H from "history";
import withApiHandler, { ErrorHandler, InjectedApiHandlerProps } from "../../../components/hocs/WithApiHandler";
import withSystemState, { InjectedSystemStateProps } from "../../../components/hocs/WithSystemState";
import Header from '../../../components/headers';
import Sliders from '../../../components/sliders';
import '../../../sass/pages/SetupPricingPage.scss'
import '../../../sass/common.scss';
import '../../../sass/pages/SetupAddMember.scss'
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import addIcon from '../../../images/manually-add.png';
import uploadIcon from '../../../images/upload-csv.png';
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
        this.props.updateSetupScreen(this.props.systemState.setupScreen + 1)
    }
    handleBack = () => {
        this.props.updateSetupScreen(this.props.systemState.setupScreen - 1)
    }
    renderContent = () => {
        return (
            <div className='setup-pricing-content-section w-100 d-flex flex-row'>
                <div className='w-50 d-flex flex-column p-5 setup-pricing-left mt-5'>
                    <p className=' setup-pricing-left-title'>
                        Add your members
                   </p>
                    <p className='setup-pricing-left-sub-title mt-4'>
                        <span> Already have members? Let's import them</span><br />
                        <span> into Atom. You can always add more later.</span><br />
                    </p>
                </div>
                <div className='w-50 d-flex flex-column p-5 setup-pricing-right mt-5'>
                    <div className='setup-pricing-line' />
                    <p className='setup-pricing-left-sub-title mt-5'>
                        <span>How would you like to add your members?</span><br />
                    </p>
                    <div className='setup-add-member-csv mt-5 d-flex flex-column justify-content-center align-items-center'>
                        <div className='w-50 setup-add-member-item d-flex justify-content-center align-items-center'>
                            <img className='pointer' src={uploadIcon} />
                        </div>
                        <div className='w-50 setup-add-member-item d-flex justify-content-center align-items-center mt-2'>
                            <img className='pointer' src={addIcon}></img>
                        </div>
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