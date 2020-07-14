import fs from 'fs'
import csvSync from 'csv-parse/lib/sync'

export class StringHelper {
  static ToBoolean(value: string) {
    return (value === 'true') ? true : false;
  }
}