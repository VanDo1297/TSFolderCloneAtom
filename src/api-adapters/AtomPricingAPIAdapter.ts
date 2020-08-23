import {
    ResponsesAtomProductsResponse, // response after get product
    ResponsesAtomProductsResponseData, // data in response
    ResponsesAtomProductPrice,// product model
} from '../api_clients/atom_client/src/api';

import { PricingPageState, PricingPagePropsPlan } from '../pages/OnBoarding/Atom-Store/State/AtomPricingState';

export type AtomPricingResponse = ResponsesAtomProductsResponse


function getPriceFocus(state: PricingPageState, respmodel: PricingPagePropsPlan): PricingPageState {
    state.priceExists = respmodel.priceExists
    state.billFocus = respmodel.bill
    state.numberLocation = respmodel.numberLocation
    state.totalPayment = respmodel.totalPayment
    return state
}
function getPrices(response: AtomPricingResponse, ): Array<ResponsesAtomProductPrice> {
    const data: ResponsesAtomProductsResponseData = response.data
    const result = data.products[0].prices
    return result;
}

export default { getPrices, getPriceFocus }