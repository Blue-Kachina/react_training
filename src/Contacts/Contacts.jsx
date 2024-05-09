import ContactAPI from './ContactApiAzure'
import {use, useState} from "react";
import {Button, FormControl, Table} from 'react-bootstrap';
import {Check, X, Pencil} from 'react-bootstrap-icons';

export default function Contacts() {

    const contacts = use(ContactAPI.getAllContacts())
    const [selectedContactId, setSelectedContactId] = useState("feea961f-e206-4198-a07f-2668a76a5c2b")

    return <>
        <h1>Contacts</h1>
        <Table striped hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
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
                                <td><Button><Check color="white" size={16}/></Button></td>
                                <td><Button><X color="white" size={16}/></Button></td>
                            </tr>
                            :
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td><Button><Pencil color="white" size={16}/></Button></td>
                            </tr>
                    )
                )}
            </tbody>
        </Table>
    </>
}