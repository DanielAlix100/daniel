import { CastlePrinter } from "./CastlePrinter.js";
import { Attack, Damage, GenericCard, Health, Rarity } from "../pack_base.js";

export function asDom(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstElementChild as HTMLElement;
}

export function print(target: HTMLElement, castles: Castle[]) {
    const printer = new CastlePrinter(target);
    castles.forEach(c => {
        for (let i = 0; i < 2; i++) {
            printer.print(c);
        }
    });
}


export type Castle = {
    name: string;
    rarity: Rarity;
    health: Health;
    damage: Damage;
    ability: null | string | Attack;
    passive: null | string;
    uses: number;
}

export const castles = [
    {
        name: "Barn",
        rarity: "Common",
        health: 10,
        damage: 1,
        passive: null,
        ability: "Bounty: Pickup a card, if you are already at max Card Limit, Play the card as an Free Action",
        uses: 3
    },
    

] satisfies Partial<Castle>[];