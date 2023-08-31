export interface IEmail {
    subject: string,
    content: string,
    date: Date
}

export interface IEditEmail {
    subject: string,
    content: string,
    date: Date,
    editDate: Date
}

export interface ITemplate{
    userId: string,
    emailtemplate: IEmail,
}