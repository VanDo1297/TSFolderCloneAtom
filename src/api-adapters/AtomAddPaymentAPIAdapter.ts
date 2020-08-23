import AddPaymentState from '../pages/OnBoarding/Atom-Store/State/AddPaymentState';

function fillState(state: any): AddPaymentState {
    return {
        price: state.price,
        productId: state.productId,
        totalPayment: state.totalPayment,
        bill: state.bill,
        numberLocation: state.numberLocation,
        paymentInfo: state.paymentInfo,
    }
}

export default { fillState }