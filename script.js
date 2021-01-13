const placeHolderMessage = document.querySelector(".place-holder-message");
const searchForm = document.getElementById("search-form");
const booksDisplay = document.getElementById("books-display");
const defaultBookImage = "./img/—Pngtree—book icon_3728063.png";
const googleBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";
let apiKey = "&key=AIzaSyCw6aeDwd2srAlaiVBFSSBvyl2O7atCTaA";

searchForm.addEventListener("submit", () => {
  placeHolderMessage.style.display = "none";
  let searchInput = document.getElementById("search-input").value;
  let searchQuery = `${googleBooksURL}${searchInput}${apiKey}`;

  getBooks(searchQuery);
});

async function getBooks(query) {
  const booksPromise = await fetch(query);
  const booksData = await booksPromise.json();

  if (booksData.items) {
    displayBooks(booksData.items);
  } else {
    booksDisplay.innerHTML = "";
    placeHolderMessage.style.display = "block";
    placeHolderMessage.innerHTML = "Sorry no results!";
  }
}

function displayBooks(books) {
  booksDisplay.innerHTML = "";
  books.forEach((book) => {
    let volumeInfo = book.volumeInfo;
    let bookImage = volumeInfo.imageLinks;
    let title = volumeInfo.title || "N/A";
    let authors = volumeInfo.authors || "N/A";
    let previewLink = volumeInfo.previewLink || "N/A";
    let publishdate = volumeInfo.publishedDate || "N/A";
    let publisher = volumeInfo.publisher || "N/A";
    let smallThumbnail =
      bookImage && bookImage.smallThumbnail
        ? bookImage.smallThumbnail
        : defaultBookImage;

    let div = document.createElement("div");
    div.innerHTML = `
    
    <h3>  ${title} </h3>
    <div class= "book-img">
     <img src= "${smallThumbnail}" alt= "Image book cover "> 
     </div>
      <div class = "book-details">
      <small> <strong>Author(s)</strong>: ${authors}</small>
      <small> <strong>Publishers</strong>: ${publisher}</small>
      <small> <strong>Published</strong>: ${publishdate}</small>
      </div>
      <a href = "${previewLink}" class ="book-link" target="_blank">  Google Books Preview </a>
       `;
    div.classList.add("book-styling");
    booksDisplay.append(div);
  });
}
