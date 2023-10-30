
import { GenericCard, Health, Movement, DamageBonus, Damage, Attack, Upgrade, RangeDirections, orthogonalRanges, adjacentRanges, diagonalRanges, forwardRanges, aheadRanges, NONE } from "../pack_base.js";

const RiflemanCard = new GenericCard({
    name: "Rifleman",
    rarity: "Common",
    health: {
        type: "d6",
        bonus: 0,
    },
    movement: {
        distance: 1,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Rifle",
            range: {
                distance: 3,
                direction: adjacentRanges,
            },
            damage: 1,
        },
    ],
    passive: "If this token is discarded you may place the Rifleman card into your hand. If you already are at Max Card Limit you may not use this passive",

    ability: NONE,
    uses: 0,
    upgrades: [{ with: "2 Actions", become: "Sniper" }],
})

const GrenadierCard = new GenericCard({
    name: "Grenadier",
    rarity: "Uncommon",
    health: {
        type: "d8",
        bonus: 2,
    },
    movement: {
        distance: 1,
        direction: orthogonalRanges,
    },
    attacks: [
        {
            name: "Grenade",
            range: {
                distance: 2,
                direction: orthogonalRanges
            },
            damage: {
                type: ["d4", "d4"],
                bonus: 0,
            },
            notes: "On next turn, The target and adjacent spaces recieve amount of damage specified"
        }
    ],
    passive: NONE,
    ability: NONE,
    uses: 0,
    upgrades: []
});

const SniperCard = new GenericCard({
    name: "Sniper",
    rarity: "Uncommon+",
    health: "Max Sniper Health",
    movement: {
        distance: 1,
        direction: adjacentRanges,
    },
    attacks: [
        {
            name: "Sniper Rifle",
            range: {
                distance: 4,
                direction: adjacentRanges
            },
            damage: {
                type: ["d4"],
                bonus: 2,
            },
        }
    ],
    passive: NONE,
    ability: NONE,
    uses: 0,
    upgrades: [],
})
const OfficerCard = new GenericCard({
    name: "Officer",
    rarity: "Uncommon",
    health: "6",
    movement: {
        distance: 1,
        direction: orthogonalRanges,
    },
    attacks: [
        {
            name: "Pistol",
            range: {
                distance: 2,
                direction: orthogonalRanges
            },
            damage: 1,
        }
    ],
    passive: NONE,
    ability: "Move Out!: You may play a card from your hand onto any space next to this Token",
    uses: 3,
    upgrades: [],
})
const BarricadeCard = new GenericCard({
    name: "Barricade",
    rarity: "Common",
    health: 10,
    movement: null,
    attacks: null,
    passive: "enemy tokens cannot attack anything behind this token",
    ability: "Rebuild: If a friendly Token is next to this Token this Token may heal 2 Health",
    uses: "∞",
    upgrades: []
})
const TankCard = new GenericCard({
    name: "Tank",
    rarity: "Rare",
    health: {
        type: [ "d8", "d8"],
        bonus: 10
    },
    movement: {
        distance: 1,
        direction: orthogonalRanges
    },
    attacks: [
        {
            name: "120 mm Shell",
            range: {
                distance: 4,
                direction: aheadRanges,
            },
            damage: {
                type: ["d4", "d4", "d4"],
                bonus: 0,
            },
            notes: "Does + 2 damage to Castle Cards",
        }
    ],
    passive: NONE,
    ability: NONE,
    uses: 0,
    upgrades: []
})

export const militiaPack = [
    RiflemanCard, GrenadierCard, SniperCard, OfficerCard, BarricadeCard, TankCard
];

