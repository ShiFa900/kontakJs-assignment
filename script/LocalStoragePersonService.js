/**
 * Provides CRUD functionality of Person data from/into browser's LocalStorage
 */
export class LocalStoragePersonService {
  static STORAGE_KEY = "KONTAKJS_DB";

  /**
   * Returns array of all Persons data from the LocalStorage, or empty array if no data exists
   */
  getAll() {
    try {
      const persons = JSON.parse(
        localStorage.getItem(LocalStoragePersonService.STORAGE_KEY)
      );
      return persons || [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Returns person data with the given UUID, or undefined if not found
   * @param {*} uuid
   * @returns Person | undefined
   */
  getByUuid(uuid) {
    const persons = this.getAll();
    return persons.find((p) => p.uuid === uuid);
  }

  /**
   * Creates a new Person data into the LocalStorage
   * @param {*} person Person
   */
  create(person) {
    const persons = this.getAll();

    person.uuid = self.crypto.randomUUID();
    persons.push(person);
    localStorage.setItem(
      LocalStoragePersonService.STORAGE_KEY,
      JSON.stringify(persons)
    );

    return person;
  }

  /**
   * Updates (PUT) existing Person data with the given UUID
   * @param {*} uuid string
   * @param {*} person Person
   */
  update(uuid, person) {
    let persons = this.getAll();

    // find specific data with the given UUID
    const data = persons.find((p) => p.uuid === uuid);
    if (data != undefined) {
      // replace the data
      data.name = person.name;
      data.phone = person.phone;
      data.sex = person.sex;
      data.address = person.address;
      persons = persons.map((p) => (p.uuid !== data.uuid ? p : data));

      localStorage.setItem(
        LocalStoragePersonService.STORAGE_KEY,
        JSON.stringify(persons)
      );
    }
    return data;
  }

  /**
   * Deletes existing Person data with the given UUID
   * @param {*} uuid
   */
  delete(uuid) {
    let persons = this.getAll();
    persons = persons.filter((p) => p.uuid !== uuid);
    localStorage.setItem(
      LocalStoragePersonService.STORAGE_KEY,
      JSON.stringify(persons)
    );
  }

  /**
   * Purges persons data from LocalStorage
   */
  deleteAll() {
    localStorage.removeItem(LocalStoragePersonService.STORAGE_KEY);
  }
}
