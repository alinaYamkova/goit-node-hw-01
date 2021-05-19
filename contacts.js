const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  console.table(contacts);
};

async function getContactById(contactId) {
  const file = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(file);
  const someContact = contacts.find((el) => String(el.id) === String(contactId));
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
