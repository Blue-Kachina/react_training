import ContactAPI from './ContactApiAzure'
import {use, useState} from "react";
import {FormControl, Table} from 'react-bootstrap';

export default function Contacts() {

    const contacts = use(ContactAPI.getAllContacts())
    const [selectedContactId, setSelectedContactId] = useState(null)

    return <>
        <h1>Contacts</h1>
        <Table striped hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact) =>
                    (
                        selectedContactId === contact.id ?
                            <tr key={contact.id}>
                                <td><FormControl defaultValue={contact.firstName}/></td>
                                <td><FormControl defaultValue={contact.lastName}/></td>
                                <td><FormControl defaultValue={contact.email}/></td>
                            </tr>
                            :
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                            </tr>
                    )
                )}
            </tbody>
        </Table>
    </>
}