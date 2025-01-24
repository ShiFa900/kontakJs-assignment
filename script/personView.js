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

const btnSave = document.querySelector(".btn-save");
const btnCancel = document.querySelector(".btn-cancel");
const inputName = document.querySelector(".form-input-name");
const inputPhone = document.querySelector(".form-input-phone");
const inputSex = document.querySelector(".form-input-sex");
const inputAddress = document.querySelector(".form-input-address");

class PersonView {
  #controller = new PersonController();

  constructor() {
    // this.view();
    // this.newContact();
    this.#controller.refresh();
    this.newContact();
  }

  newContact() {
    const btnCreate = document.querySelector(".form-btn-create");
    const form = document.querySelector(".form");
    const thisClass = this;

    btnCreate.addEventListener("click", function () {
      this.resetForm;
      document.getElementById("female-option").selected = true;
      form.classList.remove("hidden");
      inputName.focus();

      btnSave.addEventListener("click", function (e) {
        e.preventDefault();
        const initForm = thisClass.#controller.initForm(
          inputName,
          inputPhone,
          inputSex,
          inputAddress
        );

        if (initForm > 0) {
          alert("Error! Please check your data again.");
          return;
        } else {
          const save = thisClass.#controller.create();
          if (save) {
            thisClass.#controller.refresh();
            form.classList.add("hidden");

            alert("berhasil");
          }
        }
      });
    });
  }

  resetForm() {
    inputName = inputPhone = inputSex = inputAddress = "";
  }
}
const view = new PersonView();
