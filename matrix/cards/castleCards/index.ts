import { print, castles } from "./farmCastles.js";

export function run() {
    const target = document.querySelector<HTMLElement>(".castles");
    if (!target) throw 'target not found';
    
    print(target, castles);
}