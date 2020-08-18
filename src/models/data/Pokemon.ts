export class Pokemon {
  id: string;
  no: string;
  height: number;
  weight: number;
  order: number;
  isDefault: boolean;
  
  constructor(id: string, no: string, height: number, weight: number, order: number, isDefault: boolean) {
    this.id = id;
    this.no = no;
    this.height = height;
    this.weight = weight;
    this.order = order;
    this.isDefault = isDefault;
  }
}