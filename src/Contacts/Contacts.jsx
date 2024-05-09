import ContactAPI from './ContactApiAzure'
import {use} from "react";
import {Table} from 'react-bootstrap';

export default function Contacts() {

    const contacts = use(ContactAPI.getAllContacts())

    return <>
        <h1>Contacts</h1>
        <Table striped hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact) =>
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>
}