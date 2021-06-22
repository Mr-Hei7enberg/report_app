// console.log("index.js is load");
const reportForm = document.getElementById("reportForm");
const name = document.getElementById("name");
const workType = document.getElementById("workType");
const ploshad = document.getElementById("ploshad");
const oshibki = document.getElementById("oshibki");
const submitButton = document.getElementById("submitButton");
const buttonSpinner = document.getElementById("buttonSpinner");
const buttonText = document.getElementById("buttonText");
const unknownError = document.getElementById("unknownError");
const alertSucces = document.getElementById("alertSucces");

async function addData(e) {
  e.preventDefault();

  const data = {
    name: name.value,
    workType: workType.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (name.value != "" && ploshad.value != "" && oshibki.value != "") {
    // Обработка кнопки после нажатия
    buttonText.textContent = "Збереження...";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    data.ploshad = +ploshad.value;
    data.oshibki = +oshibki.value;
    options.body = JSON.stringify(data);
    const res = await fetch("/report", options);
    const body = await res.json();

    // Возвращение кнопки в исходное состояние
    buttonText.textContent = "Додати";
    buttonSpinner.classList.add("d-none");
    submitButton.disabled = false;

    // Показываем алерт
    alertSucces.textContent = JSON.stringify(body, null, 7);
    alertSucces.classList.remove("d-none");
    setTimeout(() => {
      alertSucces.classList.add("d-none");
    }, 5000);
  }
  if (name.value == "" && ploshad.value == "" && oshibki.value == "") {
    // Показываем алерт
    unknownError.textContent = "Заповніть форму!";
    unknownError.classList.remove("d-none");
    setTimeout(() => {
      unknownError.classList.add("d-none");
    }, 3000);
  }
  if (name.value != "" && ploshad.value == "" && oshibki.value == "") {
    // Показываем алерт
    unknownError.textContent =
      "Заповніть одне з полів: Площа або Кількість помилок";
    unknownError.classList.remove("d-none");
    setTimeout(() => {
      unknownError.classList.add("d-none");
    }, 3000);
  }
  if (name.value != "" && oshibki.value != "" && ploshad.value == "") {
    // Обработка кнопки после нажатия
    buttonText.textContent = "Збереження...";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    data.oshibki = +oshibki.value;
    options.body = JSON.stringify(data);

    const res = await fetch("/report", options);
    const body = await res.json();

    // Возвращение кнопки в исходное состояние
    buttonText.textContent = "Додати";
    buttonSpinner.classList.add("d-none");
    submitButton.disabled = false;

    // Показываем алерт
    alertSucces.textContent = JSON.stringify(body, null, 7);
    alertSucces.classList.remove("d-none");
    setTimeout(() => {
      alertSucces.classList.add("d-none");
    }, 5000);
  }
  if (name.value != "" && oshibki.value == "" && ploshad.value != "") {
    // Обработка кнопки после нажатия
    buttonText.textContent = "Збереження...";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    data.ploshad = +ploshad.value;
    options.body = JSON.stringify(data);

    const res = await fetch("/report", options);
    const body = await res.json();

    // Возвращение кнопки в исходное состояние
    buttonText.textContent = "Додати";
    buttonSpinner.classList.add("d-none");
    submitButton.disabled = false;

    // Показываем алерт
    alertSucces.textContent = JSON.stringify(body, null, 7);
    alertSucces.classList.remove("d-none");
    setTimeout(() => {
      alertSucces.classList.add("d-none");
    }, 5000);
  }
  // console.log(JSON.stringify(data));
}

reportForm.addEventListener("submit", addData);

// async function addData() {
//   const data = {
//     name: "Olga",
//     workType: "TP",
//     ploshad: 10,
//     oshibki: 0,
//   };
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   const res = await fetch("/report", options);
//   const body = await res.json();
//   console.log(JSON.stringify(body));
// }
// document.querySelector("#btn").addEventListener("click", addData);
