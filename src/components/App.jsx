import { BookForm } from './BookForm/BookForm';
import React, { useEffect, useState } from 'react';
import { BookList } from './BookList/BookList';
import { BookFilter } from './BookFilter/BookFilter';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const handleAddContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      toast.error('Nope, you have it...');
      return true;
    }
    setContacts(prevState => [...prevState, contact]);
    return false;
  };

  const handleDeleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevState) {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  return (
    <>
      <BookForm addContact={handleAddContact} />
      <BookFilter value={filter} handleChange={handleChangeFilter} />
      <BookList
        contacts={handleFilterContacts()}
        deleteContact={handleDeleteContact}
      />
      <Toaster />
    </>
  );
}
