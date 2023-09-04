export interface IEmail {
    _id?: string,
    id?: string,
    subject: string,
    content: string,
    date: Date
}

export interface ITemplate{
    _id: string,
    userId: string,
    emailtemplate: IEmail[],
}

export interface IAddEmailTemplate{
    userId: string,
    template: IEmail,
}

export interface IEditEmailTemplate {
    id?: string,
    template: IEmail
    _id?: string,
}