import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const listItems = galleryItems
  .map(
    (galleryItem) =>
      `<a class="gallery__link" href="${galleryItem.original}">
      <img
        class="gallery__image"
        src="${galleryItem.preview}"
        data-source="${galleryItem.original}"
        alt="${galleryItem.description}"
      >
  </a>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", listItems);

const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionType: "attr",
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
