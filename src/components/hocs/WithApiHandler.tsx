import { Subtract } from 'utility-types';
import React from 'react';
import {isNullOrUndefined} from "../../utils/utils";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

export interface InjectedApiHandlerProps {
    handleRequest: <T extends unknown>(promise: Promise<AxiosResponse<T>>, onSuccess:(response:any)=>void, onError?:(error:any)=>void, onEnd?:()=>void)=>void;
}

export enum ErrorHandler {
    TOAST,
    CONSOLE
}

const withApiHandler = <P extends InjectedApiHandlerProps>(Component: React.ComponentType<P>, errorHandler:ErrorHandler = ErrorHandler.CONSOLE) =>
    class WithApiHandler extends React.Component<Subtract<P, InjectedApiHandlerProps>, any> {

        handleRequest = <T extends unknown>(promise: Promise<AxiosResponse<T>>, onSuccess:(response:any)=>void, onError?:(error:any)=>void, onEnd?:()=>void):void=>{
            promise.then((response:AxiosResponse<T>)=> {
                onSuccess(response);
            })
            .catch((error:any)=> {
                if(!isNullOrUndefined(onError)){
                    // @ts-ignore
                    onError(error) ;
                }else {
                    switch (errorHandler) {
                        case ErrorHandler.CONSOLE:
                            console.log(error);
                            break;
                        case ErrorHandler.TOAST:
                            if(!isNullOrUndefined(error.request) && !isNullOrUndefined(error.request.response)){
                                let errorResponse;
                                try{
                                    errorResponse = JSON.parse(error.request.response);
                                }catch (e) {
                                    break;
                                }
                                console.log(errorResponse);
                                if(!isNullOrUndefined(errorResponse.validationErrors)){
                                    Object.values<string>(errorResponse.validationErrors).forEach((errorMessage)=>{
                                        toast.error(errorMessage, {position: toast.POSITION.TOP_CENTER});
                                    })
                                }else {
                                    toast.error(errorResponse.message, {position: toast.POSITION.TOP_CENTER});
                                }
                                break;
                            }
                            toast.error("Unknown Error",{position: toast.POSITION.TOP_CENTER});
                            console.log(error);
                            break;
                    }
                }
            }).finally(()=>{
                if(!isNullOrUndefined(onEnd)){
                    // @ts-ignore
                    onEnd()
                }
            });
        };

        render() {
            return (
                <Component
                    {...this.props as P}
                    handleRequest={this.handleRequest}
                />
            );
        }
    };

export default withApiHandler;