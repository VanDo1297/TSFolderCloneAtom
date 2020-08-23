import React from 'react';
import * as H from "history";
import withApiHandler, { ErrorHandler, InjectedApiHandlerProps } from "../../../components/hocs/WithApiHandler";
import withSystemState, { InjectedSystemStateProps } from "../../../components/hocs/WithSystemState";
import Header from '../../../components/headers';
import Loading from '../../../components/loading'
import SetupPricingPage from './PricingStructurePage';
import SetupConnectStripePage from './ConnectStripePage';
import SetupAddMemberPage from './AddMembersPage';
import SetupAccountPage from './FinishProfilePage';
import CryptoJS from 'crypto-js';
//getAtomProducts

//#region  State and Adapter
import AccountSetupState from './State/AccountSetupState';
//#endregion
interface AccountSetupPageBaseProps {
    history: H.History;
}

type AccountSetupPageProps = AccountSetupPageBaseProps & InjectedApiHandlerProps & InjectedSystemStateProps


class AccountSetupPage extends React.Component<AccountSetupPageProps, AccountSetupState> {

    state = {
        isLoading: false,
        screen: 1
    }
    componentDidMount() {
        this.setState({
            screen: this.props.systemState.setupScreen
        })
    }
    componentDidUpdate() {
        if (this.props.systemState.setupScreen !== this.state.screen) {
            this.setState({
                screen: this.props.systemState.setupScreen
            })
        }
    }
    saveGymsUnid=(unid: string)=>{
        var ciphertext = CryptoJS.AES.encrypt(unid, 'atom-key').toString();  
        localStorage.setItem('gymId', ciphertext)
    }
    renderContent = (screen: number) => {
        switch (screen) {
            case 1:
                return <SetupAccountPage history={this.props.history} saveGymsUnid={this.saveGymsUnid}/>
            case 2:
                return <SetupPricingPage history={this.props.history}/>
            case 3:
                return <SetupAddMemberPage history={this.props.history} />
            case 4:
                return <SetupConnectStripePage history={this.props.history} />
        }
    }
    render() {
        var { screen } = this.state
        return (
            <>
                {this.renderContent(screen)}
            </>
        )
    }
}

export default withSystemState(withApiHandler(AccountSetupPage, ErrorHandler.TOAST));