// 3.1. Перемещение и шаблоны (консоль)
{
  const tbody = document.querySelector("#books tbody");

  // 1. Переместите последнюю строку каталога в начало (prepend)
  if (tbody.lastElementChild) {
    tbody.prepend(tbody.lastElementChild);
  }

  // 2. Отсортируйте строки по названию перестановкой существующих узлов
  const sortedRows = [...tbody.rows].sort((a, b) =>
    a.cells[0].textContent.localeCompare(b.cells[0].textContent, "ru")
  );
  tbody.append(...sortedRows);

  // 3. Создайте <template> для элемента списка «Мои книги» и добавьте два новых пункта
  const template = document.createElement("template");
  template.innerHTML = '<li class="my-item"><strong class="item-title"></strong> — <span class="item-note"></span></li>';
  document.body.append(template);

  const myList = document.getElementById("my-list");
  const newItems = [
    { title: "Дюна", note: "добавлена через template" },
    { title: "1984", note: "добавлена через template" },
  ];

  newItems.forEach(({ title, note }) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".item-title").textContent = title;
    fragment.querySelector(".item-note").textContent = note;
    myList.append(fragment);
  });
}

// 3.2. Подписки на события (консоль)
{
  const loginBtn = document.getElementById("login-btn");
  const loginForm = document.getElementById("login");

  // 1. Кнопка «Войти» показывает/скрывает форму и меняет текст на «Закрыть» и обратно
  loginBtn.addEventListener("click", () => {
    const isHidden = loginForm.classList.toggle("hidden");
    loginBtn.textContent = isHidden ? "Войти" : "Закрыть";
  });

  // 2. Клавиша Esc закрывает форму
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !loginForm.classList.contains("hidden")) {
      loginForm.classList.add("hidden");
      loginBtn.textContent = "Войти";
    }
  });

  // 3. На один элемент (h1) подпишите два обработчика click и снимите один через removeEventListener
  const h1 = document.querySelector("h1");
  function firstH1Click() {
    console.log("Первый обработчик h1 (будет снят)");
  }
  function secondH1Click() {
    console.log("Второй обработчик h1 (активен)");
  }
  h1.addEventListener("click", firstH1Click);
  h1.addEventListener("click", secondH1Click);
  h1.removeEventListener("click", firstH1Click);

  // 4. Вывод event.type, event.target.tagName и координат при клике по странице
  document.addEventListener("click", (event) => {
    console.log(event.type, event.target.tagName, event.clientX, event.clientY);
  });
}
