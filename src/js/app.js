"use strict";

const initApp = () => {
  createGalery();
  scrollNav();
  navFixed();
};

const scrollNav = () => {
  const links = document.querySelectorAll(".nav-principal");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const scrollSite = e.target.attributes.href.value;
      const section = document.querySelector(scrollSite);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const navFixed = () => {
  const scroll = document.querySelector(".header");
  const aboutFestival = document.querySelector(".about-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", () => {
    if (aboutFestival.getBoundingClientRect().bottom < 0) {
      scroll.classList.add("fijar");
      body.classList.add("body-scroll");
    } else {
      scroll.classList.remove("fijar");
      body.classList.remove("body-scroll");
    }
  });
};

const asignEvents = (pics) => {
  pics.forEach((e) => {
    e.addEventListener("click", (e) => {
      const id = e.target.id;
      const picture = document.createElement("picture");
      picture.innerHTML = `<source srcset="img/grande/${id}.avif" type="image/avif">
        <source srcset="img/grande/${id}.webp" type="image/webp">
        <img loading="lazy"  width="400" height="300" src="img/grande/${id}.jpg" alt="Imagen del concierto ${id}">`;

      const overlay = document.createElement("section");
      overlay.appendChild(picture);
      overlay.classList.add("overlay");
      overlay.addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.remove("body-freeze");
        overlay.remove();
      });
      const closeModal = document.createElement("p");
      closeModal.textContent = "X";
      closeModal.classList.add("btn-cerrar");

      closeModal.addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.remove("body-freeze");
        overlay.remove();
      });

      overlay.appendChild(closeModal);

      const body = document.querySelector("body");
      body.appendChild(overlay);
      body.classList.add("body-freeze");
    });
  });
};

const createGalery = () => {
  const galery = document.querySelector(".galeria-imagenes");
  const pics = [];
  for (let i = 1; i <= 12; i++) {
    const picture = document.createElement("picture");
    picture.classList.add("image");
    picture.innerHTML = `<source srcset="img/thumb/${i}.avif" type="image/avif">
        <source srcset="img/thumb/${i}.webp" type="image/webp">
        <img id="${i}" loading="lazy"  width="400" height="300" src="img/thumb/${i}.jpg" alt="Imagen del concierto ${i}">`;
    galery.appendChild(picture);
    pics.push(picture);
  }
  asignEvents(pics);
};

document.addEventListener("DOMContentLoaded", initApp);
