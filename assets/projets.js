const buttons = document.querySelectorAll("button");
const cards = document.querySelectorAll(".card");
const modalProjet = document.querySelector(".modal-projet h2");
const modalTitle = document.querySelector(".modal-projet > p");
const modalTools = document.querySelector(".modal-projet-tools");
const modalSteps = document.querySelector(".modal-projet-step");
const modalImg = document.querySelector("#projet-img");
const modalImgFigure = document.querySelector(".modal-projet-figure");
const modalTextRes = document.querySelector(".text-result");
const modalSkills = document.querySelector(".modal-projet-result ul");
const modalTextUpGrade = document.querySelector(".text-upgrade");
const btnVoirPlus = document.querySelector(".voirPlus");

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    changeColor(event);
    const text = event.target.textContent;
    filterCards(text);
  });
});

const changeColor = (event) => {
  buttons.forEach((button) => {
    if (button != event.target) {
      button.style.backgroundColor = "";
      button.style.color = "";
    } else {
      button.style.backgroundColor = "var(--violet)";
      button.style.color = "white";
    }
  });
};

const filterCards = (text) => {
  cards.forEach((card) => {
    const skills = card.getAttribute("data-skills").split(",");
    let trouve = false;
    for (let skill of skills) {
      if (skill == text) {
        trouve = true;
      }
    }
    if (trouve || text == "Tous") {
      card.parentElement.style.display = "flex";
    } else {
      card.parentElement.style.display = "none";
    }
  });
};

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    const idProjet = e.currentTarget.parentElement.getAttribute("data-id");
    handleCard(idProjet);
  });
});

const handleCard = (idProjet) => {
  fetch("./assets/json/projet.json")
    .then((res) => res.json())
    .then((data) => {
      const cardInfo = data[idProjet];
      if (cardInfo) {
        modalProjet.innerHTML = cardInfo.projet;
        modalTitle.innerHTML = cardInfo.titre;

        modalTools.innerHTML = "";

        extractTools(cardInfo.outils).forEach((tool) => {
          modalTools.appendChild(tool);
        });

        modalSteps.innerHTML = "";

        extractSteps(cardInfo.etapes).forEach((step) => {
          modalSteps.appendChild(step);
        });

        modalImg.src = `./assets/img/projet/${cardInfo.image}`;
        modalImgFigure.innerHTML = "";
        modalImgFigure.textContent += "figure : " + cardInfo.figure;

        modalTextRes.textContent = cardInfo.resultat;

        modalSkills.innerHTML = "";
        cardInfo.competences.forEach((skill) => {
          let li = document.createElement("li");
          li.textContent = skill;
          modalSkills.appendChild(li);
        });

        modalTextUpGrade.textContent = cardInfo.amelioration;
        btnVoirPlus.href = cardInfo.voirPlus;
      } else {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
};

const extractTools = (tools) => {
  let outils = [];
  for (let outil of tools) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = `./assets/img/projet/outils/${outil.image}`;
    img.width = 40;
    img.height = 40;
    img.alt = outil;
    let p = document.createElement("p");
    p.innerHTML = outil.nom;
    div.appendChild(img);
    div.appendChild(p);
    outils.push(div);
  }
  return outils;
};

const extractSteps = (steps) => {
  let etapes = [];
  // if first do not add arrow
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) {
      let step = steps[i];
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = `./assets/img/arrow.png`;
      img.alt = step;
      img.classList.add("arrow");
      let p = document.createElement("p");
      p.innerHTML = step;
      p.classList.add("text-boxed");
      div.appendChild(img);
      div.appendChild(p);
      etapes.push(div);
    } else {
      let step = steps[i];
      let div = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = step;
      p.classList.add("text-boxed");
      div.appendChild(p);
      etapes.push(div);
    }
  }
  return etapes;
};
