import fs from 'fs'
import csvSync from 'csv-parse/lib/sync'

export class CsvHelper {
  static read(filePath: string){
    let data = fs.readFileSync(filePath)
    const options = {
      columns: true
    }
    return csvSync(data, options)
  }
}