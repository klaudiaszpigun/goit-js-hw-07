// importowanie zdjęć z pliku
import { galleryItems } from "./gallery-items.js";

// dostęp do elementu HTML
const gallery = document.querySelector(".gallery");

// przypisanie do zmiennej listItems wyniku iteracji po tablicy zdjęć
const listItems = galleryItems
  // pętla map przyjmuje jeden parametr, którym jest element z tablicy z którego wyciąganne są właściwości które zostaną umieszczone w stringu który zawiera znaczniki HTML
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
  // metoda tablicowa join łączy tablicę w string, który będzie można dodać doo kodu HTML
  .join("");

// do kodu HTML dodajemy zmienną listItems która zawiera stringi ze znacznikami HTML
gallery.insertAdjacentHTML("afterbegin", listItems);
// przypisujemy do zmiennej activeLightbox wartość null, która informuje nas o tym, że modal nie jest wyświetlony
let activeLightbox = null;

// gdy znacznik <ul></ul> zostanie naciśnięty
gallery.addEventListener("click", (event) => {
  // usuń domyślne zachowanie przeglądarki, aby zdjęcia się nie pobierały
  event.preventDefault();

  // tworzymy zmienną clickedElement, której wartość to element na którym został wywołany event
  const clickedElement = event.target;

  // jeśli węzeł elementu na którym został wywołany event nie jest znacznikiem <img> to zakończ działanie programu
  if (clickedElement.nodeName !== "IMG") {
    return;
  }
  // zmienna largeImageUrl zawiera link do zdjęcia który będzie modalem za pomocą customowego atrybutu dataset (data-source)
  const largeImageUrl = clickedElement.dataset.source;

  // zmienna lightbox to stworzenie modalu za pomocą biblioteki basicLightbox
  const lightbox = basicLightbox.create(
    // tworzenie modalu którego zawartością będzie zdjęcie o src = zmiennej largeImageUrl
    `<img src="${largeImageUrl}" class="gallery__image">`
  );
  // za pomocą metody biblioteki basicLightbox .show(), wyświetlamy modal
  lightbox.show();

  // przypisujemy zmiennej activeLightbox wartość lightboxu ponieważ jest on widoczny na ekranie
  activeLightbox = lightbox;
});
// przy naciśnięciu klawisza wykona się callback, którego parametrem będzie event
document.addEventListener("keydown", (event) => {
  // jeśli klawisz który naciśnięto to esc oraz lightbox jest na ekranie
  if (event.key === "Escape" && activeLightbox) {
    // to za pomocą metody .close() biblioteki basicLightbox schowamy modal z ekranu
    activeLightbox.close();

    // oraz usuniemy ze zmiennej wartość lightbox i nadamy jej wartość null, ponieważ teraz, żaden modal nie jest na ekranie
    activeLightbox = null;
  }
});
