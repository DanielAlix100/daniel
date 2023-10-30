import { Health, NONE, Movement, DamageBonus, Dice, Damage, Range, Attack, RangeDirections, Upgrade, GenericCard, asDom } from "../pack_base.js";

export class CardPrinter {

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

  printMovement(movement?: Movement) {
    if (!movement) return NONE;
    const direction = this.printDirection(movement.direction);
    return `<div class="directions">${direction}</div>:${movement.distance}`;
  }

  printDamageBonus(dice?: DamageBonus) {
    if (!dice) return "none";
    const diceType = this.printDice(dice.type);
    if (!dice.bonus) return diceType;
    return `${diceType}+${dice.bonus}`;
  }

  printDice(type: Dice | Dice[]): string {
    if (Array.isArray(type)) {
      const hash = {} as Record<string, number>;
      type.forEach(t => hash[t] = (hash[t] || 0) + 1);
      return Object.keys(hash).map(key => `${hash[key]}${key}`).join("+");
    }
    return type;
  }

  printDamage(damage?: Damage) {
    if (!damage) return "none";
    if (typeof damage === "number") return `<span class="bold">Damage:</span> ${damage}`;
    switch (damage.type) {
      case "summon":
        return `${this.printSummon(damage)}`;
      default:
        return `<span class="bold">Damage:</span> ${this.printDamageBonus(damage)}`;
    }
  }
  printSummon(damage: Damage) {
    if (typeof damage == "number") throw "expecting summon";
    if (damage.type !== "summon") throw "expect a summon";
    const health = this.printHealth(damage.health);
    const movement = this.printMovement(damage.movement);
    const attack = this.printAttack(damage.attacks);
    return `<br/>
    <span class="bold">Health:</span> ${health}, 
    <span class="bold">Movement:</span> ${movement}, 
    <span class="bold">Attack:</span> ${attack}`;
  }

  printRange(range?: Range) {
    if (!range) return NONE;
    const direction = this.printDirection(range.direction);
    const distance = range.distance;
    return `<div class="directions">${direction}</div>: ${distance}`;
  }

  printAttack(attack?: Attack | Attack[]): string {
    if (!attack) return NONE;
    if (Array.isArray(attack)) {
      return attack.map(a => this.printAttack(a)).join("");
    }
    const damage = this.printDamage(attack.damage);
    const range = `<span class="bold">Range:</span> ${this.printRange(attack.range)}`;
    const notes = attack.notes ? `<span class="bold">Notes:</span> ${attack.notes}` : "";
    const items = [range, damage, notes].filter(i => !!i).join(", ");

    return `<span class="attack"><span class="label">${attack.name}</span>, ${items}</span>`;
  }

  printDirection(direction: string | RangeDirections[]): string {
    if (!direction) return NONE;
    if (typeof direction === "string") return `<div class="direction ${direction}">${direction}</div>`;
    return direction.map(d => this.printDirection(d)).join("");
  }

  printUpgrades(upgrades?: Array<Upgrade>) {
    if (!upgrades?.length) return "none";
    return upgrades?.map(upgrade => `${upgrade.with} → ${upgrade.become}`);
  }

  print(card: GenericCard) {
    const health = this.printHealth(card.health);
    const movement = this.printMovement(card.movement!);
    const attack = this.printAttack(card.attacks || []);
    const ability = this.printAbility(card.ability);
    const upgrades = this.printUpgrades(card.upgrades);

    const cardClass = card.rarity?.includes("+") ? "plus" : "standard";

    const template = `
    <div class='card'>
      <div class='card-name ${cardClass}'>${card.name}</div>
      <div class='rarity ${card.rarity}'>
        <span class="bold">Rarity</span>
        <span class="value">${card.rarity}</span>
      </div>
      <div class='health'><span class="bold title newline">Health</span>${health}</div>
      <div class='movement'><span class="bold title newline">Movement</span> ${movement}</div>
      <div class='attacks'><span class="bold title newline">Attacks</span>${attack}</div>
      <div class='passive'><span class="bold title newline">Passive</span>${card.passive || "none"}</div>
      <div class='ability'><span class="bold title newline">Ability</span>${ability}</div>
      <div class='uses'><span class="bold title newline">Uses</span>${card.uses}</div>
      <div class='upgrades'><span class="bold title newline">Upgrades</span>${upgrades}</div>
    </div>`;

    this.dom.append(asDom(template));
  }

  printAbility(abilities: string | Attack | null | undefined) {
    if (!abilities) return "none";
    if (typeof abilities === "string") return abilities;
    return this.printAttack(abilities);
  }


}
