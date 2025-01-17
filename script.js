"use strict";

// deklarasikan variable
// addEventListerner ketika button di click
// tampilkan form input

const form = document.querySelector(".form");
const table = document.querySelector(".table-container");
const btnCreate = document.querySelector(".form-btn-create");
const btnEdit = document.querySelector(".form-btn-edit");
const btnDelete = document.querySelector(".form-btn-delete");
const containerTableRow = document.querySelector(".table-row");

const conc1 = {
  name: "Jamal",
  phone: 9878129,
  sex: "Male",
  address: "Rumah Mevvah",
};

const conc2 = {
  name: "Komi",
  phone: 9001292,
  sex: "Female",
  address: "Rumah Peri",
};

// event

class PersonContact {
  // array untuk menampung semua data
  #contacts = [];
  // untuk param address, isi dulu dengan default value, karena ini param optional
  constructor(name, phone, sex, address = "rumah") {
    this.name = name;
    this.phone = phone;
    this.sex = sex;
    this.address = address;
  }

  // tampilkan data yang ada di local storage
  view() {
    containerTableRow.innerHTML = "";
    const html = `
    <td>${this.name}</td>
    <td>09001292</td>
    <td>Female</td>
    <td>Jln A.Yani Barat</td>
    `;
  }

  create() {
    btnCreate.addEventListener("click", function (e) {
      e.preventDefault();
      form.classList.remove("hidden");
    });
  }
}

const contact = new PersonContact();
contact.create();
