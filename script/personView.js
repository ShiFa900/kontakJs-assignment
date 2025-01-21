"use strict";
// import PersonsContact from "./personsContactController";
import { PersonsContact } from "./personsContactController.js";
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

class View {
  constructor() {
    this.view();
  }

  view() {
    const containerTableRow = document.querySelector(".table-row");
    const objPerson = new PersonsContact();
    const persons = objPerson.getAllData();
    Object.keys(persons).forEach(function (person) {
      console.log(persons);

      console.log(person);
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
    });

    // const html = `
    //     <tr class="table-row">
    //       <td>${person.name}</td>
    //       <td>${person.phone}</td>
    //       <td>${person.sex}</td>
    //       <td>${person.address}</td>
    //       <td>
    //         <button class="btn btn-secondary">edit</button>
    //         <button class="btn btn-danger">delete</button>
    //       </td>
    //     </tr>
    //     `;

    // containerTableRow.innerHTML = "";
    // containerTableRow.insertAdjacentHTML("afterend", html);
  }

  newContact() {
    const btnCreate = document.querySelector(".form-btn-create");
    btnCreate.addEventListener("click", function (e) {
      e.preventDefault();
      form.classList.remove("hidden");
      inputName.focus();

      // nanti ini harusnya akan memanggil function yang ada di controller untuk create
    });
  }
}

const view = new View();
