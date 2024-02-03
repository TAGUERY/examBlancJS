class User {
  #theUser;
  constructor(person) {
    this.title = person.title;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.city = person.city;
    this.country = person.country;
    this.age = person.age;
    this.email = person.email;
    this.photo = person.photo;
    this.isHere = false;
    this.#theUser = this.generateUser();
    this.#theUser.addEventListener("click", (e) => {
      this.togglePresence(e.currentTarget);
    });
  }

  generateUser() {
    const containerPerson = document.createElement("div");
    containerPerson.classList.add("user");
    containerPerson.dataset.present = this.isHere;

    const childHTML = `
            <img src="${this.photo}">
            <div class="user--info">
                    <h1>${this.title} ${this.firstName} ${this.lastName}</h1>
                    <p>${this.age} years old</p>
                    <p>${this.city}, ${this.country}</p>
            </div>
            <a href="mailto:${this.email}">
				<span class="mail">✉️</span>
		    </a>
    `;

    containerPerson.insertAdjacentHTML("afterbegin", childHTML);
    return containerPerson;
  }

  render() {
    const main = document.querySelector("main");
    main.appendChild(this.#theUser);
  }

  togglePresence(div) {
    if (div.dataset.present === "false") {
      div.dataset.present = "true";
      this.isHere = true;
    } else {
      div.dataset.present = "false";
      this.isHere = false;
    }
  }
}

export default User;
