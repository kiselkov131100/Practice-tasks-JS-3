"use strict";
// ------------------ Prototype, LocalStorage, API ----------------------------

/*
    Добавить методы sum, multiply, uniq, randomElem  в прототип объекта Array

    Должны работать так:
        const array = [1,2,3,4,5,6,7,8,9]
        console.log(array.sum()); // 45
        console.log(array.multiply()); // 362880
        console.log(array.randomElem()); // случайный элемент из массива

        const array1 = [1,1,1,2,3,3,3]\
        console.log(array1.uniq()); // [1,2,3]
*/

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const array1 = [1, 1, 1, 2, 3, 3, 3];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur);
};

Array.prototype.multiply = function () {
  return this.reduce((acc, cur) => acc * cur);
};

Array.prototype.uniq = function () {
  const res = [];
  this.forEach((item) => (res.includes(item) ? item : res.push(item)));
  return res;
};

Array.prototype.randomElem = function () {
  return this[getRandom(0, this.length)];
};

console.log(array);
console.log(array.sum());
console.log(array.multiply());
console.log(array1.uniq());
console.log(array.randomElem());

/*
    Добавить метод reverse в прототип объекта String

    Должны работать так:
        const string = 'some string'
        console.log(string.reverse()); gnirts emos
*/

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

const string = "some string";
console.log(string.reverse());

/* отправить запрос на https://randomuser.me/api/?results=5 для получения списка юзеров
1. пока выполняется запрос должен отображаться лоадер (renderLoading)
2. при удачном выполнении запроса должен выводиться список юзеров (renderUsers)
3. запрос не отработал как надо, показываем ошибку (renderError) */

const rootDiv = document.getElementById("root");

const renderLoading = () => {
  rootDiv.innerHTML = '<p class="loader">Loading...</p>';
};

const renderError = () => {
  rootDiv.innerHTML = '<p class="error">ERROR</p>';
};

const renderUsers = (users) => {
  rootDiv.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "users";

  users.forEach((user) => {
    ul.innerHTML += `
        <li class="user">
            info: ${user.name.title} ${user.name.first} ${user.name.last}
            <br>
            email: ${user.email}
            <br>
            gender: ${user.gender}
        </li>
    `;
  });

  rootDiv.append(ul);
};

const fetchUsers = (url) => {
  renderLoading();

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderUsers(data.results);
    })
    .catch(() => {
      renderError();
    });
};

fetchUsers("https://randomuser.me/api/?results=5");
