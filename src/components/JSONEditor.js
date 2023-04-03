import React, { useState } from 'react'
import formJson from '../Assets/pizza.json'

export default function JSONEditor({ setFormJson }) {

    const [textareaContent, setTextareaContent] = useState(JSON.stringify(formJson))

    const handleSubmit = (event) => {
        event.preventDefault();
        if (textareaContent)
            setFormJson(JSON.parse(textareaContent))
    }
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="field-container">
                    <div className="form-field" style={{ flexDirection: 'column' }} >
                        <label className="form-label" htmlFor={'Editor'}>JSON Editor</label>
                        <textarea
                            type="text"
                            className="form-textarea form-input"
                            value={textareaContent}
                            onChange={(e) => { setTextareaContent(e.target.value) }}
                            placeholder='Enter JSON'
                        />
                        {/* {formErrors.name && <div className="form-error">{formErrors.name}</div>} */}
                    </div>
                </div>
                <div className="form-Button">

                    <button className="form-cancel" onClick={() => setTextareaContent('')}>
                        Cancel
                    </button>
                    <button type="submit" className="form-submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
