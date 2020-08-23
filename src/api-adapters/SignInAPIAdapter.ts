import SignInState from "../pages/State/SignInState";
import { ResponsesAdminLoginResponse, LoginAccount, SignUpAccount, ResponsesAdminLoginResponseData } from "../api_clients/atom_client/src/api";

export type SignInResponse = ResponsesAdminLoginResponse

function getFormLogin(state: SignInState): LoginAccount {
    return {
        email: state.email,
        password: state.password
    }
}

function getFormRegister(state: SignInState): SignUpAccount {
    return {
        email: state.email,
        password: state.password
    }
}

export default { getFormLogin, getFormRegister }


