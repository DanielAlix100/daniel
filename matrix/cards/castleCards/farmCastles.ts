import type { Castle } from "./CastlePrinter.js";

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