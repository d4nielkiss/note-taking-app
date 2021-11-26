import { useRef, useState } from 'react';
import { useHistory } from 'react-router';

export default function NoteForm({
  backend,
  user,
  type,
  note,
  id,
}) {
  const [data, setData] = useState(
    type === 'new'
      ? {
          title: '',
          description: '',
        }
      : {
          title: note.title,
          description: note.description,
        }  
  );

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  let history = useHistory();

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');
  const [isFormValidated, setIsFormValidated] = useState(false);

  const errorMessages = {
    required: 'Please fill the field above',
    length: 'Cannot be longer than 1000 characters',
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
    title: {
      required: isNotEmpty,
    },
    description: {
      required: isNotEmpty,
      length: isNoLongerThan1000,
    },
  }

  const references = {
    title: useRef(),
    description: useRef(),
  }

  function isNotEmpty(value) {
    return value.length > 0;
  }

  function isNoLongerThan1000(value) {
    return value.length <= 1000;
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
      if (type === 'new') {
        fetch(`${backend}/note`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            date: new Date(),
            isPinned: false,
            authorId: user.id,
          }),
        })
          .then(async res => {
            if (res.status === 400) {
              const response = await res.json();
              throw new Error(response?.error);
            }
            e.target.reset();
            setData({
              title: '',
              description: '',
            });
            history.push("/");
        })
          .catch(error => {
            setIsFormValidated(false);
            setFormAlertText(error.message);
            setFormAlertType('danger');
          })      
      } else if (type === 'edit') {
          fetch(`${backend}/note/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: data.title,
              description: data.description,
            }),
          })
            .then(async res => {
              if (res.status === 400) {
                const response = await res.json();
                throw new Error(response?.error);
              }
              e.target.reset();
              setData({
                title: '',
                description: '',
              });
              history.push("/");
          })
            .catch(error => {
              setIsFormValidated(false);
              setFormAlertText(error.message);
              setFormAlertType('danger');
            })      
      }
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
        <div className="mb-4">
          <label htmlFor="title" className="form-label">Title</label>
          <input 
            required={true}
            ref={references.title}
            type="text" 
            id="title" 
            name="title" 
            className="form-control"
            value={data.title}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {errors.title &&
            <div className="text-danger">
              {errors.title}
            </div>
          }
        </div>
        <div className="mb-5">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea 
            required={true}
            ref={references.description}
            rows="20" 
            className="form-control" 
            id="description" 
            name="description"
            value={data.description}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          {errors.description &&
            <div className="text-danger">
              {errors.description}
            </div>
          }
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
      {formAlertText &&
        <div className={`alert alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      }
    </>
  );
};
