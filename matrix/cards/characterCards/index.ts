import { farmPack } from "./farmpack.js";
import { militiaPack } from "./militiapack.js";
import { medievalPack } from "./medievalpack.js"
import { print } from "../pack_base.js";

const packs = {
    militia: militiaPack,
    farm: farmPack,
    medieval: medievalPack
}

export function run(target: HTMLElement, pack: keyof typeof packs) {
    if (!target) throw "target not found";
    print(target, packs[pack]);
}