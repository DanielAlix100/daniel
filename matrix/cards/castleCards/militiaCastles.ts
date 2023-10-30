import { Attack, Damage, DamageBonus, GenericCard, Health, NONE, Rarity } from "../pack_base.js";
import { Castle, CastlePrinter } from "./CastlePrinter.js";

export const castles = [
    {
        name: "Barracks",
        rarity: "Uncommon",
        health: 20,
        damage: 1,
        passive: "May draw until Card Limit is reached at the end of each turn",
        ability: "Orbital Strike: Deal 8 damage to any Token on the board",
        uses: 3
    },

] satisfies Partial<Castle>[];