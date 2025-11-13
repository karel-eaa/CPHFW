// Attach click handler to the click target element
document.addEventListener('DOMContentLoaded', () => {
    const clickTarget = document.getElementById('click-target');
    if (clickTarget) {
        clickTarget.addEventListener('click', () => {
            window.location.href = "schedule.html";
        });
    }
});