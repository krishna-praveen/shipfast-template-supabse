
'use client';
import React, { useState } from 'react';
import axios from 'axios';

const OptionComponent = ({ items }) => {
   
    const initialState = items.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {});
    const [values, setValues] = useState(
        items.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {})
    );
    const [surveyLink, setSurveyLink] = useState(null); // Add this line

  
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.id]: event.target.value,
        });
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            const response = await axios.post('/api/user/createSurvey', values);
            const survey_data =  response.data.survey_data;
            const surveyId = response.data.data[0].id;
            const baseUrl = window.location.origin;
            setSurveyLink(`${baseUrl}/survey/${surveyId}`);
            setValues(initialState);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
                <div key={index}>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor={item.id}
                    >
                        {item.title}
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id={item.id}
                        type="text"
                        value={values[item.id] || ''}
                        placeholder={`Enter ${item.title}`}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                >Submit</button>
        {surveyLink && ( // Add this block
                <div>
                    <h2>Survey created! You can access it at:</h2>
                    <a href={surveyLink}>{surveyLink}</a>
                </div>
            )}
        </form>
    );
};

export default OptionComponent;