const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const alertSuccess = document.getElementById("alertSucces");
const btnsEdit = document.querySelectorAll("#editButton");
const reportsPagination = document.querySelector(".reports-pagination");
const paginationItems = [];

// Создание пагинации
// Количество записей на странице
const notesOnPage = 10;
async function createPagination() {
  try {
    const res = await fetch("/report?admin=Alexei&psw=123");
    const body = await res.json();

    // Количество страниц пагинации
    let pages = Math.ceil(body.length / notesOnPage);
    for (let i = 1; i <= pages; i++) {
      let li = document.createElement("li");
      li.className = "page-item";
      let a = document.createElement("a");
      a.className = "page-link";
      a.innerHTML = i;
      li.appendChild(a);
      reportsPagination.appendChild(li);
      paginationItems.push(li.firstChild);
    }

    // Вывод 1 страницы
    showPage(paginationItems[0], body);

    // Вывод страницы по нажатию
    for (let a of paginationItems) {
      a.addEventListener("click", function () {
        showPage(this, body);
        editRow();
      });
    }
    return;
  } catch (err) {
    console.log(err);
  }
}

const showPage = (function () {
  // Запоминаем активную страницы пагинации
  let active;

  return function (item, body) {
    if (active) active.parentNode.classList.remove("active");
    active = item;
    item.parentNode.classList.add("active");
    let pageNum = +item.innerHTML;
    // Очищаем содержимое таблицы
    tableBody.innerHTML = "";
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = body.slice(start, end);
    createCells(notes);
  };
})();

// Создание таблицы
function createCells(body) {
  body.forEach((el, index) => {
    // Создаем строку
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.id = el._id;
    th.innerHTML = index + 1;
    tr.appendChild(th);

    // Создаем столбец ПІБ
    let td_name = document.createElement("td");
    td_name.id = "can_be_edited";
    td_name.innerHTML = el.name;
    tr.appendChild(td_name);

    // Создаем столбец Вид робіт
    let td_type = document.createElement("td");
    td_type.className = "text-center";
    td_type.id = "can_be_edited";
    td_type.innerHTML = el.workType;
    tr.appendChild(td_type);

    // Создаем столбец Площа
    let td_ploshad = document.createElement("td");
    td_ploshad.className = "text-center";
    td_ploshad.id = "can_be_edited";
    td_ploshad.innerHTML = el.ploshad;
    tr.appendChild(td_ploshad);

    // Создаем столбец Помилки
    let td_oshibki = document.createElement("td");
    td_oshibki.className = "text-center";
    td_oshibki.id = "can_be_edited";
    td_oshibki.innerHTML = el.oshibki;
    tr.appendChild(td_oshibki);

    // Создаем столбец Дата
    let td_reportDate = document.createElement("td");
    td_reportDate.className = "text-center";
    td_reportDate.id = "can_be_edited";
    td_reportDate.innerHTML = el.reportDate;
    tr.appendChild(td_reportDate);

    // Создаем столбец Дії
    let td_buttons = document.createElement("td");
    td_buttons.className = "text-center";
    td_buttons.style = "width: 85px";

    // Кнопка отменить
    let td_undo = document.createElement("button");
    td_undo.className = "btn btn-secondary badge rounded-pill m-1 d-none";
    td_undo.style = "width: 30px";
    td_undo.id = "undoButton";
    td_undo.innerHTML = `<i class="fas fa-times"></i>`;
    td_buttons.appendChild(td_undo);

    // Кнопка подтвердить
    let td_success = document.createElement("button");
    td_success.className = "btn btn-success badge rounded-pill m-1 d-none";
    td_success.style = "width: 30px";
    td_success.id = "successButton";
    td_success.innerHTML = `<i class="fas fa-check"></i>`;
    td_buttons.appendChild(td_success);

    // Кнопка редактировать
    let td_edit = document.createElement("button");
    td_edit.className = "btn btn-primary badge rounded-pill m-1";
    td_edit.style = "width: 30px";
    td_edit.id = "editButton";
    td_edit.innerHTML = `<i class="far fa-edit"></i>`;
    td_buttons.appendChild(td_edit);

    // Кнопка удалить
    let td_delete = document.createElement("button");
    td_delete.className = "btn btn-danger badge rounded-pill m-1";
    td_delete.style = "width: 30px";
    td_delete.id = "deleteButton";
    td_delete.innerHTML = `<i class="far fa-trash-alt"></i>`;
    td_buttons.appendChild(td_delete);

    // Добавляем кнопки в строку
    tr.appendChild(td_buttons);
    // Добавляем строку в тело таблицы
    tableBody.appendChild(tr);
  });
}

// Редактирование таблицы
async function editRow() {
  const btnsEdit = document.querySelectorAll("#editButton"); // Кнопка EDIT
  const btnsSuccess = document.querySelectorAll("#successButton"); // Кнопка SAVE
  const btnsUndo = document.querySelectorAll("#undoButton"); // Кнопка DELETE
  const btnsDelete = document.querySelectorAll("#deleteButton"); // Кнопка DELETEхранения старых значений
  const data = {}; // объект для отправки PATCH запроса
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const cells = tableBody.rows[0].cells;
  // console.log(tableBody.rows.length);
  // console.log(tableBody.rows[0].rowIndex);
  // console.log(cells);

  for (let i = 0; i < btnsEdit.length; i++) {
    const cell = tableBody.rows[i].cells; // Строка с данными для редактирования
    const id = cell[0].id; // _id в mongodb

    // Событие кнопки edit
    btnsEdit[i].addEventListener("click", function ed() {
      btnsSuccess[i].classList.remove("d-none");
      btnsUndo[i].classList.remove("d-none");

      // console.log(tableBody.rows[i]);
      // console.log(i);

      for (let key in cell) {
        if (cell[key].id == "can_be_edited") {
          // Меняем значение innerHTML
          // console.log(cell[key]);
          const input = document.createElement("input");
          input.classList.add("form-control");
          input.value = cell[key].innerHTML;
          cell[key].innerHTML = "";
          cell[key].appendChild(input);

          // Событие по нажатию на кнопку success, которое обновляет данные на фронте
          btnsSuccess[i].addEventListener("click", function () {
            cell[key].innerHTML = input.value;
            btnsSuccess[i].classList.add("d-none");
            btnsUndo[i].classList.add("d-none");
            btnsEdit[i].addEventListener("click", ed);
          });

          // Событие по нажатию на кнопку undo, которое обновляет данные на фронте
          btnsUndo[i].addEventListener("click", function () {
            // const oldVal = oldValues[i].cells[key].childNodes[0].value;
            // cell[key].innerHTML = oldVal;
            // console.log(oldVal);

            cell[key].innerHTML = input.value;
            btnsSuccess[i].classList.add("d-none");
            btnsUndo[i].classList.add("d-none");
            btnsEdit[i].addEventListener("click", ed);

            btnsSuccess[i].classList.add("d-none");
            btnsUndo[i].classList.add("d-none");
            btnsEdit[i].addEventListener("click", ed);
          });
        }
      }

      // Удаляем событие edit что избежать повторное нажатие
      btnsEdit[i].removeEventListener("click", ed);
    });

    // Событие по нажатию на кнопку success, которое обновляет данные в mongodb
    btnsSuccess[i].addEventListener("click", async function () {
      data.name = cell[1].childNodes[0].value;
      data.workType = cell[2].childNodes[0].value;
      data.ploshad = parseInt(cell[3].childNodes[0].value);
      data.oshibki = parseInt(cell[4].childNodes[0].value);
      data.reportDate = cell[5].childNodes[0].value;
      options.body = JSON.stringify(data);
      const res = await fetch("/report/" + id, options);
      const body = await res.json();
      console.log(body);
    });

    // Событие по нажатию на кнопку delete
    btnsDelete[i].addEventListener("click", async function () {
      options.method = "DELETE";
      const res = await fetch("/report/" + id, options);
      const body = await res.json();
      tableBody.removeChild(tableBody.rows[i]);
      console.log(body);
      console.log(i);
    });
  } // Конец цикла for

  // console.log(data);
  // console.log(tableBody.rows[0].cells);
  // console.log(typeof tableBody.rows[0].cells);
}

// Обертка
async function go() {
  let a = await createPagination();
  // let b = await createCells();
  let c = await editRow();
}
go();

// Пример редактирования по нажатию мышки
// async function editCell() {
//   const tds = document.querySelectorAll("#can_be_edited");

//   for (let i = 0; i < tds.length; i++) {
//     tds[i].addEventListener("click", function ed() {
//       const input = document.createElement("input");
//       input.value = this.innerHTML;
//       this.innerHTML = "";
//       this.appendChild(input);

//       const td = this;
//       input.addEventListener("blur", function (e) {
//         td.innerHTML = this.value;
//         td.addEventListener("click", ed);
//       });

//       this.removeEventListener("click", ed);
//     });
//   }
// }
