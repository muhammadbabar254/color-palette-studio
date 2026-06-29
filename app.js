const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const exportBtn = document.getElementById("exportBtn");

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");
}

function generatePalette() {

    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        let color = randomColor();

        let div = document.createElement("div");
        div.className = "color";
        div.style.background = color;
        div.innerText = color;

        div.addEventListener("click", () => {
            navigator.clipboard.writeText(color);
            div.innerText = "Copied!";
            setTimeout(() => div.innerText = color, 800);
        });

        palette.appendChild(div);
    }
}

generateBtn.addEventListener("click", generatePalette);

exportBtn.addEventListener("click", () => {

    let colors = [...document.querySelectorAll(".color")]
        .map(c => `--color: ${c.innerText};`)
        .join("\n");

    const blob = new Blob([colors], {type:"text/plain"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "palette.css";
    link.click();
});