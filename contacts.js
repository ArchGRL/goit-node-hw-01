const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newConact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newConact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newConact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
