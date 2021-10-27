export default function InputFieldSet({
  errors,
  fieldValues,
  handleInputChange,
  handleInputBlur,
  type,
  name,
  labelText,
  required,
  reference,
  readOnly,
  min,
  max,
  textarea,
}) {
  return (
    <div
      className={`mb-3 ${errors[name] !== '' ? 'was-validated' : ''}`}
    >
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      {textarea && (
        <textarea
          rows={6}
          className="form-control"
          id={name}
          name={name}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
        />
      )}
      {!textarea && (
        <input
          readOnly={readOnly}
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={fieldValues[name]}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          required={required}
          ref={reference}
          min={min}
          max={max}
        />
      )}
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
}