import ContactAPI from './ContactApiAzure'
import {useEffect, useState} from "react";
import {Button, Form, FormControl, Table} from 'react-bootstrap';
import {Check, X, PencilFill, Trash3Fill} from 'react-bootstrap-icons';
import {useQuery} from "@tanstack/react-query";

export default function Contacts() {

  const { data: contacts, refetch } = useQuery({
    queryKey: ['contacts'],
    queryFn: ContactAPI.getAllContacts,
    options: {
      cacheTime: 10000,
      staleTime: 30000,
      refetchOnWindowFocus: true,
    },
  });

    const [selectedContactId, setSelectedContactId] = useState(null)

    useEffect(() => {
        ContactAPI.registerNotification(refetch)
        return () => {
            ContactAPI.unregisterNotification()
        }
    }, [])

    async function saveFn(formData) {
        const obj = {}
        obj.id = formData.get('id')
        obj.firstName = formData.get('firstName')
        obj.lastName = formData.get('lastName')
        obj.email = formData.get('email')

        await ContactAPI.saveContact(obj)
        setSelectedContactId(null)
        refetch()
    }

    async function deleteFn(contactId) {

        await ContactAPI.deleteContact(contactId)
        setSelectedContactId(null)
        refetch()
    }

    return <>
        <h1>Contacts</h1>
        <Form action={saveFn}>
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


                                <td><FormControl defaultValue={contact.id} name='id' type='hidden'/><FormControl defaultValue={contact.firstName} name='firstName'/></td>
                                <td><FormControl defaultValue={contact.lastName} name='lastName'/></td>
                                <td><FormControl defaultValue={contact.email} name='email'/></td>
                                <td>
                                    <Button type='submit' size={'sm'}><Check color="white" size={12}/></Button>
                                    &nbsp;
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedContactId(null)
                                    }} size={'sm'}><X color="white" size={12}/></Button>
                                </td>

                            </tr>
                            :
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <Button onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedContactId(contact.id)
                                }} size={'sm'}><PencilFill color="white" size={12}/></Button>
                                    &nbsp;
                                    <Button variant="danger" onClick={(e) => {
                                    e.preventDefault();
                                    deleteFn(contact.id)
                                }} size={'sm'}><Trash3Fill color="white" size={12}/></Button>
                                </td>
                            </tr>
                    )
                )}
            </tbody>
        </Table>
        </Form>
    </>
}