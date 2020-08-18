import { Request } from 'express';

export interface FindNamesRequest extends Request {
  query: {
    version: string,
    localLanguageId: string,
    includeAnotherForm: string
  }
}