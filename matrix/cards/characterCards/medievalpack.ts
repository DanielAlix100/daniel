
import { GenericCard, Health, Movement, DamageBonus, Damage, Attack, Upgrade, RangeDirections, orthogonalRanges, adjacentRanges, diagonalRanges, forwardRanges, aheadRanges, NONE } from "../pack_base.js";

const PeasantCard = new GenericCard({
    name: "Peasant",
    rarity: "Common",
    health: {
        type: "d4",
        bonus: 0,
    },
    movement: {
        distance: 1,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Punch",
            range: {
                distance: 1,
                direction: adjacentRanges,
            },
            damage: {
                type: "d4",
                bonus: -1
            },
        },
    ],
    passive: "If this token is discarded you may place a card from your hand as a Free Action on the space where this token died.",
    ability: NONE,
    uses: 0,
    upgrades: [],
})

const KnightCard = new GenericCard({
    name: "Knight",
    rarity: "Rare",
    health: {
        type: "d12",
        bonus: 12,
    },
    movement: {
        distance: 1,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Sword",
            range: {
                distance: 1,
                direction: adjacentRanges
            },
            damage: {
                type: "d8",
                bonus: 2,
            },
        },
        {
            name: "Shield Bash",
            range: {
                distance: 1,
                direction: orthogonalRanges,
            },
            damage: {
                type: "d4",
                bonus: 0,
            },
            notes: "50% chance to make target unable to perform any actions for 1 Turn"
        },
    ],
    passive: "Takes -1 damage",
    ability: NONE,
    uses: 0,
    upgrades: []
});

const PriestCard = new GenericCard({
    name: "Priest",
    rarity: "Uncommon",
    health: {
        type: "d4",
        bonus: 2
    },
    movement: {
        distance: 1,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Heal",
            range: {
                distance: 1,
                direction: orthogonalRanges
            },
            damage: {
                type: ["-d4", "-d4"],
                bonus: 0
            },
            notes: "Can only be used on Friendly Tokens"
        }
    ],
    passive: NONE,
    ability: "Shield: Choose a Friendly Token on an Adjacent Space, the next Attack directed at that token does no damage.",
    uses: 1,
    upgrades: [],
})
const JesterCard = new GenericCard({
    name: "Jester",
    rarity: "Rare",
    health: "5",
    movement: {
        distance: 2,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Knife",
            range: {
                distance: 1,
                direction: diagonalRanges
            },
            damage: {
                type: "d4",
                bonus: 6,
            },
        }
    ],
    passive: NONE,
    ability: "Switch: Swap this Token's position with a Friendly Token's Position on the board.",
    uses: 1,
    upgrades: [],
})
const QueenCard = new GenericCard({
    name: "Queen",
    rarity: "Rare",
    health: {
        type: ["d6", "d6", "d6"],
        bonus: 0,
    },
    movement: {
        distance: 1,
        direction: diagonalRanges
    },
    attacks: [{
        name: "Army",
        range: {
            distance: 1,
            direction: adjacentRanges
        },
        damage: {
            type: "summon",
            name: "Soldier",
            health: {
                type: ["d4", "d4"],
                bonus: 0,
            },
            movement: {
                distance: 1,
                direction: orthogonalRanges
            },
            attacks: [{
                name: "Sword",
                damage: {
                    type: "d4",
                    bonus: 2,
                },
                range: {
                    distance: 1,
                    direction: adjacentRanges,
                }
            }]
        }
    },
    ],
    passive: NONE,
    ability: "Command: All soldiers may perform 1 action as a Free Action",
    uses: 1,
    upgrades: []
})
const KingCard = new GenericCard({
    name: "King",
    rarity: "Epic",
    health: {
        type: ["d6", "d6", "d6"],
        bonus: 12
    },
    movement: {
        distance: 1,
        direction: adjacentRanges
    },
    attacks: [
        {
            name: "Zweihänder",
            range: {
                distance: 1,
                direction: orthogonalRanges,
            },
            damage: {
                type: ["d8", "d8"],
                bonus: 4,
            },
        },
    ],
    passive: "Any Friendly Tokens next to next to this Token have + 2 damage",
    ability: "Battle Frenzy: Perform 2 Actions on this Token as Free Actions",
    uses: 2,
    upgrades: []
})

export const medievalPack = [
    PeasantCard, KnightCard, PriestCard, JesterCard, QueenCard, KingCard
];