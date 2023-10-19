import {Range, GenericCard, Health, Movement, DamageBonus, Damage, Attack, Upgrade, RangeDirections, orthogonalRanges, adjacentRanges, diagonalRanges, forwardRanges, NONE} from "../pack_base.js";

const FarmerCard = new GenericCard({
  name: "Farmer",
  rarity: "Common",
  health: {
    type: "d6",
    bonus: 2,
  },
  movement: {
    distance: 1,
    direction: orthogonalRanges,
  },
  attacks: [
    {
      name: "Pitchfork",
      range: {
        distance: 1,
        direction: orthogonalRanges,
      },
      damage: {
        type: "d4",
        bonus: 0
      },
    },
  ],
  passive: null,

  ability: {
    name: "Chicken",
    range: {
      distance: 1,
      direction: adjacentRanges,
    },
    damage: {
      type: "summon",
      name: "Chicken",
      health: {
        type: "d4",
        bonus: 1,
      },
      movement: {
        distance: 2,
        direction: adjacentRanges,
      },
      attacks: [
        {
          name: "Peck",
          range: {
            distance: 1,
            direction: diagonalRanges,
          },
          damage: 2,
        },
      ],
    },
  },
  uses: 1,
  upgrades: [{ with: "Tractor", become: "Tractor Rider" }],
})

const ScarecrowCard = new GenericCard({
  name: "Scarecrow",
  rarity: "Common",
  health: 6,
  movement: {
    distance: 1,
    direction: orthogonalRanges,
  },
  attacks: [
    {
      name: "Crow Launch",
      range: {
        distance: 1,
        direction: forwardRanges,
      },
      damage: 1,
    },
  ],
  passive: "Enemy cards within 1 space the Scarecrow can not Attack or use an Ability",
  ability: null,
  uses: 0,
  upgrades: [],
})

const TractorCard = new GenericCard({
  name: "Tractor",
  rarity: "Common",
  health: {
    type: ["d6", "d6"],
    bonus: 3,
  },
  movement: null,
  attacks: [
    {
      name: "Ram",
      range: {
        distance: 0,
        direction: orthogonalRanges,
      },
      damage: {
        type: "d4",
        bonus: 0,
      }, 
      notes: "Pushes token back one space. If token is not able to be pushed: backed into a wall or Castle Card, then it is dealt + 1 damage."
    },
  ],
  passive: "Can be pushed in any direction by a Friendly Card",
  ability: null,
  uses: 0,
  upgrades: [{ with: "Farmer", become: "Tractor Rider" }],
})

const TractorRiderCard = new GenericCard({
  name: "Tractor Rider",
  rarity: "Uncommon+",
  health: "Max Tractor Health",
  movement: {
    distance: 1,
    direction: orthogonalRanges,
  },
  attacks: [
    {
      name: "Pitchfork",
      range: {
        distance: 1,
        direction: orthogonalRanges,
      },
      damage: {
        type: "d4",
        bonus: 0,
      },
    },
    {
      name: "Ram",
      range: {
        distance: 0,
        direction: orthogonalRanges,
      },
      damage: {
        type: "d4",
        bonus: 0,
      },
      notes: "Pushes token back one space. If token is not able to be pushed: backed into a wall or Castle Card, then it is dealt + 1 damage."
    },
  ],
  passive: null,
  ability: "Repair: Heal up to 3 Health",
  uses: 2,
  upgrades: [],
})

const JackOLanternCard = new GenericCard({
  name: "Jack-O-Lantern",
  rarity: "Uncommon",
  health: {
    type: "d4",
    bonus: 0,
  },
  movement: null,
  attacks: [
    {
      name: "Fire Stream",
      range: {
        distance: 3,
        direction: adjacentRanges,
      },
      damage: {
        type: "d8",
        bonus: 0,
      },
    },
  ],
  passive: null,
  ability: null,
  uses: 0,
})

const SiloCard = new GenericCard({
  name: "Silo",
  rarity: "Uncommon",
  health: 12,
  movement: null,
  attacks: [
    {
      name: "Cow",
      range: {
        distance: 1,
        direction: adjacentRanges,
      },
      damage: {
        type: "summon",
        name: "Cow",
        health: {
          type: "d8",
          bonus: 2,
        },
        movement: {
          distance: 1,
          direction: adjacentRanges,
        },
        attacks: [
          {
            name: "Stomp",
            range: {
              distance: 1,
              direction: orthogonalRanges,
            },
            damage: 2,
          },
        ],
      },
    },
    {
      name: "Horse",
      range: {
        distance: 1,
        direction: adjacentRanges,
      },
      damage: {
        type: "summon",
        name: "Horse",
        health: {
          type: ["d4", "d4"],
          bonus: 0,
        },
        movement: {
          distance: 2,
          direction: adjacentRanges,
        },
        attacks: [
          {
            name: "Kick",
            range: {
              distance: 1,
              direction: adjacentRanges,
            },
            damage: {
              type: "d4",
              bonus: 0,
            },
          },
        ],
      },
    },
  ],
  passive:
    "The Silo gets discarded after 3 turns and can only be used once per turn.",
  ability: null,
  uses: 0,
  upgrades: [],
})

export const farmPack = [
  FarmerCard, ScarecrowCard, JackOLanternCard,
  SiloCard, TractorCard, TractorRiderCard
]
