// importowanie tablicy obrazów
import { galleryItems } from "./gallery-items.js";

//zmienna za pomocą, której dostajemy się do galerii
const gallery = document.querySelector(".gallery");

// zmienna listItems to iteracja po tablicy obrazów i za pomocą wartości właściwości danego elementu iterowanego, tworzony jest kod HTML
const listItems = galleryItems
  .map(
    // parametr galleryItem oznacza iterowany element
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

// dodanie do galerii którą jest znacznik <ul></ul> kod HTML, który powstał przy pomocy iteracji po tablicy
gallery.insertAdjacentHTML("afterbegin", listItems);

// deklarujemy zmienną activeLightbox która obecnie ma wartość null
let activeLightbox = null;

// gdy klikniemy na galerię wywołuje się callback
gallery.addEventListener("click", (event) => {
  // usuwa domyślne ustawienia przegllądarki
  event.preventDefault();

  // tworzymy zmienną za pomocą której łatwiej będzie nam się dostać do elementu na którym został wywołany event
  const clickedElement = event.target;
  // jeśli element na którym został wywołany event to nie jest zdjęcie
  if (clickedElement.nodeName !== "IMG") {
    // zakończ działanie programu
    return;
  }
  // w przeciwnym przypadku

  // stwórz zmienną która zawiera wartość zmiennej data-source klikniętego elementu
  const largeImageUrl = clickedElement.dataset.source;

  // zmienna lightbox zawiera utworzony za pomocą biblioteki modal
  const lightbox = basicLightbox.create(
    // w src danego zdjęcia podana jest zmienna largeImageUrl króra zawiera ścieżkę do obrazu
    `<img src="${largeImageUrl}" class="gallery__image">`
  );
  // uruchomienie zmiennej lightbox
  lightbox.show();

  // przypisanie do zmiennej activeLightbox, aktywny lightbox
  activeLightbox = lightbox;
});

// gdy nastąpi keydown
document.addEventListener("keydown", (event) => {
  // i jeśli klucz eventu to przycisk esc oraz okno lightbox będzie aktywne
  if (event.key === "Escape" && activeLightbox) {
    // zamknij otwarte okno Lightbox
    activeLightbox.close();
    // zresetuj zmienną przechowującą otwarte okno Lightbox
    activeLightbox = null;
  }
});
