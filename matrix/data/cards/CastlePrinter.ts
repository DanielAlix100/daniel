import { Attack, Damage, DamageBonus, Health, NONE } from "./pack_base.js";
import { Castle, asDom } from "./farmCastles.js";

export class CastlePrinter {

    private dom: HTMLElement;

    constructor(dom: HTMLElement) {
        this.dom = dom;
    }

    private printHealth(health?: Health) {
        if (!health) return NONE;
        if (typeof health == "string") return health;
        if (typeof health == "number") return health;
        const typedHealth = health as { type: string; bonus: number; };
        if (typedHealth.type) {
            return this.printDamageBonus(health);
        }
        return "todo";
    }
    printAttack(attack?: Attack | Attack[]): string {
        if (!attack) return "none";
        if (Array.isArray(attack)) {
            return attack.map(a => this.printAttack(a)).join("");
        } else {
            const damage = this.printDamage(attack.damage);
            return `
    <div class="attack">
      <span class="label">${attack.name}</span>, 
      ${damage} 
      ${attack.notes ? (", " + attack.notes) : ""}
    </div>`;
        }
    }

    printDamageBonus(dice?: DamageBonus) {
        if (!dice) return "none";
        if (!dice.bonus) return dice.type;
        return `${dice.type}+${dice.bonus}`;
    }

    printDamage(damage?: Damage) {
        if (!damage) return "none";
        if (typeof damage === "number") return `${damage}`;
        switch (damage.type) {
            case "summon":
                return `${this.printSummon(damage)}`;
            default:
                return `Damage: ${this.printDamageBonus(damage)}`;
        }
    }
    printSummon(damage: Damage) {
        if (typeof damage == "number") throw "expecting summon";
        if (damage.type !== "summon") throw "expect a summon";
        const health = this.printHealth(damage.health);
        return `<br/>
      Health: ${health}`;
    }

    print(card: Castle) {
        const health = this.printHealth(card.health);
        const ability = this.printAbility(card.ability);
        const damage = this.printDamage(card.damage);

        const cardClass = card.rarity?.includes("+") ? "plus" : "standard";

        const template = `
      <div class='castle'>
        <div class='card-name ${cardClass}'>${card.name}</div>
        <div class='rarity ${card.rarity}'>
          <span class="bold">Rarity:</span>
          <span class="value">${card.rarity}</span>
        </div>
        <div class='health'><span class="bold">Health: </span>${health}</div>
        <div class='damage'><span class="bold">Damage: </span>${damage}</div>
        <div class='passive'><span class="bold">Passive: </span>${card.passive || "none"}</div>
        <div class='ability'><span class="bold">Ability: </span>${ability}</div>
        <div class='uses'><span class="bold">Uses: </span>${card.uses}</div>
      </div>`;

        this.dom.append(asDom(template));
    }

    printAbility(abilities: string | Attack | null | undefined) {
        if (!abilities) return "none";
        if (typeof abilities === "string") return abilities;
        return this.printAttack(abilities);
    }


}
