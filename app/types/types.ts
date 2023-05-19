export interface AuthPostFields {
    name : string;
    email: string;
    password: string;
}


export interface ResponseType<T> {
    success: boolean;
    message: string;
    data: T | null
}