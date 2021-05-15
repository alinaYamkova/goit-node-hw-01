//Сделай импорт модулей fs и path 
const fs = require('fs')
const path = require('path');

//Создай переменную contactsPath и запиши в нее путь к файле contacts.json.
//ипользуй методы модуля path
const contactsPath = (path.join(__dirname, 'contacts.json'));

//В функциях используй модуль fs и его методы readFile() и writeFile()
const getContacts = async() => {
  const file = await fs.readFile(contactsPath, 'utf-8');
  const { list } = JSON.parse(file);
  return list;
}

// const getId = async() => {
//   const contacts = await getContacts();
//   const contactId = contacts.map((el) => el.id);
//   return contactId;
// }

async function listContacts() {
 return await getContacts();
};

async function getContactById(contactId) {
  const contacts = await getContacts();
  const showContact = contacts.map(({el}) => contactId);
  return showContact;
};

async function removeContact(contactId) {
  const id = getContactById(contactId);
  if (id) {
    contacts.splice(id, 1);
    await fs.writeFile(contactsPath, JSON.stringify({contacts}))
  }
  return;
};

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = {
    name, email, phone, id: uuid()
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify({contacts}))
  return newContact;
}

//Сделай экспорт созданных функций через module.exports
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}