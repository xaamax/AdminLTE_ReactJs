import React, { useEffect, useState } from "react";
import Grid from "../../layouts/Grid";
import FormGroup from "../FormGroup";

export const InputLabel = ({
  label,
  type,
  value,
  placeholder,
  inputClass,
  labelClass,
  onChange,
  defaultValue,
  disabled
}) => {
  return (
    <FormGroup>
      <label className={labelClass}>{label}</label>
      <input
        className={`form-control ${inputClass || ""}`}
        {...{ type, value, placeholder, onChange, defaultValue, disabled }}
        />
    </FormGroup>
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
    <FormGroup>
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
    </FormGroup>
  );
};
