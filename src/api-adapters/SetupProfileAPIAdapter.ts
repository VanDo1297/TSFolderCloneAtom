import SetupProfileState from "../pages/OnBoarding/SetupProfileState";
import { ResponsesAdminProfileResponse, EditProfile, ResponsesAdminProfile } from "../api_clients/atom_client/src/api";
import { AxiosResponse} from 'axios'
export type AdminProfileResponse = ResponsesAdminProfileResponse

function fillState(state: SetupProfileState, respmodel: AxiosResponse<AdminProfileResponse>): SetupProfileState {
    const respProfile: ResponsesAdminProfile = respmodel.data.data.admin;

    state.gender = respProfile.gender || "";
    state.notes = respProfile.notes || "";
    state.directnumber = respProfile.phoneNumber || "";
    state.firstname = respProfile.firstName || "";
    state.lastname = respProfile.lastName || "";
    state.day = `${respProfile.birthDate ? respProfile.birthDate.substring(8, 10) : ""}`;
    state.month = `${respProfile.birthDate ? respProfile.birthDate.substring(5, 7) : ""}`;
    state.year = `${respProfile.birthDate ? respProfile.birthDate.substring(0, 4) : ""}`;

    const respBusinessDetails = respProfile.businessDetails || {};

    state.businessName = respBusinessDetails.legalName
    state.businessAddress1 = respBusinessDetails.billingStreet1
    state.businessAddress2 = respBusinessDetails.billingStreet2
    state.city = respBusinessDetails.billingCity
    state.state = respBusinessDetails.billingState
    state.zip = respBusinessDetails.billingZip

    return state;
}

function getEditProfileSubmitData(state: SetupProfileState, old: AdminProfileResponse | null, email: string | null): EditProfile {
    let oldProfile: ResponsesAdminProfile | null = null;
    if (old && old.data.admin) {
        oldProfile = old.data.admin;
    }

    if (oldProfile && oldProfile.email && oldProfile.email.length > 0) {
        email = oldProfile.email;
    }

    return {
        firstName: state.firstname,
        lastName: state.lastname,
        birthDate: `${state.year || "1990"}-${state.month || "01"}-${state.day || "01"}`,
        email: email || "",
        gender: state.gender,
        phoneNumber: state.directnumber,
        notes: state.notes,
        businessDetails: {
            billingCity: state.city,
            billingState: state.state,
            billingStreet1: state.businessAddress1,
            billingStreet2: state.businessAddress2,
            billingZip: state.zip,
            legalName: state.businessName
        }
    }
}

export default {
    fillState: fillState,
    getEditProfileSubmitData: getEditProfileSubmitData
}