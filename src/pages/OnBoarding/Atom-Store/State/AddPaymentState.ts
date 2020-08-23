import {
    ResponsesAtomProductPrice,// product model
} from '../../../../api_clients/atom_client/src/api';

export default interface AddPaymentPagePageState {
    price: ResponsesAtomProductPrice;
    productId: string;
    totalPayment: number;
    bill: any;
    numberLocation: number;
    paymentInfo: any;
}