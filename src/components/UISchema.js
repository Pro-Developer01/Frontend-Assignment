import React, { useState } from "react";
import "./style.css";

export default function UiSchema({ data }) {
    const [formValues, setFormValues] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        alert('Form Submited Check concole to see Form Data')
    };

    const renderInput = (param) => {
        return (
            <div className="form-field" key={param.jsonKey}>
                <label className="form-label" htmlFor={param.jsonKey}>
                    {param.label}{" "}
                    {param.validate.required ? (
                        <span className="form-require ">
                            *
                        </span>
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
                />
                {/* {formErrors.name && <div className="form-error">{formErrors.name}</div>} */}
            </div>
        );
    };

    const renderSelect = (param) => {
        return (
            <div className="form-field" key={param.jsonKey}>
                <label className="form-label" htmlFor={param.jsonKey}>
                    {param.label}
                    {param.validate.required ?
                        <span className="form-require">

                            *
                        </span>
                        : null}
                </label>
                <select
                    className="form-input"
                    id={param.jsonKey}
                    name={param.jsonKey}
                    value={formValues[param.jsonKey] || param.validate.defaultValue}
                    onChange={handleSelectChange}
                    required={param.validate.required}
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

    const renderSubParameters = (subParams) => {
        return subParams.map((subParam) => {
            if (subParam.uiType === "Select") {
                return renderSelect(subParam);
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
                    <h4>Please Submit / Paste the JSON Data</h4>
                </div>
            )}
        </>
    )
}   
