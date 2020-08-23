import config from "../config/config";

// eslint-disable-next-line no-undef
let stripeInstance = Stripe(config.stripe.key);

export default stripeInstance;