import { nanoid } from 'nanoid';
import { useState } from 'react';
import {
  Form,
  FormField,
  FieldFormik,
  StyledButton,
} from './ContactForm.styled';


export const ContactForm = ({ AddContact }) => {
  
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    let nameInputId = nanoid();
    let numberInputId = nanoid();

    const handleChangeName = ({ target }) => {
        setName((prevName) => prevName = target.value)
    };

    const handleChangeNumber = ({ target }) => {
        setNumber((prevNumber) => prevNumber = target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        AddContact(name, number);

        setName((prevName) => prevName = "")
        setNumber((prevNumber) => prevNumber = "")

    };


    return (
        <Form onSubmit={handleSubmit}>
            <FormField htmlFor={nameInputId}>
                Name
                <FieldFormik
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={handleChangeName}
                    id={nameInputId}
                />
            </FormField>

            <FormField htmlFor={numberInputId}>
                Number
                <FieldFormik
                    type="tel"
                    name="number"
                    required
                    value={number}
                    onChange={handleChangeNumber}
                    id={numberInputId}
                />
            </FormField>
            <StyledButton type="submit">Add contact</StyledButton>
        </Form>
    );
}