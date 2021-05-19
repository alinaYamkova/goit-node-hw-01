//Сделай импорт модулей fs и path
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//Создай переменную contactsPath и запиши в нее путь к файле contacts.json, ипользуй методы модуля path
const contactsPath = path.join(__dirname, "db", "contacts.json");

//В функциях используй модуль fs и его методы readFile() и writeFile()
// async function getContacts() {
//   const file = await fs.readFile(contactsPath, "utf-8");
//   const contacts = await JSON.parse(file);
//   return contacts;
// }

async function listContacts() {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = await JSON.parse(file);
  console.table(contacts);
};

async function getContactById(contactId) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  const someContact = contacts.find((el) => el.id === contactId);
  console.table(someContact);
};

async function removeContact(contactId) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  const someContact = contacts.find((el) => el.id === contactId);
  const contactList = contacts.filter((el) => el.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  console.table(someContact);
};

async function addContact(name, email, phone) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  const newContact = { id: uuidv4(), name, email, phone };
  const contactsList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  console.table(newContact);
};

// listContacts();
// getContactById(3);
// removeContact('b75cd2ea-1126-4115-b761-f5eb2373ca3a');
// addContact('Anna Maria', 'ann@mnn.com', '(999)464566');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
