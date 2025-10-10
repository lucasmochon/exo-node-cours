import { Response } from "express";

export class CustomError extends Error {
    public code: number;
    public errorMessage: Error | string;

    constructor(code: number, message: string, errorMessage?: Error | string) {
        super(message);
        this.name = "CustomError";
        this.code = code;
        this.errorMessage = errorMessage ? errorMessage : '';

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const sendCustomError = (customError: CustomError, res: Response) => {
    console.error(`[${new Date().toISOString()}] ${customError.name} - Code: ${customError.code} - Message: ${customError.message} - Details: ${customError.errorMessage ?? 'aucun'}`);

    res.status(customError.code).json({
        code: customError.code,
        message: customError.message,
    });
};
