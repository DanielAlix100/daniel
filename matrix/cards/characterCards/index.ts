import { farmPack } from "./farmpack.js";
import { militiaPack } from "./militiapack.js";
import { print } from "../pack_base.js";

export function run() {
    const target = document.querySelector<HTMLElement>(".cards");
    if (!target) throw "target not found";
    print(target, [ ...militiaPack]);
}