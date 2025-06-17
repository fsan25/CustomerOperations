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
        super(typeof errors === 'string' ? errors : "badRequest");
        this.failures = errors;
        if (typeof errors === 'string') {
            this.message = errors;
        } else {
            this.message = "An internal error was encountered processing the request";
        }
    }
    code = "badRequest";
    httpStatus = 400;
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
        super(typeof errors === 'string' ? errors : "notFound");
        this.failures = errors;
        if (typeof errors === 'string') {
            this.message = errors;
        } else {
            this.message = "Resource not found";
        }
    }
    code = "notFound";
    httpStatus = 404;
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