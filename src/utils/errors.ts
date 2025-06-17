import Ajv from "ajv";

interface APIError{
    code : string,
    httpStatus: number,
    message: string,


    response(failures?:Record<any,any>[]): Record<any, any>;

}
export class InternalServerError extends Error implements  APIError {
    failures: any;
    code = "internalError";
    httpStatus = 500;
    message = "An internal error was encountered processing the request";

    constructor(errors?: any) {
        super("internalError");
        this.failures = errors;
    }



    response(): Record<any, any> {
        return {
            fault: {
                code: this.code,
                httpStatus: this.httpStatus,
                message: this.message,
                serverDateTime: Date.now().toString(),
                failures: this.failures,
            }
        }
    };


    
}
export class FailedRequestBodyError extends Error implements  APIError {

    constructor(errors?: Ajv.ErrorObject[]| string) {
        super("badRequest");
        this.failures = errors;
    }
    code = "badRequest";
    httpStatus = 400;
    message = "An internal error was encountered processing the request";
    failures : any;
    response(): Record<any, any> {
        return {
            fault: {
                code: this.code,
                httpStatus: this.httpStatus,
                message: this.message,
                serverDateTime: Date.now().toString(),
                failures: this.failures,
            }
        }
    };

}
export class NotFoundError extends Error implements  APIError {

    constructor(errors?: Ajv.ErrorObject[]| string) {
        super("notFound");
        this.failures = errors;
    }
    code = "notFound";
    httpStatus = 404;
    message = "Resource not found";
    failures : any;
    response(): Record<any, any> {
        return {
            fault: {
                code: this.code,
                httpStatus: this.httpStatus,
                message: this.message,
                serverDateTime: Date.now().toString(),
                failures: this.failures,
            }
        }
    };

}