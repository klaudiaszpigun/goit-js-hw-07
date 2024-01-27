import { galleryItems } from "./gallery-items.js";

//zmienna za pomocą, której dostajemy się do galeri
const gallery = document.querySelector(".gallery");

const listItems = galleryItems
  .map(
    (galleryItem) =>
      `<li class="gallery__item">
            <a class="gallery__link" href="${galleryItem.original}">
                <img
            class="gallery__image"
            src="${galleryItem.preview}"
            data-source="${galleryItem.original}"
            alt="${galleryItem.description}"
            >
            </a>
    </li>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", listItems);

let activeLightbox;

// Obsługa kliknięć na obrazki w galerii
gallery.addEventListener("click", (event) => {
  event.preventDefault();

  const clickedElement = event.target;
  if (clickedElement.nodeName !== "IMG") {
    return;
  }

  const largeImageUrl = clickedElement.dataset.source;

  const lightbox = basicLightbox.create(`
    <img src="${largeImageUrl}" class="gallery__image">
  `);
  lightbox.show();

  activeLightbox = lightbox;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeLightbox) {
    // Zamknij otwarte okno Lightbox
    activeLightbox.close();
    // Zresetuj zmienną przechowującą otwarte okno Lightbox
    activeLightbox = null;
  }
});
