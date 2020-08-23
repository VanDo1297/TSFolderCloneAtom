import * as atomAPI from "./src";
import config from "../../config/config";

export class AtomApiClient {
    classesAPI: atomAPI.AdminClassesApi;
    gymsAPI : atomAPI.AdminGymsApi;
    adminsAPI: atomAPI.AdminsApi;
    workoutsAPI: atomAPI.AdminWorkoutsApi;
    constructor() {
        this.adminsAPI = new atomAPI.AdminsApi(undefined,config.atomApi.endpoint);
        this.classesAPI = new atomAPI.AdminClassesApi(undefined,config.atomApi.endpoint);
        this.gymsAPI = new atomAPI.AdminGymsApi(undefined,config.atomApi.endpoint);
        this.workoutsAPI = new atomAPI.AdminWorkoutsApi(undefined,config.atomApi.endpoint);
    }
}
const atomApiClient = new AtomApiClient();

export default atomApiClient;