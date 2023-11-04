const NONE = "none";

import { farmPack } from "../characterCards/farmpack.js";
import { militiaPack } from "../characterCards/militiapack.js";
import { medievalPack } from "../characterCards/medievalpack.js";
import type { DamageBonus, Dice, GenericCard, Health, Movement, RangeDirections } from "../pack_base.js";

const farmTokens = tokenizePack(farmPack);
const militiaTokens = tokenizePack(militiaPack);
const medievalTokens = tokenizePack(medievalPack);

type Token = {
    name: string | undefined;
    health: Health | undefined;
    movement: Movement | null | undefined;
}


function tokenizePack(pack: GenericCard[]) {
    const tokens = pack.map(c => ({
        name: c.name,
        health: c.health,
        movement: c.movement,
    }));

    pack.forEach(p => {
        p.attacks?.forEach(attack => {
            const damage = attack.damage;
            if (!damage) return;
            if (typeof damage === "number") return;
            if (damage.type !== "summon") return;
            const health = damage.health;
            const movement = damage.movement;
            tokens.push({
                name: damage.name,
                health,
                movement,
            });
        });

        if (!p.ability) return;
        if (typeof p.ability === "string") return;

        const damage = p.ability.damage;
        if (!damage) return;
        if (typeof damage === "number") return;
        if (damage.type !== "summon") return;

        tokens.push({
            name: damage.name,
            health: damage.health,
            movement: damage.movement,
        });
    });
    return tokens;
}

function print(target: HTMLElement, tokens: Token[]) {
    const printer = new TokenPrinter(target);
    const tokenList = [] as Token[];
    tokens.forEach(token => {
        for (let i = 0; i < 8; i++) {
            tokenList.push(token);
        }
    });
    printer.print(tokenList);
}

class TokenPrinter {
    constructor(private target: HTMLElement) { }

    print(tokens: Token[]) {
        const template = tokens.map(t => this.printToken(t)).join("");
        this.target.innerHTML = `<div class="tokens">${template}</div>`;
    }

    printToken(token: Token) {
        const name = token.name;
        const health = this.printHealth(token.health);
        const movement = this.printMovement(token.movement!);

        return `
        <div class="token">
        <span class="label value center larger underline">${name}</span>
        <span class="label">Health:</span><span class="value">${health}</span>
        <span class="label">Movement:</span><span class="value">${movement}</span>
        </div>
        `
    }

    printMovement(movement?: Movement) {
        if (!movement) return NONE;
        const direction = this.printDirection(movement.direction);
        return `<div class="directions">${direction}</div>:${movement.distance}`
    }

    printDirection(direction: string | RangeDirections[]): string {
        if (!direction) return NONE;
        if (typeof direction === "string") return `<div class="direction ${direction}">${direction}</div>`;
        return direction.map(d => this.printDirection(d)).join("");
    }


    private printHealth(health?: Health) {
        if (!health) return NONE;
        if (typeof health == "string") return health;
        if (typeof health == "number") return health;
        const typedHealth = health as { type: string; bonus: number };
        if (typedHealth.type) {
            return this.printDamageBonus(health)
        }
        return "todo";
    }

    printDamageBonus(damageBonus?: DamageBonus) {
        if (!damageBonus) return "none";
        if (!damageBonus.bonus) damageBonus
        const dice = damageBonus.type;
        return this.printDice(dice);
    }
    
    printDice(type: Dice | Dice[]): string {
        if (Array.isArray(type)) {
          const hash = {} as Record<string, number>;
          type.forEach(t => hash[t] = (hash[t] || 0) + 1);
          return Object.keys(hash).map(key => `${hash[key]}${key}`).join("+");
        }
        return type;
      }
    

}


export function run(target: HTMLElement, pack: "militia" | "farm" | "medieval") {
    if (!target) throw "target not found";
    switch (pack) {
        case "militia":
            print(target, militiaTokens);
            break;
        case "farm":
            print(target, farmTokens);
            break;
        case "medieval":
            print(target, medievalTokens);
            break;
            default:
            throw `${pack} is an invalid pack name`;
    }
}