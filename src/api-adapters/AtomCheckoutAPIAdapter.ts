import AtomCheckoutState from '../pages/OnBoarding/Atom-Store/State/AtomCheckoutState';
import { ProductPurchase } from '../api_clients/atom_client/src/api';
function mapStateToProps(state: AtomCheckoutState, props: any): AtomCheckoutState {
    state.bill = props.bill;
    state.data = props.data
    state.numberLocation = props.numberLocation
    state.price = props.price
    state.saleTax = props.saleTax
    state.totalPayment = props.totalPayment
    return state;
}

function getCardPaymentData(data: any): ProductPurchase {
    return {
        cardUnid: data.cardID,
        newCard: data.newCard,
        priceUnid: data.priceUnid,
        productUnid: data.productUnid,
    }
}
export default { mapStateToProps, getCardPaymentData }