import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

// iteracja po tablicy
const listItems = galleryItems
  .map(
    (galleryItem) =>
      `<a class="gallery__item" href="${galleryItem.original}">
        <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
    </a>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", listItems);

const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionType: "attr",
  captionData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
