import { ResponsesAtomProduct } from "../../../../api_clients/atom_client/src"
import {
    ResponsesAtomProductPrice,// product model
} from '../../../../api_clients/atom_client/src/api';

export interface PricingPageState {
    userInfo: {};
    isLoading: boolean;
    priceExists: ResponsesAtomProductPrice ;
    prices: ResponsesAtomProductPrice[];
    productId: string;
    isShowPaymentModal: boolean;
    billFocus: any;
    numberLocation: number;
    totalPayment: number;
    subscription: boolean | undefined;
}

export interface PricingPagePropsPlan {
    productId: string,
    priceExists: ResponsesAtomProductPrice ,
    totalPayment: number,
    bill: billFocus,
    numberLocation: number
}

interface billFocus {
    id: number,
    name: string,
    base: number
}
