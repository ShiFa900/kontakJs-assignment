"use strict";
import { LocalStoragePersonService } from "./LocalStoragePersonService.js";
import { Person } from "./personModel.js";
// deklarasi

const conc1 = {
  name: "Jamal",
  phone: "9878129",
  sex: "Male",
  address: "Rumah Mevvah",
};

const conc2 = {
  name: "Komi",
  phone: "9001292",
  sex: "Female",
  address: "Rumah Peri",
};
// controller

// export default PersonsContact;

// const app = new PersonsContact();
// app.getAllData();

const containerTableRow = document.querySelector(".table-row");
const containerTableBody = document.querySelector(".table-body");

export class PersonController {
  // properties
  #inputName;
  #inputPhone;
  #inputSex;
  #inputAddress;
  #service;
  #tableBody;
  #form;
  #btnCreate;
  #btnSave;
  #btnCancel;

  f = "Female";
  m = "Male";

  constructor() {
    this.#service = new LocalStoragePersonService();
    // this.initData();
    // this.cleanData();

    this.#btnSave = btnSave;
    this.#btnCancel = btnCancel;
    this.#inputName = inputName;
    this.#inputPhone = inputPhone;
    this.#inputSex = inputSex;
    this.#inputAddress = inputAddress;
  }

  setElements(params) {
    this.initTableBody(params.tableBody);
    this.initForm(params.form);
    this.initButtonCreate(params.btnCreate);
    this.initButtonSave(params.btnSave);

    // dst..
  }

  initForm(form) {
    this.#form = form;
  }

  initTableBody(tableBody) {
    this.#tableBody = tableBody;
  }

  initButtonSave(btnSave) {
    this.#btnSave = btnSave;

    // set event handler here..
    const thisClass = this;
    this.#btnSave.addEventListener("click", function (e) {
      const save = thisClass.create();
      if (save) {
        thisClass.cleanTable();
        thisClass.refresh();
        thisClass.#form.classList.add("hidden");

        alert("berhasil");
      }
    });
  }

  initButtonCreate(btnCreate) {
    this.#btnCreate = btnCreate;
    const thisClass = this;
    this.#btnCreate.addEventListener("click", function (e) {
      // clear the form fields first!
      thisClass.#form.reset();

      // and then show the form
      thisClass.#form.classList.remove("hidden");
    });
  }

  refresh() {
    // this.cleanTable();

    const persons = this.getData();

    persons.map((item) => {
      const html = `
      <tr class="table-row">
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.sex}</td>
        <td>${item.address}</td>
        <td>
          <button class="btn btn-secondary">edit</button>
          <button class="btn btn-danger">delete</button>
        </td>
        </tr>
      `;

      this.#tableBody.insertAdjacentHTML("afterbegin", html);
    });
  }

  cleanTable() {
    containerTableBody.innerHTML = "";
  }

  // operations
  initForm(inputName, inputPhone, inputSex, inputAddress) {
    let valid = 0;

    // nama tidak duplicate dengan alamat yang sama

    if (!this.isExist("name", inputName.value)) {
      this.#inputName = inputName;
    } else {
      // perlu validasi ketika nama dan address sama
      return alert("This name is already exits in database.");
    }
    console.log(inputPhone.value);
    // phone number tidak boleh kurang dari 7 angka dan tidak lebih dari 15, must be a number dan tidak duplicate
    if (inputPhone.value.length >= 7 && inputPhone.value.length <= 15) {
      this.#inputPhone = inputPhone;
    } else {
      return;
    }

    this.#inputSex = inputSex.value === "f" ? this.f : this.m;

    this.#inputAddress = inputAddress;
    return valid;
  }

  getData() {
    return this.#service.getAll();
  }

  // create
  create() {
    // TODO form validation here
    const person = new Person();
    person.name = this.#inputName.value;
    person.phone = this.#inputPhone.value;
    person.sex = this.#inputSex;
    person.address = this.#inputAddress.value;

    return this.#service.create(person);
  }

  setBtnCreate() {}

  // newContact() {
  //   const thisClass = this;

  //   btnCreate.addEventListener("click", function () {
  //     thisClass.resetForm();
  //     document.getElementById("female-option").selected = true;
  //     form.classList.remove("hidden");
  //     inputName.focus();

  //     btnSave.addEventListener("click", function (e) {
  //       e.preventDefault();
  //       const initForm = thisClass.#controller.initForm(
  //         inputName,
  //         inputPhone,
  //         inputSex,
  //         inputAddress
  //       );

  //       if (initForm > 0) {
  //         alert("Error! Please check your data again.");
  //         return;
  //       } else {
  //         const save = thisClass.#controller.create();
  //         if (save) {
  //           thisClass.#controller.cleanTable();
  //           thisClass.#controller.refresh();
  //           form.classList.add("hidden");

  //           alert("berhasil");
  //         }
  //       }
  //     });
  //   });
  // }

  update() {}

  delete() {}

  cleanData() {
    this.#service.deleteAll();
  }

  initData() {
    const p1 = new Person();
    p1.name = "Shifa";
    p1.sex = "F";
    p1.phone = "283728291789";
    p1.address = "Kuta, Bali";

    const p2 = new Person();
    p2.name = "Adhi";
    p2.sex = "M";
    p2.phone = "08123458790";
    p2.address = "Kuta, Bali";

    console.log(
      "Creating 2 persons data",
      this.#service.create(p1),
      this.#service.create(p2)
    );
  }

  isExist(column, value, _id) {
    // dapatkan dulu semua data yang ada di local storage
    const persons = this.#service.getAll();
    let data = [];
    // proses create
    if (_id == null) {
      persons.map((person) => {
        if (person.column == value) {
          return true;
        }
      });
    }
    return false;
    console.log(persons);
  }
}

// data dobel saat melakukan penambahan data di kelipatan dua
