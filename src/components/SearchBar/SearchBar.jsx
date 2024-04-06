import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [emptyInput, setEmptyInput] = useState(false);
  const notify = () => toast('Please type a desired word.');

  function handleSubmit(values, actions) {
    if (values.searchedText.trim() !== '') {
      onSubmit(values.searchedText);
      actions.resetForm();
    } else {
      notify();
    }
  }

  return (
    <header>
      <Formik initialValues={{ searchedText: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field
            name="searchedText"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
}
