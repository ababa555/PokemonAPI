import fs from 'fs'
import csvSync from 'csv-parse/lib/sync'

export class CsvHelper {
  static read(filePath: string) {
    const data = fs.readFileSync(filePath)
    const options = {
      columns: true
    }
    return csvSync(data, options)
  }

  static filename(filename: string, localLanguageId: string) {
    let version = ""
    switch (localLanguageId) {
      case "1":
        version = "sm"
        break;
      case "2":
        version = "pika_vee"
        break;
      case "3":
        version = "swsh"
        break;
      default:
        version = "sm"
        break;
    }

    return `./src/csv/${version}/${filename}.csv`
  }
}