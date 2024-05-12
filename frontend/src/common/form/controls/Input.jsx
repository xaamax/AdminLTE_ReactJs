import React, { useEffect, useState } from "react";

//um hook personalizado, nomeie-o com "use" no início
const useHandleInputChange = (value) => {
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return { inputValue, handleInputValue };
};

export const InputGroupAppend = ({
  type,
  value,
  placeholder,
  inputClass,
  append,
  icon,
  appendClass,
  onClick
}) => {
  const { inputValue, handleInputValue } = useHandleInputChange(value);

  return (
    <>
      <div className="input-group">
        <input
          type={type}
          className={`form-control ${inputClass || ""}`}
          placeholder={placeholder}
          value={inputValue || ""}
          onChange={handleInputValue}
        />
        <div className="input-group-append">
          {!append && (
            <span className="input-group-text">
              <i className={`fas fa-${icon}`}></i>
            </span>
          )}
          {append === 'btn' && (
            <button onClick={onClick} type="button" className={`btn ${appendClass}`}><i className={`fas fa-${icon}`}></i></button>
          )}
        </div>
      </div>
    </>
  );
};
