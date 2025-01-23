import { LocalStoragePersonService } from "./LocalStoragePersonService.js";
import { Person } from "./personModel.js";

const service = new LocalStoragePersonService();

// cleanup first
service.deleteAll();

// should be showing []
console.log("Initial data", service.getAll());

// add some data
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

console.log("Creating 2 persons data", service.create(p1), service.create(p2));

// // get a single data by UUID
let persons = service.getAll();
const target = service.getByUuid(persons[0].uuid);
console.log("The first data (getByUuid)", target);

// // update data by uuid
target.name = "Shifa edit";
target.sex = "Transgenda";
target.phone = "000000000";
target.address = "The moon";
console.log("Updated data", service.update(target.uuid, target));
console.log("Person data after update", service.getAll());

// // delete the data by uuid
// service.delete(target.uuid);
// console.log("Person data after deletion", service.getAll());
