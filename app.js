const library = new Library({ books, users, loans });
// Пока нет входа, задаём первого пользователя
library.currentUser = users[0];

const state = {
  query: "",
  genre: "",
  sortKey: "",
  sortDir: 1,
};

function formatStars(rating) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}

function createRow(book) {
  const tr = document.createElement("tr");
  tr.className = "book";
  tr.dataset.id = String(book.id);
  tr.dataset.genre = book.genre;
  tr.dataset.available = String(book.available);

  const tdTitle = document.createElement("td");
  tdTitle.textContent = book.title;

  const tdAuthor = document.createElement("td");
  tdAuthor.textContent = book.author;

  const tdGenre = document.createElement("td");
  tdGenre.textContent = book.genre;

  const tdYear = document.createElement("td");
  tdYear.textContent = String(book.year);

  const tdRating = document.createElement("td");
  tdRating.textContent = formatStars(book.rating);
  tdRating.dataset.value = String(book.rating);
  if (book.rating >= 4.7) {
    tdRating.classList.add("top");
  }

  const tdAction = document.createElement("td");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "take";
  btn.disabled = !book.available;
  btn.textContent = book.available ? "Взять" : "Выдана";
  btn.title = book.available ? "Взять книгу" : "Книга выдана";
  btn.addEventListener("click", () => take(book.id));
  tdAction.append(btn);

  tr.append(tdTitle, tdAuthor, tdGenre, tdYear, tdRating, tdAction);
  return tr;
}

function renderCatalog(list) {
  const tbody = document.querySelector("#books tbody");
  tbody.replaceChildren(...list.map((book) => createRow(book)));
}

function renderMyBooks() {
  const myList = document.getElementById("my-list");
  if (!library.currentUser) {
    myList.replaceChildren();
    return;
  }

  const activeLoans = library.getActiveLoans(library.currentUser.id);
  const items = activeLoans.map((loan) => {
    const book = library.books.find((b) => b.id === loan.bookId);
    const li = document.createElement("li");
    li.dataset.bookId = String(loan.bookId);
    li.textContent = `${book ? book.title : "Неизвестная книга"} — взята ${loan.takenAt}`;
    return li;
  });
  myList.replaceChildren(...items);
}

function take(bookId) {
  try {
    library.takeBook(bookId);
    refresh();
  } catch (e) {
    alert(e.message);
  }
}

function refresh() {
  renderCatalog(library.find(state));
  renderMyBooks();
}

const searchForm = document.getElementById("search-form");
const queryInput = document.getElementById("q");
const genreSelect = document.getElementById("genre");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

queryInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  refresh();
});

genreSelect.addEventListener("change", (event) => {
  state.genre = event.target.value;
  refresh();
});

document.querySelectorAll("#books th[data-sort]").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (state.sortKey === key) {
      state.sortDir *= -1;
    } else {
      state.sortKey = key;
      state.sortDir = 1;
    }
    refresh();
  });
});

refresh();
