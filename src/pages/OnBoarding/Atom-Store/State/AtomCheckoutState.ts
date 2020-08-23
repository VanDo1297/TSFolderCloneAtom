import {
    ResponsesAtomProductPrice,// product model
} from '../../../../api_clients/atom_client/src/api';

export default interface AtomCheckoutState {
    totalPayment: number;
    saleTax: number;
    data: any;
    price: ResponsesAtomProductPrice;
    bill: any;
    numberLocation: number;
    isLoading: boolean | null;
}