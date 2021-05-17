//Сделай импорт модулей fs и path 
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require("uuid");

//Создай переменную contactsPath и запиши в нее путь к файле contacts.json, ипользуй методы модуля path
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

//В функциях используй модуль fs и его методы readFile() и writeFile()
const getContacts = async() => {
  const file = await fs.readFile(contactsPath, 'utf-8');
  const { list } = JSON.parse(file);
  // console.table;
  return list;
}
// getContacts(contactsPath);

async function listContacts() {
 return await getContacts();
};

async function getContactById(contactId) {
  const contacts = await getContacts();
  const showContact = contacts.find((el) => el.id === contactId);
  return showContact;
};

async function removeContact(contactId) {
  const contacts = await getContacts();
  // const id = getContactById(contactId);
  const foundContact = contacts.find((el) => el.id === contactId);
  if (foundContact) {
    contacts.splice(foundContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify({contacts}))
  }
  return;
};

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const updatedContacts  = contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
  return updatedContacts;
}

//Сделай экспорт созданных функций через module.exports
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}