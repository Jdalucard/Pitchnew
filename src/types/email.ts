import { IUserData } from '.';

export interface IEmail {
  _id?: string;
  subject: string;
  content: string;
  date: Date;
  id?: string;
  editDate?: Date;
}

export interface ITemplate {
  _id: string;
  userId: string;
  emailtemplate: IEmail[];
}

export interface IAddEmailTemplate {
  userId: string;
  template: IEmail;
}

export interface IEditEmailTemplate {
  templateId: string;
  template: IEmail;
  userId?: string;
}

export interface IEmailData {
  emaiAccountdata?: IUserData;
  emailval: string;
  message: string;
  subject: string;
}

export interface ISendEmail {
  emailData: IEmailData;
}
