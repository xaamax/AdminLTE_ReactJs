import React, { useEffect, useState } from "react";
import Grid from "../../layouts/Grid";

export const InputLabel = ({
  label,
  type,
  value,
  placeholder,
  inputClass,
  labelClass,
  onChange,
  defaultValue
}) => {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        className={`form-control ${inputClass || ""}`}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        />
    </div>
  );
};

export const InputGroupAppend = ({
  label,
  type,
  value,
  placeholder,
  inputClass,
  append,
  icon,
  appendClass,
  appendBtnClick,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <div className="input-group">
        <input
          type={type}
          className={`form-control ${inputClass || ""}`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className="input-group-append">
          {!append && (
            <span className="input-group-text">
              <i className={`fas fa-${icon}`}></i>
            </span>
          )}
          {append === "btn" && (
            <button
              onClick={appendBtnClick}
              type="button"
              className={`btn ${appendClass}`}
            >
              <i className={`fas fa-${icon}`}></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
