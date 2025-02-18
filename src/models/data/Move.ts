import { Move as MoveType } from '../../types';
import { DamageType } from '../../enumerators';

export class Move {
  id: number;
  name: string;
  typeId: MoveType;
  power: string;
  power2: string;
  pp: number;
  accuracy: string;
  priority: number;
  damageType: string;
  isDirect: boolean;
  canProtect: boolean;

  constructor(id: number, name: string, typeId: MoveType, power: string, power2: string,
    pp: number, accuracy: string, priority: number, damageType: string, isDirect: boolean, canProtect: boolean) {
      this.id = id;
      this.name = name; 
      this.typeId = typeId;
      this.power = power;
      this.power2 = power2;
      this.pp = pp;
      this.accuracy = accuracy;
      this.priority = priority;
      this.damageType = damageType === "変化" ? DamageType.STATUS : damageType === "物理" ?  DamageType.PHYSICAL : DamageType.SPECIAL;
      this.isDirect = isDirect;
      this.canProtect = canProtect;
  }
}