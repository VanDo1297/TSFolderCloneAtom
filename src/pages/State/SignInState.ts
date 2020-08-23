

export default interface SignInPageState {
    email: string;
    password: string;
    isFocusEmail: boolean | undefined;
    isFocusPassword: boolean | undefined;
    isRegister: boolean | undefined;
    isLoading: boolean | undefined;
    errMessage: string | undefined | null;
    shownInfo: object | undefined | null;
    isPage: string | undefined | null;
}