/**
 * Возвращает массив всех строк книг в каталоге.
 * @returns {HTMLTableRowElement[]}
 */
function getBookRows() {
  return [...document.querySelectorAll("tr.book")];
}

/**
 * Находит строку книги по значению атрибута data-id.
 * @param {number|string} id
 * @returns {HTMLTableRowElement|null}
 */
function getRowByBookId(id) {
  return document.querySelector(`tr.book[data-id="${id}"]`);
}

/**
 * Возвращает массив названий доступных книг.
 * @returns {string[]}
 */
function getAvailableTitles() {
  return getBookRows()
    .filter((row) => row.dataset.available === "true")
    .map((row) => row.cells[0].textContent.trim());
}

/**
 * Возвращает названия книг, чей автор содержит указанный текст (без учёта регистра).
 * @param {string} text
 * @returns {string[]}
 */
function findByAuthor(text) {
  const needle = String(text).toLowerCase();
  return getBookRows()
    .filter((row) => row.cells[1].textContent.toLowerCase().includes(needle))
    .map((row) => row.cells[0].textContent.trim());
}

/**
 * Находит строку книги, в которой лежит переданная кнопка.
 * @param {Element|null} btn
 * @returns {HTMLTableRowElement|null}
 */
function getRowFromButton(btn) {
  return btn ? btn.closest("tr.book") : null;
}

/**
 * Читает все строки таблицы и возвращает массив объектов книг.
 * @returns {Array<{id: number, title: string, author: string, genre: string, year: number, rating: number, available: boolean}>}
 */
function readBooks() {
  return getBookRows().map((row) => ({
    id: Number(row.dataset.id),
    title: row.cells[0].textContent.trim(),
    author: row.cells[1].textContent.trim(),
    genre: row.cells[2].textContent.trim(),
    year: Number(row.cells[3].textContent),
    rating: Number(row.cells[4].textContent),
    available: row.dataset.available === "true",
  }));
}

/**
 * Уровень B: читает список #my-list и возвращает массив числовых id из data-book-id.
 * @returns {number[]}
 */
function getMyBookIds() {
  return [...document.querySelectorAll("#my-list li[data-book-id]")]
    .map((li) => Number(li.dataset.bookId));
}
