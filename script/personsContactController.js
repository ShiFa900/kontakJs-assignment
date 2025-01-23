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

export class PersonsContact {
  #persons = [];

  // constructor() {
  //   this.getAllData();
  // }

  // mendapatkan data yang ada pada storage
  getAllData() {
    // nanti akan di ganti dengan local storage
    this.#persons.push(conc1);
    this.#persons.push(conc2);
    // this.#persons.map((item) => {
    //   return this.#persons;
    // });
    let person = [];
    for (let i = 0; i < this.#persons.length; i++) {
      person.push(this.#persons[i]);
    }
    return person;
    // console.log(this.#persons);
  }

  create() {
    //get input dari form
    const name = inputName.value;
    const phone = inputPhone.value;
    const sex = inputSex.value;
    const address = inputAddress.value;

    // set to model
    const setData = new PersonData(name, phone, sex, address);
    return this.#persons.push(setData);
  }
}
// export default PersonsContact;

// const app = new PersonsContact();
// app.getAllData();

export class PersonController {
  // properties
  #inputName;
  #inputPhone;
  #inputSex;
  #inputAddress;
  #service;

  constructor() {
    this.#service = new LocalStoragePersonService();
    // this.initData();
    // this.cleanData();
  }

  refresh() {
    const containerTableRow = document.querySelector(".table-row");
    const persons = this.#service.getAll();

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

      containerTableRow.innerHTML = "";
      containerTableRow.insertAdjacentHTML("afterend", html);
    });
  }

  // operations
  initForm(inputName, inputPhone, inputSex, inputAddress) {
    this.#inputName = inputName;
    this.#inputPhone = inputPhone;
    this.#inputSex = inputSex;
    this.#inputAddress = inputAddress;
    return;
  }

  getData() {
    return this.#service.getAll();
  }

  create() {
    // TODO form validation here
    console.log(this.#inputName.value);
    const person = new Person(
      this.#inputName.value,
      this.#inputPhone.value,
      this.#inputSex.value,
      this.#inputAddress.value
    );
    // console.log(person);
    return this.#service.create(person);
  }

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
}

// save berhasil, coba nanti liat bagian untuk simpan datanya
// tampilkan data yang ada di local storage pada table
