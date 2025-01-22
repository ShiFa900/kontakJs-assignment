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
