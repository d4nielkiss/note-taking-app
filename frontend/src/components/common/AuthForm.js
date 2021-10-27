import { useRef, useState } from 'react';
import InputFieldSet from './InputFieldSet';

export default function Form({ backend, type }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');
  const [isFormValidated, setIsFormValidated] = useState(false);

  const errorMessages = {
    required: 'Please fill the field above!',
    email: 'Invalid email format!',
    password: 'Password must be at least 8 characters long!',
  }

  function handleInputChange(e) {
    setErrors({
      ...errors,
      [e.target.name]: '',
    });

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const validations = {
    email: {
      required: isNotEmpty,
    },
    password: {
      required: isNotEmpty,
    },
  }

  const references = {
    email: useRef(),
    password: useRef(),
  }

  function isNotEmpty(value) {
    return value.length > 0;
  }

  function validateInputField(name) {
    const value = data[name];
    let isFieldValid = true;
    references[name].current.setCustomValidity('');
    if (validations[name] !== undefined) {
      for (const [validity, validationFn] of Object.entries(validations[name])) {
        if (isFieldValid) {
          isFieldValid = validationFn(value);
        }
        if (!isFieldValid) {
          const errorMessage = errorMessages[validity];
          setErrors(previousErrors => ({
            ...previousErrors,
            [name]: errorMessage,
          }));
          references[name].current.setCustomValidity(errorMessage);
        }
      }
    }
    return isFieldValid;
  }

  function handleInputBlur(e) {
    validateInputField(e.target.name);
  }

  function validateForm() {
    let isFormValid = true;
    setIsFormValidated(true);
    for (const inputField of Object.keys(data)) {
      let isInputValid = validateInputField(inputField);
      if (!isInputValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      fetch(`${backend}/${type === 'register' ? 'register' : 'login'}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
        .then(async res => {
          if (res.status === 400) {
            const response = await res.json();
            throw new Error(response?.error);
          }
          e.target.reset();
          setData({
            email: '',
            password: '',
          });
        })
        .catch(error => {
          setIsFormValidated(false);
          setFormAlertText(error.message);
          setFormAlertType('danger');
        }) 
    }
    setFormAlertText('');
    setFormAlertType('');
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        noValidate
        className={`mb-3 needs-validation ${isFormValidated ? `was-validated` : ''}`}
      >
        <InputFieldSet
          reference={references.email}
          name="email"
          labelText="Email"
          type="email"
          errors={errors}
          fieldValues={data}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.password}
          name="password"
          labelText="Password*"
          type="password"
          errors={errors}
          fieldValues={data}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button className="mb-5 mt-3" type="submit">
          Submit
        </button>
        <p>* Password must be at least 8 characters long</p>
      </form>
      {formAlertText && (
        <div className={`alert alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
    </>
  );
};
