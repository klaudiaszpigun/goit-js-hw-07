import { galleryItems } from "./gallery-items.js";

// zmienna galerii w html
const gallery = document.querySelector(".gallery");

// iteracja po tablicy
const listItems = galleryItems
  .map(
    (galleryItem) =>
      `<li class="gallery__item">
      <a class="gallery__link" href="${galleryItem.original}">
        <img
          class="gallery__image"
          src="${galleryItem.preview}"
          data-source="${galleryItem.original}"
          alt="${galleryItem.description}">
        </img>
      </a>
    </li>`
  )
  .join("");

// elementy zostały już dodane do HTML
gallery.insertAdjacentHTML("afterbegin", listItems);

// usuwamy ustawienia przeglądaki do całej galerii
gallery.addEventListener("click", (event) => {
  event.preventDefault();
});
