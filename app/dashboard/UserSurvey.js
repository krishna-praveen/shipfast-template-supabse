
'use client';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const userSurvey = () => {
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
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.option_1}</td>
                  <td>{item.option_2}</td>
                  <td>{item.option_3}</td>
                  <td>{item.option_4}</td>
                  <td><button onClick={ ()=>deleteSurvey(item.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default userSurvey;