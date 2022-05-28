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
let todoEditIndex;
let isEditing;

function showModal() {
  favoritesModal.style.top = "30%";
  modalOverlay.style.display = "block";
}
function hideModal() {
  favoritesModal.style.top = "-100%";
  modalOverlay.style.display = "none";
}
function clearInputs() {
  nameInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  categInput.value = "Uncategorized";
}
function loadBooks() {
  books = JSON.parse(localStorage.getItem("books"));
  generateBookElems(books);
}
function addBook() {
  const newBookObj = {
    id: localStorage.length + 1,
    name: nameInput.value,
    author: authorInput.value,
    year: yearInput.value,
    category: categInput.value,
    isFavorite: false,
  };
  books.push(newBookObj);
  setLocalStorage(books);
  generateBookElems(books);
  clearInputs();
}
function addToFavorites(id, e) {
  const mainBookIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  books[mainBookIndex].isFavorite = !books[mainBookIndex].isFavorite;
  e.target.className = books[mainBookIndex].isFavorite
    ? "btn btn-warning fa-solid fa-star"
    : "btn btn-warning fa-regular fa-star";
  e.target.classList.add("added");
  e.target.addEventListener("animationend", function () {
    e.target.classList.remove("added");
  });
  setLocalStorage(books);
}
function goToEditMode(id) {
  todoEditIndex = books.findIndex(function (book) {
    return book.id === id;
  });
  nameInput.value = books[todoEditIndex].name;
  authorInput.value = books[todoEditIndex].author;
  yearInput.value = books[todoEditIndex].year;
  categInput.value = books[todoEditIndex].category;
  isEditing = true;
}
function edit() {
  books[todoEditIndex].name = nameInput.value;
  books[todoEditIndex].author = authorInput.value;
  books[todoEditIndex].year = yearInput.value;
  books[todoEditIndex].category = categInput.value;
  clearInputs()
  isEditing = false;
  setLocalStorage(books)
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
    favoriteBtn.className = book.isFavorite
      ? "btn btn-warning fa-solid fa-star"
      : "btn btn-warning fa-regular fa-star";
    favoriteBtn.addEventListener("click", function (e) {
      addToFavorites(book.id, e);
    });
    editBtn = $.createElement("i");
    editBtn.className = "btn btn-primary fa-regular fa-edit";
    editBtn.addEventListener("click", function () {
      goToEditMode(book.id);
    });
    delBtn = $.createElement("i");
    delBtn.className = "btn btn-danger fa-regular fa-trash-can";
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
    booksTable.appendChild(trElem);
  });
}

function setLocalStorage(array) {
  localStorage.setItem("books", JSON.stringify(array));
}
window.addEventListener("load", loadBooks);
showModalBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);
$.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
  }
});
addBtn.addEventListener("click", function () {
  if (isEditing) {
    edit();
  } else {
    addBook();
  }
});
