const buttons = document.querySelectorAll("button.accordion_button");
const arrows = document.querySelectorAll(".fa-solid.fa-caret-down");

function openItem() {
    const content = this.nextElementSibling;
    const arrow = this.querySelector(".fa-caret-down");
    const isOpen = content.classList.contains('active_box');

    closeAllItems();
    if (!isOpen) {
        content.classList.add('active_box');
        if (arrow) arrow.classList.add('active_arrow');
    }
}

function closeAllItems() {
    const activeBoxes = document.querySelectorAll('.info');
    activeBoxes.forEach(box => box.classList.remove('active_box'));
    arrows.forEach(arrow => arrow.classList.remove('active_arrow'));
}

buttons.forEach(button => {
    button.addEventListener('click', openItem);
});