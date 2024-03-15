
'use client';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const userSurvey = () => {
    const baseUrl = window.location.origin;
    const [data,setData] = useState([]);
    const fetchData = async () => {
        const result = await axios('/api/user/userSurvey');
        // Check if result.data is an array
        if (Array.isArray(result.data.data)) {
          setData(result.data.data);
        } else {
          console.error(typeof result.data.data)
          console.error('Error: result.data is not an array');
        }
      };
    useEffect(() => {
        fetchData();
      }, []);
    const deleteSurvey = async (id) => {
        try {
          const response = await axios.post('/api/user/deleteSurvey', {id});
          fetchData();
        } catch (error) {
          console.error(error);
        }
      }
    return (
        <div>
          <h1>User Survey</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Most Voted Option</th>
                <th>Number of Votes</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td><a href={`${baseUrl}/survey/${item.id}`}>{item.survey_title} </a></td>
                  <td>{item.survey_max_option_name}</td>
                  <td>{item.survey_max_option}</td>
                  <td><button onClick={ ()=>deleteSurvey(item.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default userSurvey;