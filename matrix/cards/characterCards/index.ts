import { farmPack } from "./farmpack.js";
import { militiaPack } from "./militiapack.js";
import { print } from "../pack_base.js";

const packs = {
    militia: militiaPack,
    farm: farmPack
}
export function run(target: HTMLElement, pack: keyof typeof packs) {
    if (!target) throw "target not found";
    print(target, packs[pack]);
}