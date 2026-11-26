// 1.1
{
  // Уровень A
  // 1. Паспорт страницы (BOM)
  const fileName = location.pathname.split("/").pop() || "/";
  console.log("Адрес страницы:", location.href);
  console.log("Имя файла:", fileName);
  console.log("Язык браузера:", navigator.language);
  console.log("Размеры окна:", window.innerWidth, "x", window.innerHeight);
  console.log("Онлайн:", navigator.onLine);

  // 2. Запрос имени пользователя
  const userName = prompt("Введите ваше имя:");
  console.log(userName === null ? "Аноним" : userName);

  // 3. Переход по якорям по таймеру
  setTimeout(() => {
    location.hash = "#my";
    setTimeout(() => {
      location.hash = "#catalog";
    }, 3000);
  }, 3000);

  // Уровень B. Секундомер на 10 секунд
  let seconds = 0;
  const timerId = setInterval(() => {
    seconds += 1;
    console.log(`Вы на странице ${seconds} с`);
    if (seconds >= 10) {
      clearInterval(timerId);
    }
  }, 1000);
}

// 1.2
{
  // Уровень A
  // 1. Количество дочерних узлов и элементов в <nav>
  const nav = document.querySelector("nav");
  console.log("nav childNodes:", nav.childNodes.length, "children:", nav.children.length);

  // 2. Для #my-list, #my и main
  const myList = document.getElementById("my-list");
  const mySection = document.getElementById("my");
  const main = document.querySelector("main");

  console.log("#my-list childNodes:", myList.childNodes.length, "children:", myList.children.length);
  console.log("#my childNodes:", mySection.childNodes.length, "children:", mySection.children.length);
  console.log("main childNodes:", main.childNodes.length, "children:", main.children.length);

  // Разница: childNodes содержит ВСЕ дочерние узлы (включая текстовые узлы с пробелами/переносами строк и комментарии),
  // а children — только дочерние HTML-элементы (nodeType === 1).

  // 3. nodeType первого и последнего дочернего узла у #my-list
  console.log("#my-list firstChild.nodeType:", myList.firstChild.nodeType);
  console.log("#my-list lastChild.nodeType:", myList.lastChild.nodeType);

  // Уровень B. Рекурсивный подсчёт узлов по типам
  function countNodes(node) {
    const counts = { [node.nodeType]: 1 };
    for (const child of node.childNodes) {
      const subCounts = countNodes(child);
      for (const [type, count] of Object.entries(subCounts)) {
        counts[type] = (counts[type] || 0) + count;
      }
    }
    return counts;
  }

  console.log("Узлы в main:", countNodes(main));
}

// 1.3
{
  const table = document.getElementById("books");
  const tbody = table.tBodies[0];

  // Уровень A
  // 1. Массив названий колонок
  const headers = Array.from(table.tHead.rows[0].cells).map((th) => th.textContent.trim());
  console.log("Колонки:", headers);

  // 2. Автор третьей книги
  console.log("Автор 3-й книги:", tbody.rows[2].cells[1].textContent.trim());

  // 3. Все строки tbody: «название — год»
  for (const row of tbody.rows) {
    console.log(`${row.cells[0].textContent.trim()} — ${row.cells[3].textContent.trim()}`);
  }

  // 4. Название последней книги через lastElementChild
  console.log("Последняя книга:", tbody.lastElementChild.cells[0].textContent.trim());

  // 5. Обход через nextElementSibling и while, вывод data-id
  let currentRow = tbody.firstElementChild;
  while (currentRow) {
    console.log("data-id:", currentRow.dataset.id);
    currentRow = currentRow.nextElementSibling;
  }

  // Уровень B. Книга с минимальным годом без сортировки
  let oldestRow = tbody.firstElementChild;
  for (const row of tbody.rows) {
    if (Number(row.cells[3].textContent) < Number(oldestRow.cells[3].textContent)) {
      oldestRow = row;
    }
  }
  console.log(`Самая старая книга: ${oldestRow.cells[0].textContent.trim()} (${oldestRow.cells[3].textContent.trim()})`);
}

// 1.4
{
  // Уровень A. Десять запросов селекторами
  // 1. Все названия книг (массив строк)
  const allTitles = [...document.querySelectorAll("#books tbody tr.book td:first-child")]
    .map((td) => td.textContent.trim());
  console.log("1. Все названия:", allTitles);

  // 2. Количество доступных книг
  const availableCount = document.querySelectorAll('#books tbody tr.book[data-available="true"]').length;
  console.log("2. Доступных книг:", availableCount);

  // 3. Названия выданных книг
  const issuedTitles = [...document.querySelectorAll('#books tbody tr.book[data-available="false"] td:first-child')]
    .map((td) => td.textContent.trim());
  console.log("3. Выданные книги:", issuedTitles);

  // 4. Все книги жанра «Фантастика» (по data-genre)
  const sciFiRows = document.querySelectorAll('tr.book[data-genre="Фантастика"]');
  console.log("4. Фантастика:", sciFiRows);

  // 5. Книги Булгакова (фильтр массива)
  const bulgakovBooks = [...document.querySelectorAll("#books tbody tr.book")]
    .filter((row) => row.cells[1].textContent.toLowerCase().includes("булгаков"));
  console.log("5. Книги Булгакова:", bulgakovBooks);

  // 6. Последняя строка таблицы одним селектором (:last-child)
  const lastTableRow = document.querySelector("#books tbody tr:last-child");
  console.log("6. Последняя строка:", lastTableRow);

  // 7. Чётные строки tbody (:nth-child(even))
  const evenRows = document.querySelectorAll("#books tbody tr:nth-child(even)");
  console.log("7. Чётные строки:", evenRows);

  // 8. Заголовки th, по которым можно сортировать ([data-sort])
  const sortableHeaders = document.querySelectorAll("#books th[data-sort]");
  console.log("8. Сортируемые заголовки:", sortableHeaders);

  // 9. Ссылки, ведущие на якорь (a[href^="#"])
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  console.log("9. Якорные ссылки:", anchorLinks);

  // 10. Обязательные поля формы добавления (#add-form [required])
  const requiredFields = document.querySelectorAll("#add-form [required]");
  console.log("10. Обязательные поля:", requiredFields);

  // Уровень B. Функция titlesByGenre(genre) и вызов для всех трёх жанров
  function titlesByGenre(genre) {
    return [...document.querySelectorAll(`#books tbody tr.book[data-genre="${genre}"] td:first-child`)]
      .map((td) => td.textContent.trim());
  }

  console.log("Роман:", titlesByGenre("Роман"));
  console.log("Повесть:", titlesByGenre("Повесть"));
  console.log("Фантастика:", titlesByGenre("Фантастика"));
}

// 1.5
{
  // Способ 1: очистка содержимого tbody через innerHTML
  const tbody = document.querySelector("#books tbody");
  tbody.innerHTML = "";
  console.log("Способ 1, осталось .book:", document.getElementsByClassName("book").length);

  // Способ 2 (выполнять после F5): удаление каждой строки через remove() в живой коллекции
  // const liveBooks = document.getElementsByClassName("book");
  // while (liveBooks.length > 0) {
  //   liveBooks[0].remove();
  // }
  // console.log("Способ 2, осталось .book:", liveBooks.length);
}
