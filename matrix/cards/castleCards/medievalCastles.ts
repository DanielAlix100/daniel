import { NONE, behindRanges } from "../pack_base.js";
import { Castle } from "./CastlePrinter.js";

export const castles = [
    {
        name: "Castle",
        rarity: "Rare",
        health: 35,
        damage: 2,
        passive: NONE,
        ability: {name: "Artillery", range: {
            direction:  behindRanges,
        },  damage: {type: ["d4", "d4", "d4", "d4", "d4", "d4", "d4", "d4"],
    bonus: 0}
    },
        uses: 3
    },

] satisfies Partial<Castle>[];