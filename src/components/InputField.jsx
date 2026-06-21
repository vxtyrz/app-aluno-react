import './InputField.css'

function InputField({ label, type = 'text', name, value, onChange, placeholder, erro, required }) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={name} className="input-field__label">
          {label}
          {required && <span className="input-field__obrigatorio"> *</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field__input ${erro ? 'input-field__input--erro' : ''}`}
        autoComplete="off"
      />
      {erro && <span className="input-field__erro">{erro}</span>}
    </div>
  )
}

export default InputField
