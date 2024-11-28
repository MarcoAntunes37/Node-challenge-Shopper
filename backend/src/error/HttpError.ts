export default class httpError extends Error {
    error_code: string;
    status: number;

    constructor(status: number, error_code: string, message: string) {
        super(message);
        this.error_code = error_code;
        this.status = status;
    }
}