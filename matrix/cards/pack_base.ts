import { CardPrinter } from "./characterCards/CardPrinter.js";

const NONE = 'none';
export {
  Attack,
  Range,
  Dice,
  Damage,
  DamageBonus,
  Formula,
  GenericCard,
  Health,
  Movement,
  Rarity,
  Upgrade, 
  RangeDirections,
  orthogonalRanges,
  diagonalRanges,
  adjacentRanges,
  forwardRanges,
  aheadRanges,
  NONE
}

type Attack = {
  name: string;
  range: Range;
  damage: Damage;
  notes?: string;
}

type Dice = "d4" | "-d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100"
type Rarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Epic"
  | "Legendary"
  | "Mythic"
  | "Uncommon+"

type RangeDirections = "←" | "↑" | "→" | "↓" | "↖" | "↗" | "↘" | "↙";
type RangeDirection = RangeDirections | Array<RangeDirections>;

const orthogonalRanges: RangeDirections[] = ["←", "↑", "↓", "→"];
const diagonalRanges: RangeDirections[] = ["↖", "↙", "↗", "↘"];
const adjacentRanges: RangeDirections[] = orthogonalRanges.concat(diagonalRanges);
const forwardRanges: RangeDirections[] = ["↖", "↑", "↗"];
const aheadRanges: RangeDirections[] = ["↑"];

type Movement = {
  distance: number;
  direction: RangeDirection
}

type Range = {
  distance: number | "Touch"
  direction: RangeDirection
}

type DamageBonus = {
  type: Dice | Array<Dice>
  bonus: number
}

type Damage =
  | number
  | {
    type: "summon"
    name: string
    health: Health
    movement: Movement
    attacks: Array<Attack>
  }
  | DamageBonus

type Formula = string

type Health =
  | number
  | Formula
  | DamageBonus

type Upgrade = { with: string; become: string };

class GenericCard {
  name?: string
  rarity?: Rarity
  health?: Health
  movement?: null | Movement
  attacks?: null | Array<Attack>
  passive?: null | string
  ability?: null | string | Attack
  uses?: number | "∞"
  upgrades?: Array<Upgrade>

  constructor(state: Partial<GenericCard>) {
    Object.assign(this, state)
  }
}


export function print(target: HTMLElement, cards: GenericCard[]) {
  const printer = new CardPrinter(target);
  cards.forEach(c => printer.print(c));
}


export function asDom(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstElementChild as HTMLElement;
}