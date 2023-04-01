import './Input.css'

const Input = ({ 
  className, 
  id, 
  label,
  placeholder,
  type,
  value, 
  onChange,
  onBlur,
  isValid,
  isTouched,
  control,
  required,
  rows,
  cols,
  inputClassName,
  name
}) => {
  return (
    <div className={`input-form-control ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {control === 'input' && (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          required={required}
          className={[
            "form-input",
            isValid ? "" : "input-invalid",
            isTouched ? "touched" : "untouched"
          ].join(' ')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {control === 'textarea' && (
        <textarea
          type={type}
          id={id}
          placeholder={placeholder}
          className={[
            "form-input",
            isValid ? "" : "input-invalid",
            isTouched ? "touched" : "untouched",
            inputClassName
          ].join(' ')}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          cols={cols}
        />
      )}
    </div>
  );
};

export default Input;