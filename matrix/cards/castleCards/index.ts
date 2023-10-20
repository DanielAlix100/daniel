import { print as farmPrint, castles as farmCastles } from "./farmCastles.js";
import { print as militiaPrint, castles as militiaCastles } from "./militiaCastles.js";

export function run(target: HTMLElement, pack: "farm" | "militia") {
    if (!target) throw 'target not found';

    switch (pack) {
        case "farm":
            farmPrint(target, farmCastles);
            break;
        case "militia":
            militiaPrint(target, militiaCastles);
            break;
        default:
            throw `${pack} is an invalid pack name`;
    }

}