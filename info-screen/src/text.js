const values = [
    "RUNWAYS",
    "WORKSHOPS",
    "TALKS",
    "SHOWROOMS"
];

const targetText = document.getElementById("changingText");

let index = 0;

setInterval(() => {
    targetText.classList.add('fade-out');
    targetText.classList.remove('fade-in');
    setTimeout(() => {
        targetText.textContent = values[index];
        targetText.classList.remove('fade-out');
        targetText.classList.add('fade-in');
    }, 500);
    index = (index + 1) % values.length;
}, 2000)