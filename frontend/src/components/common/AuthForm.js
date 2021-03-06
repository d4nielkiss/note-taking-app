import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import validator from 'validator';
import { UserContext } from '../../contexts/UserContext';
import InputFieldSet from './InputFieldSet';
import { backend } from '../../constants';

export default function AuthForm({ type }) {
  const { signIn } = useContext(UserContext);

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

  const history = useHistory();

  const errorMessages = {
    required: 'Please fill the field above!',
    format: 'Invalid email format!',
    length: 'Password must be at least 8 characters long!',
  }

  const references = {
    email: useRef(),
    password: useRef(),
  }

  function isNotEmpty(value) {
    return value.length > 0;
  }

  function isValidEmail(value) {
    return validator.isEmail(value);
  }

  function isLongEnough(value) {
    return validator.isLength(value, {
      min: 8,
      max: undefined,
    });
  }

  const validations = {
    email: {
      required: isNotEmpty,
      format: isValidEmail,
    },
    password: {
      required: isNotEmpty,
      length: isLongEnough,
    },
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

  function validateInputField(name) {
    const value = data[name];
    let isFieldValid = true;
    setErrors(previousErrors => ({
      ...previousErrors,
      [name]: '',
    }));
    references[name].current.setCustomValidity('');

    if (validations[name] !== undefined) {
      for (const [validity, validationFn] of Object.entries(validations[name])) {
        if (isFieldValid !== false) {
          isFieldValid = validationFn(value);
        }
        if (!isFieldValid) {
          const errorMessage = errorMessages[validity];
          setErrors(previousErrors => ({
            ...previousErrors,
            [name]: errorMessage,
          }));
          references[name].current.setCustomValidity(errorMessage);
          return isFieldValid;
        }
      }
    }
    return isFieldValid;
  }

  function handleInputBlur(e) {
    validateInputField(e.target.name);
  }

  function validateForm() {
    let isValid = true;

    for (const fieldName of Object.keys(data)) {
      const isFieldValid = validateInputField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    }
    return isValid;
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
          return res.json();
        })
        .then(res => {
          e.target.reset();
          setData({
            email: '',
            password: '',
          });
          if (type === 'register') {
            history.push('/login');
          } else {
            localStorage.setItem('user', JSON.stringify(res.user));
            signIn(res.user);
            history.push('/');
          }
        })
        .catch(error => {
          setIsFormValidated(false);
          setFormAlertText(error.message);
          setFormAlertType('danger');
        }) 
    }
    setIsFormValidated(true);
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
        <button className="btn btn-primary mb-5 mt-3" type="submit">
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
