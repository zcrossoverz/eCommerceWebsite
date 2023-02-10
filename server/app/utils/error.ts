export interface ErrorInterface {
    statusCode: number;
    error: string;
}

export const BadRequestError = (message: string, statusCode: number = 500):ErrorInterface => {
    return ({ statusCode, error: message });
}