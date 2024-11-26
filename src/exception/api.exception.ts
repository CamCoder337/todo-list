import {AxiosError} from "axios";

export interface APIException extends AxiosError{
    errorCode: number;
    errorMessage: string;
}