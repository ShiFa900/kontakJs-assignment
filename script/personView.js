"use strict";
// import PersonsContact from "./personsContactController";
import { PersonController } from "./personsContactController.js";

class PersonView {
  #controller;

  constructor() {
    this.#controller = new PersonController({
      btnCreate: document.querySelector(".form-btn-create"),
      btnEdit: document.querySelector(".form-btn-edit"),
      btnEditSelector: ".btn-edit",
      btnDelete: document.querySelector(".form-btn-delete"),
      btnDeleteSelector: ".btn-delete",
      btnSave: document.querySelector(".btn-save"),
      btnCancel: document.querySelector(".btn-cancel"),
      alertInput: document.querySelector(".alert"),
      alertContent: document.querySelector(".alert-content"),

      form: document.querySelector(".form"),
      inputName: document.querySelector(".form-input-name"),
      inputPhone: document.querySelector(".form-input-phone"),
      inputSex: document.querySelector(".form-input-sex"),
      inputAddress: document.querySelector(".form-input-address"),

      containerTableRow: document.querySelector(".table-row"),
      containerTableBody: document.querySelector(".table-body"),
    });

    this.#controller.refresh();
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const view = new PersonView();

});

// buat validasi untuk form input value
// tampilkan form untuk konfirmasi sebelum delete data
// mungkin coba cek bug yang ada?