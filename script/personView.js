"use strict";

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

// const Persons = [conc1, conc2];
// console.log(Persons);

const pc = new PersonsContact();

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

class View {
  view() {
    // function ini akan menampilkan data dummy (saat ini)
    // dengan render html
    const person = new PersonData(
      conc1.name,
      conc1.phone,
      conc1.sex,
      conc1.address
    );

    const html = `
        <tr class="table-row">
          <td>${person.name}</td>
          <td>${person.phone}</td>
          <td>${person.sex}</td>
          <td>${person.address}</td>
          <td>
            <button class="btn btn-secondary">edit</button>
            <button class="btn btn-danger">delete</button>
          </td>
        </tr>
        `;

    containerTableRow.innerHTML = "";
    containerTableRow.insertAdjacentHTML("afterend", html);
  }
}
