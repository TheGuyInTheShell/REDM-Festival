"use strict";

const initApp = () => {
  crearGaleria();
  scrollNav();
  navFixed();
};

const scrollNav = () => {
  const enlaces = document.querySelectorAll(".nav-principal");
  enlaces.forEach((enl) => {
    enl.addEventListener("click", (e) => {
      e.preventDefault();
      const scrollSite = e.target.attributes.href.value;
      const section = document.querySelector(scrollSite);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const navFixed = () => {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".about-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", () => {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijar");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijar");
      body.classList.remove("body-scroll");
    }
  });
};

const asignarEventos = (pics) => {
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
      const cerrarModal = document.createElement("p");
      cerrarModal.textContent = "X";
      cerrarModal.classList.add("btn-cerrar");

      cerrarModal.addEventListener("click", () => {
        const body = document.querySelector("body");
        body.classList.remove("body-freeze");
        overlay.remove();
      });

      overlay.appendChild(cerrarModal);

      const body = document.querySelector("body");
      body.appendChild(overlay);
      body.classList.add("body-freeze");
    });
  });
};

const crearGaleria = () => {
  const galeria = document.querySelector(".galeria-imagenes");
  const pics = [];
  for (let i = 1; i <= 12; i++) {
    const picture = document.createElement("picture");
    picture.classList.add("image");
    picture.innerHTML = `<source srcset="img/thumb/${i}.avif" type="image/avif">
        <source srcset="img/thumb/${i}.webp" type="image/webp">
        <img id="${i}" loading="lazy"  width="400" height="300" src="img/thumb/${i}.jpg" alt="Imagen del concierto ${i}">`;
    galeria.appendChild(picture);
    pics.push(picture);
  }
  asignarEventos(pics);
};

document.addEventListener("DOMContentLoaded", initApp);
