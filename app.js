const $ = document;
const nameInput = $.getElementById("nameInput");
const authorInput = $.getElementById("authorInput");
const yearInput = $.getElementById("yearInput");
const categInput = $.getElementById("categInput");
const addBtn = $.getElementById("addBtn");
const booksTable = $.querySelector(".table_container tbody");
const showModalBtn = $.querySelector(".show_favorites");
const favoritesModal = $.querySelector(".favoriteModal");
const closeModalBtn = $.querySelector(".close_btn");
const modalOverlay = $.querySelector(".overlay");

let books = [];

function showModal() {
  favoritesModal.style.top = "30%";
  modalOverlay.style.display = "block";
}
function hideModal() {
  favoritesModal.style.top = "-100%";
  modalOverlay.style.display = "none";
}
function addBook() {
  const newBookObj = {
    id:localStorage.length + 1,
    name: nameInput.value,
    author: authorInput.value,
    year: yearInput.value,
    category: categInput.value,
    isFavorite: false,
  };
  books.push(newBookObj);
  setLocalStorage(books);
  generateBookElems(books);
}
function generateBookElems(books) {
  booksTable.innerHTML = "";
  let trElem,
    nameTdElem,
    authorTdElem,
    yearTdElem,
    categTdElem,
    favoriteTdElem,
    editTdElem,
    delTdElem,
    favoriteBtn,
    editBtn,
    delBtn;
  books.forEach(function (book) {
    nameTdElem = $.createElement("td");
    nameTdElem.textContent = book.name;
    authorTdElem = $.createElement("td");
    authorTdElem.textContent = book.author;
    yearTdElem = $.createElement("td");
    yearTdElem.textContent = book.year;
    categTdElem = $.createElement("td");
    categTdElem.textContent = book.category;
    favoriteBtn = $.createElement("i");
    favoriteBtn.classList = "btn btn-warning fa-regular fa-star";
    editBtn = $.createElement("i");
    editBtn.classList = "btn btn-primary fa-regular fa-edit";
    delBtn = $.createElement("i");
    delBtn.classList = "btn btn-danger fa-regular fa-trash-can";
    favoriteTdElem = $.createElement("td");
    favoriteTdElem.appendChild(favoriteBtn);
    editTdElem = $.createElement("td");
    editTdElem.appendChild(editBtn);
    delTdElem = $.createElement("td");
    delTdElem.appendChild(delBtn);
    trElem = $.createElement("tr");
    trElem.append(
      nameTdElem,
      authorTdElem,
      yearTdElem,
      categTdElem,
      favoriteTdElem,
      editTdElem,
      delTdElem
    );
    booksTable.appendChild(trElem)
});
}

function setLocalStorage(array) {
  localStorage.setItem("books", JSON.stringify(array));
}
showModalBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);
$.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
  }
});
addBtn.addEventListener('click',addBook)