"use strict";
// import PersonsContact from "./personsContactController";
import {
  PersonController,
  PersonsContact,
} from "./personsContactController.js";

const table = document.querySelector(".table-container");
const btnCreate = document.querySelector(".form-btn-create");
const btnEdit = document.querySelector(".form-btn-edit");
const btnDelete = document.querySelector(".form-btn-delete");
// deklarasikan variable /
// dua class dengan nama PersonData dan PersonsContact /
// PersonData untuk deklarasi properti person, PersonsContact untuk parent class yang akan memanggil PersonData /
// tampilkan data, satu data atau lebih
// addEventListerner ketika button di click
// tampilkan form input
// create and save data
// save to the local storage

//
// controller person
// pisahkan antara model dengan UI (html)
// model person dengan atribut

/**
 * showing data DONE
 */

// const Persons = [conc1, conc2];
// console.log(Persons);

// event

// class PersonContact {
//   // array untuk menampung semua data
//   #contacts = [];
//   // untuk param address, isi dulu dengan default value, karena ini param optional
//   constructor(name, phone, sex, address = "rumah") {
//     this.name = name;
//     this.phone = phone;
//     this.sex = sex;
//     this.address = address;
//   }

//   // tampilkan data yang ada di local storage
//   view() {
//     containerTableRow.innerHTML = "";
//     const html = `
//     <td>${this.name}</td>
//     <td>09001292</td>
//     <td>Female</td>
//     <td>Jln A.Yani Barat</td>
//     `;
//   }

//   create() {
//     btnCreate.addEventListener("click", function (e) {
//       e.preventDefault();
//       form.classList.remove("hidden");
//     });
//   }
// }

// const contact = new PersonContact();
// contact.create();

const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");

class PersonView {
  #controller = new PersonController();

  constructor() {
    // this.view();
    // this.newContact();
    this.#controller.refresh();
    this.newContact();
  }

  // view() {
  //   const containerTableRow = document.querySelector(".table-row");
  //   const objContact = new PersonsContact();
  //   const persons = objContact.getAllData();

  //   persons.map((item) => {
  //     const html = `
  //     <tr class="table-row">
  //       <td>${item.name}</td>
  //       <td>${item.phone}</td>
  //       <td>${item.sex}</td>
  //       <td>${item.address}</td>
  //       <td>
  //         <button class="btn btn-secondary">edit</button>
  //         <button class="btn btn-danger">delete</button>
  //       </td>
  //     </tr>
  //     `;

  //     containerTableRow.innerHTML = "";
  //     containerTableRow.insertAdjacentHTML("afterend", html);
  //   });
  // }

  newContact() {
    const btnCreate = document.querySelector(".form-btn-create");
    const form = document.querySelector(".form");
    const inputName = document.querySelector(".form-input-name");

    inputName.focus();
    const inputPhone = document.querySelector(".form-input-phone");
    const inputSex = document.querySelector(".form-input-sex");
    const inputAddress = document.querySelector(".form-input-address");
    const thisClass = this;

    btnSave.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(inputName.value);
      thisClass.#controller.initForm(
        inputName,
        inputPhone,
        inputSex,
        inputAddress
      );
      thisClass.#controller.create();
    });
  }
}
const view = new PersonView();
