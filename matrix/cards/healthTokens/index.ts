export function run() {
    const target = document.querySelector<HTMLElement>(".grid-8-by")!;
    for (let i = 0; i < 10 * 20; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const value = [1, 3, 5, 10, 2][Math.floor(i / 50)];
        cell.innerHTML = `<div class="circle">${value}</div>`;
        target.appendChild(cell);
    }

}