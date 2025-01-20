"use strict";
class PersonData {
  constructor(name, phone, sex, address = "rumah") {
    this.name = name;
    this.phone = phone;
    this.sex = sex;
    this.address = address;
  }

  create() {
    // get data from form
    const name = inputName.value;
    const phone = inputPhone.value;
    const sex = inputSex.value;
    const address = inputAddress.value;
    let data;

    data = new PersonData(name, phone, sex, address);

    // add new object to persons array
    // this.#persons.push(data);
    // console.log(this.#persons);
  }
}
