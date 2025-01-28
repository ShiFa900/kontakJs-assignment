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
    #containerTableRow

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
            e.preventDefault();
            // validasi
            if (thisClass.validateForm().length > 0) {
                return alert("gagal wehh");
            }


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

                    alert("berhasil");
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
        let errors = [];

        // nama tidak duplicate dengan alamat yang sama
        // jika true, maka ada person dengan data yang sama di local storage, maka tampilkan error
        if (this.#inputName.length === 0 && this.isPersonExist(this.#inputName.value, this.#inputAddress.value)) {
            errors.push(["errorName", "Sorry, input name is incorrect."]);
        }
        // phone number tidak boleh kurang dari 7 angka dan tidak lebih dari 15, must be a number dan tidak duplicate
        if (this.#inputPhone.length === 0 && this.#inputPhone < 7 && this.#inputPhone > 15) {
            errors.push(["errorPhone", "Sorry, input phone is incorrect."]);
        }

        //this.#inputSex = this.#inputSex.value === "f" ? this.f : this.m;

        if (this.#inputAddress.length === 0 && this.isExist(this.#inputAddress)) {
            // jika true, brrti ada personnya
            errors.push(["errorAddress", "Sorry, input address is incorrect."]);

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

    isExist(column, value) {
        // dapatkan dulu semua data yang ada di local storage
        const persons = this.#service.getAll();
        // let data = [];
        persons.forEach((person) => {
            if (person[column] === value) {
                return true;
            }
        })
        return false;
    }

    isPersonExist(name, address) {
        const persons = this.#service.getAll();
        persons.forEach((person) => {
            if (person.name === name && person.address === address) {
                return true;
            }
        });
        return false;
    }
}
