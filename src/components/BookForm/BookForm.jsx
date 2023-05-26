import React, { useReducer } from 'react';
import { Form, Label, Input, Submit } from './BookForm.styled.jsx';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
      };
    case 'number':
      return {
        ...state,
        number: action.payload,
      };
    case 'reset':
      return {
        name: '',
        number: '',
      };
    default:
      return state;
  }
}

export function BookForm({ addContact }) {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    number: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    const thisContactExist = addContact({
      id: nanoid(6),
      ...state,
    });
    if (!thisContactExist) {
      reset();
    }
  };

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    dispatch({ type: name, payload: value });
  }

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={state.name}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={state.number}
        />
      </Label>
      <Submit type="submit">Submit</Submit>
    </Form>
  );
}

BookForm.propTypes = {
  handleSubmit: PropTypes.func,
};
