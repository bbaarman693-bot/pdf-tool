function showMessage(tool) {
    alert(tool + " feature is coming soon!");
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            showMessage(button.innerText);
        });
    });
});
