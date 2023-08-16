import { nanoid } from 'nanoid';
import { ContactForm }  from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect, useState } from 'react';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   handleChange = e => {
//     this.setState({ [e.currentTarget.name]: e.currentTarget.value });
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   AddContact = (name, number) => {
//     const contact = {
//       name,
//       id: nanoid(),
//       number,
//     };

//     const alreadyAdded = this.state.contacts.some(
//       elem => elem.name === contact.name
//     );
//     if (alreadyAdded) {
//       alert(`${contact.name} already exists in contacts.`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (!parsedContacts) return;
//     this.setState({ contacts: parsedContacts });
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#c9c4cd',
//         }}
//       >
//         <h1
//           style={{
//             fontSize: '20px',
//             alignItems: 'center',
//           }}
//         >
//           Phonebook
//         </h1>
//         <ContactForm onAddContact={this.AddContact} />

//         <h2
//           style={{
//             fontSize: '20px',
//             alignItems: 'center',
//           }}
//         >
//           Contacts
//         </h2>
//         <Filter filterValue={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={this.getVisibleContacts()}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }


export const App = () => {

  const [contacts, setContacts] = useState(() => {
    const contactsParsed = localStorage.getItem('contacts');
    return contactsParsed ? JSON.parse(contactsParsed) : [];
  });
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = e => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  

   const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleAddContact = (name, number) => {
    const contact = {
      name,
      id: nanoid(),
      number,
    };


    const alreadyAdded = contacts.some((el) => el.name === contact.name);
      if (alreadyAdded) {
        alert(`${contact.name} already exists in contacts.`);
        return;
      }

      setContacts((prevState) => [contact, ...prevState]);
    };



    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c9c4cd',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            alignItems: 'center',
          }}
        >
          Phonebook
        </h1>
        <ContactForm AddContact={handleAddContact} />

        <h2
          style={{
            fontSize: '20px',
            alignItems: 'center',
          }}
        >
          Contacts
        </h2>
        <Filter filterValue={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          deleteContact={deleteContact}
        />
      </div>
    );
  }