export interface IEmail {
    id: string,
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