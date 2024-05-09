import ContactAPI from './ContactApiAzure'
import {useState} from "react";
import {Button, Form, FormControl, Table} from 'react-bootstrap';
import {Check, X, PencilFill} from 'react-bootstrap-icons';
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

    async function saveFn(formData) {
        const obj = {}
        obj.id = formData.get('id')
        obj.firstName = formData.get('firstName')
        obj.lastName = formData.get('lastName')
        obj.email = formData.get('email')

        await ContactAPI.saveContact(obj)
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
                                    <Button type='submit'><Check color="white" size={12}/></Button>
                                    &nbsp;
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedContactId(null)
                                    }}><X color="white" size={12}/></Button>
                                </td>

                            </tr>
                            :
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td><Button onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedContactId(contact.id)
                                }}><PencilFill color="white" size={12}/></Button></td>
                            </tr>
                    )
                )}
            </tbody>
        </Table>
        </Form>
    </>
}