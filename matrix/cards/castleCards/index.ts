import { castles as farmCastles } from "./farmCastles.js";
import { castles as militiaCastles } from "./militiaCastles.js";
import { castles as medievalCastles } from "./medievalCastles.js";
import { print } from "./CastlePrinter.js"

export function run(target: HTMLElement, pack: string) {
    if (!target) throw 'target not found';

    switch (pack) {
        case "farm":
            print(target, farmCastles);
            break;
        case "militia":
            print(target, militiaCastles);
            break;
        case "medieval":
            print(target, medievalCastles);
            break;
        default:
            throw `${pack} is an invalid pack name`;
    }

}