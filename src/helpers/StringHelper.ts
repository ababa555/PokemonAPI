import fs from 'fs'
import csvSync from 'csv-parse/lib/sync'
import { GameVersion } from './../types';

export class StringHelper {
  static ToBoolean(value: string) {
    return (value === 'true') ? true : false;
  }

  static ToGameVersion(value: string): GameVersion {
    if (value === "1" || value === "2" || value === "3") {
      return value
    }
    return "1";
  }
}