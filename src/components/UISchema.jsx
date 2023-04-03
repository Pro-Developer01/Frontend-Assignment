import React, { useState } from "react";
import "./style.css";
import Switch from "@mui/material/Switch";

export default function UiSchema({ data }) {
  const [formValues, setFormValues] = useState({});
  const [radioValue, setRadioValue] = useState("naples");

  //following Functions for tackling any event
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const radioClickHandler = (value) => {
    setRadioValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    alert("Form Submited Check concole to see Form Data");
  };

  //Functions for rendering specific input element
  const renderInput = (param) => {
    return (
      <div className="form-field" key={param.jsonKey}>
        <label className="form-label" htmlFor={param.jsonKey}>
          {param.label}{" "}
          {param.validate.required ? (
            <span className="form-require ">*</span>
          ) : null}
        </label>
        <input
          type="text"
          className="form-input"
          id={param.jsonKey}
          name={param.jsonKey}
          placeholder={param.placeholder}
          value={formValues[param.jsonKey] || ""}
          onChange={handleInputChange}
          required={param.validate.required}
          disabled={param.validate.immutable}
        />
      </div>
    );
  };

  const renderSelect = (param) => {
    return (
      <div className="form-field" key={param.jsonKey}>
        <label className="form-label" htmlFor={param.jsonKey}>
          {param.label}
          {param.validate.required ? (
            <span className="form-require"> *</span>
          ) : null}
        </label>
        <select
          className="form-input"
          id={param.jsonKey}
          name={param.jsonKey}
          value={formValues[param.jsonKey] || param.validate.defaultValue}
          onChange={handleSelectChange}
          required={param.validate.required}
          disabled={param.validate.immutable}
        >
          {param.validate.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderSwitch = (param) => {
    return (
      <div className="form-field" key={param.jsonKey}>
        <label className="form-label" htmlFor={param.jsonKey}>
          {param.label}
          {param.validate.required ? (
            <span className="form-require"> *</span>
          ) : null}
        </label>
        <Switch
          id={param.jsonKey}
          name={param.jsonKey}
          defaultChecked={param.validate.defaultValue}
          onChange={handleSelectChange}
          required={param.validate.required}
          size="small"
          disabled={param.validate.immutable}
        />
      </div>
    );
  };

  const renderRadio = (param) => {
    return (
      <div className="form-field" key={param.jsonKey}>
        {param.validate.options.map((option) => (
          <button
            type="button"
            className="form-RadioButton"
            key={option.value}
            onClick={() => radioClickHandler(option.value)}
            disabled={param.validate.immutable}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  //Functions for rendering specific scenario
  const renderIgnore = (param) => {
    if (param.conditions[0].value === radioValue) {
      return (
        <div className="form-group" key={param.jsonKey}>
          {renderSubParameters(param.subParameters)}
        </div>
      );
    }
  };

  const renderSubParameters = (subParams) => {
    return subParams.map((subParam) => {
      if (subParam.uiType === "Select") {
        return renderSelect(subParam);
      }
      if (subParam.uiType === "Radio") {
        return renderRadio(subParam);
      }
      if (subParam.uiType === "Ignore") {
        return renderIgnore(subParam);
      }
      if (subParam.uiType === "Input") {
        return renderInput(subParam);
      }
      if (subParam.uiType === "Switch") {
        return renderSwitch(subParam);
      }
    });
  };

  const renderGroup = (param) => {
    return (
      <div className="form-group" key={param.jsonKey}>
        <h4>{param.label}</h4>
        <hr />
        {renderSubParameters(param.subParameters)}
      </div>
    );
  };

  const renderForm = () => {
    return data.map((param) => {
      if (param.uiType === "Input") {
        return <div className="field-container">{renderInput(param)}</div>;
      }
      if (param.uiType === "Group") {
        return <div className="field-container">{renderGroup(param)}</div>;
      }
      if (param.uiType === "Select") {
        return <div className="field-container">{renderSelect(param)}</div>;
      }
      if (param.uiType === "Radio") {
        return <div className="field-container">{renderRadio(param)}</div>;
      }
      if (param.uiType === "Ignore") {
        return <div className="field-container">{renderIgnore(param)}</div>;
      }
      if (param.uiType === "Switch") {
        return <div className="field-container">{renderSwitch(param)}</div>;
      }
    });
  };

  return (
    <>
      {data ? (
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            {renderForm()}
            <div className="form-Button">
              <button className="form-cancel">Cancel</button>
              <button type="submit" className="form-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-Nodata">
          <h4>Please Submit / Paste the JSON Data</h4>{" "}
          {/* // when data is null(initially) */}
        </div>
      )}
    </>
  );
}
