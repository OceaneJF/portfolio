const buttons = document.querySelectorAll("button");
const cards = document.querySelectorAll(".card");


buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        changeColor(event);
        const text = event.target.textContent;
        filterCards(text);
    })
})

const changeColor = (event) => {
    buttons.forEach((button) => {
        if (button != event.target) {
            button.style.backgroundColor = '';
            button.style.color = '';
        } else {
            button.style.backgroundColor = 'var(--violet)';
            button.style.color = 'white';
        }

    })
}

const filterCards = (text) => {
    cards.forEach((card) => {

        const skills = card.getAttribute('data-skills').split(',');
        console.log(skills);
        let trouve = false;
        for (let skill of skills) {
            if (skill == text) {
                trouve = true;
            }
        }
        if (trouve || text == 'Tous') {
            card.parentElement.style.display = 'flex';
        } else {
            card.parentElement.style.display = 'none';
        }
    })
}
