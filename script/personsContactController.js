"use strict";
import {LocalStoragePersonService} from "./LocalStoragePersonService.js";
import {Person} from "./personModel.js";

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
    #btnEdit;
    #btnEditSelector;
    #btnDelete;
    #btnDeleteSelector;
    #containerTableRow;
    #alertInput;
    #alertContent;

    f = "Female";
    m = "Male";

    constructor(params) {
        this.#service = new LocalStoragePersonService();
        this.setElements(params)
    }

    setElements(params) {
        this.initForm(params.form);
        this.initButtonCreate(params.btnCreate);
        this.initButtonEdit(params.btnEdit);
        this.initButtonDelete(params.btnDelete);
        this.initButtonSave(params.btnSave);
        this.initButtonCancel(params.btnCancel);
        this.#btnEditSelector = params.btnEditSelector;
        this.#btnDeleteSelector = params.btnDeleteSelector;
        this.#alertInput = params.alertInput;
        this.#alertContent = params.alertContent;

        this.initInputName(params.inputName);
        this.initInputPhone(params.inputPhone);
        this.initInputSex(params.inputSex);
        this.initInputAddress(params.inputAddress);

        this.initTableBody(params.containerTableBody);
        this.initContainerTableRow(params.containerTableRow);

        // dst..
    }


    initForm(form) {
        this.#form = form;
        this.#form.reset();
    }

    hideForm() {
        this.#form.classList.add("hidden");
    }

    showForm() {
        this.#form.classList.remove("hidden");
    }

    showAlert() {
        this.#alertInput.classList.remove("hidden");
    }

    hideAlert() {
        this.#alertInput.classList.add("hidden");
    }

    resetForm() {
        this.#form.reset();
    }

    initInputName(name) {
        this.#inputName = name;
    }

    initInputPhone(phone) {
        this.#inputPhone = phone;
    }

    initInputSex(sex) {
        this.#inputSex = sex
    }

    initInputAddress(address) {
        this.#inputAddress = address;
    }

    initTableBody(tableBody) {
        this.#tableBody = tableBody;
    }

    initContainerTableRow(tableRow) {
        this.#containerTableRow = tableRow;
    }

    initButtonSave(btnSave) {
        this.#btnSave = btnSave;

        // set event handler here..
        const thisClass = this;
        this.#btnSave.addEventListener("click", function (e) {
            thisClass.#alertInput.innerHTML = "";

            e.preventDefault();

            // validasi
            const validate = thisClass.validateForm();
            console.log(validate);
            if (validate !== []) {
                thisClass.showAlert();
                // const html = thisClass.checkAndShowIfValueExist(validate);
                const html = `
                <span class="alert-content ${validate.errorName ? "" : "hidden"}">${validate.errorName}</span>
                <span class="alert-content ${validate.errorPhone ? "" : "hidden"}">${validate.errorPhone}</span>
                <span class="alert-content ${validate.errorAddress ? "" : "hidden"}">${validate.errorAddress}</span>
                 `
                thisClass.#alertInput.insertAdjacentHTML("afterbegin", html);
            } else {

                // ini save atau edit?
                if (thisClass.#btnSave.classList.contains("editing")) {
                    const uuid = thisClass.#btnSave.getAttribute("data-id");
                    // get the actual person data from localStorage
                    thisClass.update(uuid);
                    thisClass.refresh();
                    thisClass.hideForm();

                } else {
                    const save = thisClass.create();
                    if (save) {
                        thisClass.cleanTable();
                        thisClass.refresh();
                        thisClass.hideForm();

                    }
                }
            }
        });
    }

    initButtonCancel(btnCancel) {
        this.#btnCancel = btnCancel;
        const that = this
        this.#btnCancel.addEventListener("click", function (e) {
            e.preventDefault();
            that.hideForm();
            that.#alertInput.innerHTML = "";
            that.hideAlert()
        })
    }

    initButtonCreate(btnCreate) {
        this.#btnCreate = btnCreate;
        const thisClass = this;
        this.#btnCreate.addEventListener("click", function (e) {
            // clear the form fields first!
            thisClass.resetForm()

            // and then show the form
            thisClass.showForm();
            thisClass.#inputName.focus();

        });
    }

    initButtonDelete(btnDelete) {
        this.#btnDelete = btnDelete;
    }

    initButtonEdit(btnEdit) {
        this.#btnEdit = btnEdit;
    }

    setEventHandlerForEditButton() {
        const that = this;

        this.#tableBody.querySelectorAll(this.#btnEditSelector).forEach(btn => {
            btn.addEventListener("click", function (event) {
                const person = that.#service.getByUuid(btn.getAttribute("data-id"))
                // tampilkan form
                that.showForm();
                that.resetForm();

                // isi form
                that.#inputName.value = person.name;
                that.#inputPhone.value = person.phone;
                that.#inputSex.value = person.sex;
                that.#inputAddress.value = person.address;

                // btn save diisi class edit
                that.#btnSave.classList.add("editing");
                that.#btnSave.setAttribute("data-id", person.uuid);
            })
        })
    }

    setEventHandlerForDeleteButton() {
        const that = this;
        this.#tableBody.querySelectorAll(this.#btnDeleteSelector).forEach(btn => {
            btn.addEventListener("click", function (event) {
                // dapatkan person yang akan di delete
                //const person = that.#service.getByUuid(btn.getAttribute("data-id"))
                // tampilkan konfirmasi form sebelum delete
                // delete dilakukan

                that.delete(btn.getAttribute("data-id"))
                that.refresh()


            })
        })
    }

    refresh() {
        this.cleanTable();

        const persons = this.getData();

        persons.map((item) => {
            const html = `
      <tr class="table-row">
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.sex === "f" ? this.f : this.m}</td>
        <td>${item.address}</td>
        <td>
          <button class="btn btn-secondary btn-edit" data-id="${item.uuid}">edit</button>
          <button class="btn btn-danger btn-delete" data-id="${item.uuid}">delete</button>
        </td>
        </tr>
      `;

            this.#tableBody.insertAdjacentHTML("afterbegin", html);

        });
        this.setEventHandlerForEditButton();
        this.setEventHandlerForDeleteButton();

    }

    cleanTable() {
        this.#tableBody.innerHTML = "";
        // containerTableBody.innerHTML = "";
    }

    validateForm() {
        let errors = []
        const name = this.#inputName.value;
        const phone = this.#inputPhone.value;
        const address = this.#inputAddress.value;

        if (name === "") {
            errors["errorName"] = "Please enter a name";
        } else if (this.isPersonExist(name, address).length > 0) {
            // nama tidak duplicate dengan alamat yang sama
            // jika true, maka ada person dengan data yang sama di local storage, maka tampilkan error
            errors["errorName"] = "Sorry, input name is already exists!";
        }

        if (phone === "") {
            errors["errorPhone"] = "Please enter a phone number";
        } else if (phone.length <= 7 && phone.length >= 15 || typeof phone !== "number") {
            // phone number tidak boleh kurang dari 7 angka dan tidak lebih dari 15, must be a number dan tidak duplicate
            errors["errorPhone"] = "Sorry, phone number must be a number that greater than 7 and less than 15";
        } else if(this.isPhoneExist(phone).length > 0){
            errors["errorPhone"] = "Sorry, input phone number is already exists!";
        }

        if (address === "") {
            errors["errorAddress"] = "Please enter an address";
        }


        return errors;
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
        person.sex = this.#inputSex.value;
        person.address = this.#inputAddress.value;

        return this.#service.create(person);
    }

    update(uuid) {
        const person = this.#service.getByUuid(uuid);
        person.name = this.#inputName.value;
        person.phone = this.#inputPhone.value;
        person.sex = this.#inputSex.value;
        person.address = this.#inputAddress.value;

        return this.#service.update(uuid, person);
    }

    delete(uuid) {
        return this.#service.delete(uuid);
    }

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

    isPhoneExist(phoneNumber) {
        let result = [];
        const persons = this.getData();
        persons.forEach((person) => {
            if (person.phone === phoneNumber) {
                result.push(person);
            }
        })
        return result;
    }

    isPersonExist(nameInput, addressInput) {
        // ini akan menghasilkan object
        let result = [];
        const persons = this.getData(); // isinya adalah semua data (objek)
        persons.forEach((person) => {
            // nama sama dengan alamat yang berbeda, bole
            // nama belum ada di database juga bole
            if (person.address === addressInput) {
                // kemudian cek namanya
                if (person.name === nameInput) {
                    result.push(person);
                }
            }
        })
        return result;
    }

    checkAndShowIfValueExist(array) {
        let result = [];


        return result;

    }

    // validAddress(addressInput) {
    //     const
    // }
}

// tampilkan pesan error di html dengan alertnya
// error bisa ditampilkan beberapa
