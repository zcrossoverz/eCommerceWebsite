/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ErrorInterface {
    statusCode: number;
    error: string;
}

export const BadRequestError = (message: string, statusCode = 500): ErrorInterface => {
    return ({ statusCode, error: message });
}


export const isError = (obj: any): obj is ErrorInterface => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(obj).includes("error");
}