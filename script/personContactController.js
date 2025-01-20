"use strict";

// controller

class PersonsContact {
  #persons = [];

  constructor() {
    this.view();
    form.addEventListener("submit", this.newContact());
  }

  newContact() {
    btnCreate.addEventListener("click", function (e) {
      e.preventDefault();
      form.classList.remove("hidden");
      inputName.focus();
    });
  }
}
