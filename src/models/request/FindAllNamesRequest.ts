import { Request } from 'express';

export interface FindAllNamesRequest extends Request {
  query: {
    version: string,
    localLanguageId: string,
    includeAnotherForm: string
  }
}