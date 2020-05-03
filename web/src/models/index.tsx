export interface ILoginForm {
    username: string
}

export interface IResponse {
    data: any
    errors?: IError[]
    status?: number
}

export interface IError {
    error: {msg: string}[]
    path: string[]
}