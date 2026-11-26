/**
 * Управляет каталогом книг, пользователями и выдачами.
 */
class Library {
  /**
   * @param {{books: Array, users: Array, loans: Array}} params
   */
  constructor({ books, users, loans }) {
    this.books = books;
    this.users = users;
    this.loans = loans;
    this.currentUser = null;
  }

  /**
   * Ищет, фильтрует и сортирует копию списка книг.
   * @param {{query?: string, genre?: string, sortKey?: string, sortDir?: number}} [options]
   * @returns {Array}
   */
  find({ query = "", genre = "", sortKey = "", sortDir = 1 } = {}) {
    const q = query.trim().toLowerCase();

    const filtered = this.books.filter((book) => {
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q);
      const matchesGenre = !genre || book.genre === genre;
      return matchesQuery && matchesGenre;
    });

    if (!sortKey) {
      return filtered;
    }

    const dir = sortDir === -1 ? -1 : 1;
    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * dir;
      }
      return String(valA).localeCompare(String(valB), "ru") * dir;
    });
  }

  /**
   * Выдаёт книгу текущему пользователю.
   * @param {number|string} bookId
   * @returns {object}
   */
  takeBook(bookId) {
    if (!this.currentUser) {
      throw new Error("Войдите, чтобы взять книгу");
    }

    const id = Number(bookId);
    const book = this.books.find((item) => item.id === id);
    if (!book) {
      throw new Error("Книга не найдена");
    }

    if (!book.available) {
      throw new Error("Книга уже выдана");
    }

    const maxId = this.loans.length
      ? Math.max(...this.loans.map((loan) => loan.id))
      : 0;

    const newLoan = {
      id: maxId + 1,
      userId: this.currentUser.id,
      bookId: book.id,
      takenAt: new Date().toISOString().slice(0, 10),
      returnedAt: null,
      rating: null,
    };

    this.loans.push(newLoan);
    book.available = false;
    return newLoan;
  }

  /**
   * Возвращает активные (невозвращённые) выдачи пользователя.
   * @param {number|string} userId
   * @returns {Array}
   */
  getActiveLoans(userId) {
    const id = Number(userId);
    return this.loans.filter(
      (loan) => loan.userId === id && loan.returnedAt === null
    );
  }
}
