export class BaseResponse {
    status: string;

    constructor(status: string) {
        this.status = status;
    }
}

export class SuccessResponse extends BaseResponse {
    data: any;

    constructor(data: any, options: any = {}) {
        super('success');
        this.data = data;
        if (options) {
            Object.keys(options).forEach((key) => {
                this[key] = options[key];
            });
        }  
    }
}

export class FailResponse extends BaseResponse {
    data: any;

    constructor(data: any) {
        super('fail');
        this.data = data;
    }
}

export class ErrorResponse extends BaseResponse {
    message: string;
    code?: number;
    data?: any;

    constructor(message: string, code?: number, data?: any) {
        super('error');
        this.message = message;
        if (code) this.code = code;
        if (data) this.data = data;
    }
}