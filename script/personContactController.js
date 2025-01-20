"use strict";
// deklarasi
const form = document.querySelector(".form");
const inputName = document.querySelector(".form-input-name");
const inputPhone = document.querySelector(".form-input-phone");
const inputSex = document.querySelector(".form-input-sex");
const inputAddress = document.querySelector(".form-input-address");
const table = document.querySelector(".table-container");
const btnCreate = document.querySelector(".form-btn-create");
const btnEdit = document.querySelector(".form-btn-edit");
const btnDelete = document.querySelector(".form-btn-delete");
const containerTableRow = document.querySelector(".table-row");

// const conc1 = {
//   name: "Jamal",
//   phone: "9878129",
//   sex: "Male",
//   address: "Rumah Mevvah",
// };

// const conc2 = {
//   name: "Komi",
//   phone: "9001292",
//   sex: "Female",
//   address: "Rumah Peri",
// };
// controller

class PersonsContact {
  #persons = [];

  constructor() {
    this.view();
    form.addEventListener("submit", this.newContact());
  }

  
}
