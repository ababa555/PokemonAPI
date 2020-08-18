import fs from 'fs'
import csvSync from 'csv-parse/lib/sync'
import { GameVersionType } from './../enumerators';
import { GameVersion } from './../types';

export class CsvHelper {
  static read(filePath: string) {
    const data = fs.readFileSync(filePath)
    const options = {
      columns: true
    }
    return csvSync(data, options)
  }

  static filename(filename: string, gameVersion: GameVersion) {
    let version = ""
    switch (gameVersion) {
      case GameVersionType.SM:
        version = "sm"
        break;
      case GameVersionType.PIKA_VEE:
        version = "pika_vee"
        break;
      case GameVersionType.SWSH:
        version = "swsh"
        break;
      default:
        version = "sm"
        break;
    }

    return `./src/csv/${version}/${filename}.csv`
  }
}