// 2.1
{
  // Уровень A
  // 1. Замена текста h1 через textContent
  const h1 = document.querySelector("h1");
  h1.textContent = "Библиотека колледжа";

  // 2. Запись текущего года в подвал
  const footer = document.querySelector("footer");
  footer.textContent = `© ${new Date().getFullYear()} Библиотека колледжа`;

  // 3. Приветствие в #auth через textContent + ссылка «Выйти» через insertAdjacentHTML
  const auth = document.getElementById("auth");
  auth.textContent = "Здравствуйте, Анна!";
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');

  // 4. Повтор п. 3 с именем <b>Анна</b>: сравнение textContent и innerHTML
  const rawName = "<b>Анна</b>";

  // Вариант 1: через textContent
  auth.textContent = `Здравствуйте, ${rawName}!`;
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');
  console.log("Вариант textContent:", auth.innerHTML);
  // Объяснение: textContent вставляет строку буквально, экранируя символы < и >.
  // Теги <b> не разбираются и отображаются пользователю как обычный текст "<b>Анна</b>" (защита от XSS).

  // Вариант 2: через innerHTML
  auth.innerHTML = `Здравствуйте, ${rawName}!`;
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');
  console.log("Вариант innerHTML:", auth.innerHTML);
  // Объяснение: innerHTML разбирает строку как HTML-разметку, поэтому <b>Анна</b> превращается в жирный элемент <b>.
  // Для непроверенного пользовательского ввода так делать опасно из-за риска XSS-инъекции.
}

// 2.2
{
  // Уровень A
  // 1. Вывести значения data-sort всех заголовков с этим атрибутом
  const sortKeys = [...document.querySelectorAll("th[data-sort]")]
    .map((th) => th.dataset.sort);
  console.log("data-sort заголовков:", sortKeys);

  // 2. Всем кнопкам .take добавить title
  document.querySelectorAll(".take").forEach((btn) => {
    btn.title = btn.disabled ? "Книга выдана" : "Взять книгу";
  });

  // 3. «Вернуть» книгу с id=6
  const row6 = document.querySelector('tr.book[data-id="6"]');
  if (row6) {
    row6.dataset.available = "true";
    const btn6 = row6.querySelector(".take");
    btn6.disabled = false;
    btn6.textContent = "Взять";
    btn6.title = "Взять книгу";
  }

  // Уровень B. Преобразование dataset в объект с приведением типов
  function parseDataset(dataset) {
    const result = {};
    for (const [key, value] of Object.entries({ ...dataset })) {
      if (value === "true") {
        result[key] = true;
      } else if (value === "false") {
        result[key] = false;
      } else if (value !== "" && !Number.isNaN(Number(value))) {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  const firstRow = document.querySelector("tr.book");
  console.log("dataset как объект:", { ...firstRow.dataset });
  console.log("dataset с типами:", parseDataset(firstRow.dataset));
}

// 2.3
{
  // Уровень A
  const rows = [...document.querySelectorAll("#books tbody tr.book")];

  // 1. Подсветка строк с рейтингом >= 4.5 классом highlight
  rows.forEach((row) => {
    const rating = Number(row.cells[4].textContent);
    if (rating >= 4.5) {
      row.classList.add("highlight");
    }
  });

  // 2. Показать и скрыть форму входа (#login) через classList
  const loginForm = document.getElementById("login");
  loginForm.classList.remove("hidden");
  console.log("Форма открыта (hidden?):", loginForm.classList.contains("hidden"));
  loginForm.classList.add("hidden");
  console.log("Форма скрыта (hidden?):", loginForm.classList.contains("hidden"));

  // 3. Проверить highlight и className у первой строки
  const firstRow = rows[0];
  console.log("Есть highlight у 1-й строки:", firstRow.classList.contains("highlight"));
  console.log("className 1-й строки:", firstRow.className);

  // 4. Прозрачность 0.5 недоступным книгам, затем убрать removeProperty
  const unavailableRows = rows.filter((row) => row.dataset.available === "false");
  unavailableRows.forEach((row) => {
    row.style.opacity = "0.5";
  });
  unavailableRows.forEach((row) => {
    row.style.removeProperty("opacity");
  });

  // Уровень B. «Зебра» без CSS-псевдоклассов через <style> в document.head
  rows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.classList.add("odd");
    }
  });
  const zebraStyle = document.createElement("style");
  zebraStyle.textContent = ".odd { background: #f4f4f4; }";
  document.head.append(zebraStyle);
}

// 2.4
{
  const myList = document.getElementById("my-list");

  // Уровень A
  // 1. Добавить li «Гиперион» в конец (append)
  const liHyperion = document.createElement("li");
  liHyperion.textContent = "Гиперион";
  myList.append(liHyperion);

  // 2. Добавить li «Война и мир» в начало (prepend)
  const liWarAndPeace = document.createElement("li");
  liWarAndPeace.textContent = "Война и мир";
  myList.prepend(liWarAndPeace);

  // 3. Вставить li «Собачье сердце» сразу после первого (after)
  const liHeartOfDog = document.createElement("li");
  liHeartOfDog.textContent = "Собачье сердце";
  myList.firstElementChild.after(liHeartOfDog);

  // 4. Удалить последний li (remove)
  myList.lastElementChild.remove();

  // 5. Заменить второй li на «Солярис» (replaceWith)
  const liSolaris = document.createElement("li");
  liSolaris.textContent = "Солярис";
  myList.children[1].replaceWith(liSolaris);

  // 6. Скопировать первую строку каталога через cloneNode(true)
  const tbody = document.querySelector("#books tbody");
  const clonedRow = tbody.firstElementChild.cloneNode(true);
  clonedRow.dataset.id = "7";
  clonedRow.cells[0].textContent = "Копия";
  tbody.append(clonedRow);

  // Уровень B. insertAdjacentHTML в четыре позиции на #my-list
  myList.insertAdjacentHTML("beforebegin", '<p class="list-note">Список до (beforebegin)</p>');
  myList.insertAdjacentHTML("afterbegin", "<li>Начало списка (afterbegin)</li>");
  myList.insertAdjacentHTML("beforeend", "<li>Конец списка (beforeend)</li>");
  myList.insertAdjacentHTML("afterend", '<p class="list-note">Список после (afterend)</p>');
}

// 2.5
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

  // Уровень B: звёзды, data-value и класс top при рейтинге >= 4.7
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
  tdAction.append(btn);

  tr.append(tdTitle, tdAuthor, tdGenre, tdYear, tdRating, tdAction);
  return tr;
}

function renderCatalog(list) {
  const tbody = document.querySelector("#books tbody");
  const rows = list.map((book) => createRow(book));
  tbody.replaceChildren(...rows);
}

{
  // Проверки вызовов для 2.5
  renderCatalog(books);
  console.log("Все книги:", document.querySelectorAll("#books tbody tr.book").length);

  renderCatalog(books.filter((b) => b.available));
  console.log("Только доступные:", document.querySelectorAll("#books tbody tr.book").length);

  renderCatalog(books.filter((b) => b.genre === "Роман"));
  console.log("Жанр Роман:", document.querySelectorAll("#books tbody tr.book").length);

  renderCatalog([...books].sort((a, b) => b.year - a.year));
  console.log("Сортировка по году (убыв.), первая:", document.querySelector("#books tbody tr.book td")?.textContent);

  renderCatalog([]);
  console.log("Пустой список:", document.querySelectorAll("#books tbody tr.book").length);

  renderCatalog([
    {
      id: 99,
      title: "<i>Тест</i>",
      author: "Автор",
      genre: "Роман",
      year: 2026,
      rating: 4.8,
      available: true,
    },
  ]);
  console.log("Проверка XSS (textContent):", document.querySelector("#books tbody tr.book td")?.textContent);
}

// 2.6
function renderMyBooks(userId) {
  const myList = document.getElementById("my-list");
  const activeLoans = loans.filter(
    (loan) => loan.userId === userId && loan.returnedAt === null
  );

  const activeItems = activeLoans.map((loan) => {
    const book = books.find((b) => b.id === loan.bookId);
    const li = document.createElement("li");
    li.dataset.bookId = String(loan.bookId);
    li.textContent = `${book ? book.title : "Неизвестная книга"} — взята ${loan.takenAt}`;
    return li;
  });
  myList.replaceChildren(...activeItems);

  // Уровень B. Блок «История» (<h3> и <ul id="history"> после #my-list)
  let historyList = document.getElementById("history");
  if (!historyList) {
    const heading = document.createElement("h3");
    heading.textContent = "История";
    historyList = document.createElement("ul");
    historyList.id = "history";
    myList.after(heading, historyList);
  }

  const returnedLoans = loans.filter(
    (loan) => loan.userId === userId && loan.returnedAt !== null
  );
  const historyItems = returnedLoans.map((loan) => {
    const book = books.find((b) => b.id === loan.bookId);
    const li = document.createElement("li");
    li.textContent = `${book ? book.title : "Неизвестная книга"} — ${formatStars(loan.rating || 0)}`;
    return li;
  });
  historyList.replaceChildren(...historyItems);
}

{
  // Проверки вызовов для 2.6
  renderMyBooks(1);
  console.log("Пользователь 1, активные:", [...document.querySelectorAll("#my-list li")].map((li) => li.textContent));
  console.log("Пользователь 1, история:", [...document.querySelectorAll("#history li")].map((li) => li.textContent));

  renderMyBooks(2);
  console.log("Пользователь 2, активные:", [...document.querySelectorAll("#my-list li")].map((li) => li.textContent));
  console.log("Пользователь 2, история:", [...document.querySelectorAll("#history li")].map((li) => li.textContent));

  renderMyBooks(99);
  console.log("Пользователь 99, активные:", document.querySelectorAll("#my-list li").length);
  console.log("Пользователь 99, история:", document.querySelectorAll("#history li").length);
}
