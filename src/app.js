import User from "./User";
("use strict");

const url = `https://randomuser.me/api/?results=20`;
const users = [];

const cleanAPI = (data) => {
  return data.results.map((person) => {
    return {
      title: person.name.title,
      firstName: person.name.first,
      lastName: person.name.last,
      city: person.location.city,
      country: person.location.country,
      age: person.dob.age,
      email: person.email,
      photo: person.picture.large,
    };
  });
};

const getStudent = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cleanData = await cleanAPI(data);

    cleanData.forEach((pers) => {
      users.push(new User(pers));
    });
    renderUsers();
    return cleanData;
  } catch (error) {
    console.log(error);
  }
};

const renderUsers = () => {
  users.forEach((user) => {
    user.render();
  });
};

document.querySelector("main").addEventListener("click", (e) => {
  let pplHere = 0;
  users.forEach((user) => {
    if (user.isHere) {
      pplHere++;
    }
  });
  document.querySelector(
    ".counter"
  ).textContent = `${pplHere}/20 people are here`;
});

document.querySelector("#sort--name").addEventListener("click", (e) => {
  users.sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });
  renderUsers();
  document.querySelector("#sort--age").classList.remove("selected");
  document.querySelector("#sort--name").classList.add("selected");
});

document.querySelector("#sort--age").addEventListener("click", (e) => {
  users.sort((a, b) => {
    return a.age - b.age;
  });
  document.querySelector("#sort--name").classList.remove("selected");
  document.querySelector("#sort--age").classList.add("selected");
  renderUsers();
});

getStudent();
