// Задание 2
// Напишите асинхронную функцию, которая получает список пользователей с сервера jsonplaceholder. Выведите список пользователей на страницу.
// В задании используйте синтаксис async-await и предусмотрите обработку ошибок.

const containerUsers = document.querySelector(".containerUsers");
const containerForMe = document.querySelector(".containerForMe");
const btn = document.querySelector("button");
const input = document.querySelector("input");

async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("done");
  }
}

const renderUsers = (data) => {
  containerUsers.innerHTML = ``;
  data.forEach((user) => {
    const divUser = document.createElement("div");
    divUser.classList.add("user");
    for (const key in user) {
      if (typeof user[key] === "object") {
        divUser.innerHTML += `<p>${key}:  </p>`;
        for (const i in user[key]) {
          divUser.innerHTML += `<p>- ${i}: ${user[key][i]}</p>`;
        }
      } else if (key === "geo") {
        continue;
      } else {
        divUser.innerHTML += `<p>${key}: ${user[key]}</p>`;
      }
    }
    containerUsers.append(divUser);
  });
};

getUsers();

// Задание 3
// По адресу `https://api.github.com/users/${userName}` можно получить информацию о пользователе github.
// 1.Запросите информацию о себе и оформите страничку с данными:
// - аватар
// - имя пользователя
// - ссылка на страницу на github
// - дата регистрации на github
// - количество репозиториев.
// 2. Измените приложение так, чтобы имя пользователя можно было вводить в поле и после нажатия на кнопку отрисовывалась информация о нем.

async function getUser(name) {
  try {
    const response = await fetch(`https://api.github.com/users/${name}`);
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    console.log(data);
    renderData(data);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("done");
  }
}

const renderData = (data) => {
  containerForMe.innerHTML = ``;
  const info = document.createElement("div");
  info.style.cssText = `padding: 50px;
  width: 500px;
  text-align: center;
  margin: auto;
  border: 1px solid black;
  border-radius: 5px;`;
  info.innerHTML = `<img src="${data.avatar_url}" alt="avatar" ><p>Имя: ${
    data.name
  }</p><p>Ссылка на страницу на github: ${
    data.html_url
  }</p><p>Дата регистрации на github: ${data.created_at.slice(
    0,
    10
  )}</p><p>Количество репозиториев: ${data.public_repos}</p>`;
  containerForMe.append(info);
};

btn.addEventListener("click", () => {
  if (input.value === "") {
    return;
  } else {
    const name = input.value;
    getUser(name);
    input.value = "";
  }
});
