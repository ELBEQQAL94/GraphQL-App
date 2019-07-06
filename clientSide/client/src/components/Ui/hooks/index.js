import { useState } from 'react';

export const useForm = (callback, initialState={}) => {
    // values
    const [values,setValues] = useState(initialState);

    // Update field
  const updateField = e =>
  setValues({
    ...values,
    [e.target.name]: e.target.value
  });

  // Submit field
  const submit = (e) => {
      e.preventDefault();
      callback();
  };

  return {
      updateField,
      submit,
      values
  }

};